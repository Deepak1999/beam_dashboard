import { Backdrop, TextField, ThemeProvider, createTheme } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
// import Loader from "../../Components/Loader";
import { Link, useHistory } from "react-router-dom";
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import { xCheckSumIdGernator } from "../../helper/helper";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// common_axios
// import { setLoader } from "../../redux/features/authSliceandSidebar";
import { decryptBody, encryptBody } from "../../../utils/EncDecUtil";
import { common_axios } from "../../../App";
import { forgetPassword } from "../../../services/authService";
export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("d-none");
  // const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          asterisk: {
            color: "red",
          },
        },
      },
    },
  });
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );
  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);
  const resetTimer = function () {
    if (!timer) {
      setTimer(29);
    }
  };
  useEffect(() => {
    if (timer == 0) {
      setDisplay("d-none");
    } else {
      setDisplay("");
    }
  }, [timer]);

  const validationSchema = yup.object({
    msisdn: yup
      .number("Enter Your Number Here")
      // .email("E-Mail must be valid")
      .min(1000000000, "Number should be of minimum 10 characters length")
      .max(1000000000000, "Number should be of maximum 12 characters length"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      let formdata = {
        email: values?.email,
      };

      await forgetPassword(formdata)
        .then((res) => {
          if (res) {
            if (res?.data?.statusDescription?.statusCode == 200) {
              toast.success(res?.data?.statusDescription?.description);
            } else {
              toast.error(res?.data?.statusDescription?.description);
            }
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err);
          }
        });

      //   dispatch(setLoader(true));
      //   try {
      //     const res = await common_axios.post(
      //       "/authenc/forget/password",
      //       formdata
      //     );
      //     if (res?.data?.statusDescription?.statusCode == 200) {
      //       if (res?.data?.statusDescription?.statusCode == 200) {
      //         // dispatch(setLoader(false));
      //         Swal.fire({
      //           icon: "success",
      //           title: "Success",
      //           text: res?.data?.statusDescription?.statusMessage,
      //         });
      //         formik.handleReset();
      //       } else {
      //         Swal.fire({
      //           icon: "error",
      //           title: "Error",
      //           text: res?.data?.statusDescription?.statusMessage,
      //         });
      //       }
      //     }
      //     // dispatch(setLoader(false));
      //   } catch (Error) {
      //     Swal.fire({
      //       icon: "error",
      //       title: "Error",
      //       text: Error,
      //     });
      //   }
    },
  });
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Backdrop
          sx={{
            transform: "translateZ(0)",
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          // onClick={handleClose}
        >
          {/* <Loader /> */}
        </Backdrop>
        <ToastContainer autoClose={4000} />
        <ThemeProvider theme={theme}>
          <div className="container-fluid px-0">
            <div
              className="row d-md-flex d-none h_vh align-items-cente mx-0"
              style={{ marginTop: "100px" }}
            >
              <div
                className="col-md-5 offset-md-3 d-flex align-items-center bg_8 p-4"
                style={{ padding: "3.5rem" }}
              >
                <div className="w-100">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="" id="sign_in">
                      <div className="">
                        <div className="text-center">
                          <KeyIcon
                            style={{
                              fontSize: "25px",
                              color: "white",
                              border: "0.5px solid #0083AD",
                              borderRadius: "30px",
                              backgroundColor: "#0083AD",
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className="d-inline-block text-capitalize">
                            Forgot Password
                          </span>
                        </div>
                      </div>
                      <div className="my-4">
                        <div className="input-group input-group-outline input_field">
                          <div className="col-md-12 d-inline-flex">
                            <div className="me-2 mt-3">
                              {/* <LocalPhoneIcon style={{ fontSize: "17px" }} /> */}
                            </div>
                            <TextField
                              required
                              className="w-100"
                              label="Enter Email"
                              name="email"
                              type="text"
                              variant="standard"
                              size="small"
                              value={formik.values?.email}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                              }
                              helperText={
                                formik.touched.email && formik.errors.email
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn bg-primary text-white bg-gradient-primary register_grad d-block w-100 m-0"
                        // disabled={timer != 0}
                      >
                        Send
                      </button>
                      <div className="row my-3">
                        <div className="col-md-6">
                          <div className="text-start fw-bold">
                            <a
                              href="#"
                              onClick={formik.handleReset}
                              className="text-capitalize link-info"
                            >
                              Reset
                            </a>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div
                            className="text-end  fw-bold link-info"
                            id="sign_up_in"
                          >
                            <Link
                              to="/"
                              className="text-capitalize"
                              onClick={() => {
                                localStorage.clear();
                              }}
                            >
                              Log In
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </main>
    </>
  );
}
