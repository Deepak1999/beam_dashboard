import { useFormik } from "formik";
import { useEffect, useState } from "react";
import "../../pages/login/login.css";
import { common_axios } from "../../App";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { TextField, InputAdornment } from "@mui/material";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { TextField, IconButton, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { generateApi } from "../../services/authService";
import {
  setisLoginUser,
  setLoader,
  setUserData,
} from "../../redux/features/authSliceandSidebar";
import { Link } from "react-router-dom/cjs/react-router-dom";
import setData from "../../utils/DatapassService";
import logo_img from "../../assets/images/beam_logo.png";

// import {
//   VisibilityOffIcon,
//   VisibilityIcon,
// } from "@mui/icons-material";

export default function Login() {
  const params = useParams();

  const history = useHistory();
  const sendOtp = () => {};
  const dispatch = useDispatch();

  const [type, setType] = useState("");

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formSubmitted, setformSubmitted] = useState(false);

  const [otpForm, setOtpForm] = useState(false);
  // const [isLogin, setisLogin] = useState(false);

  const [showOtp, setShowOTP] = useState(false);

  //   const location = useLocation();

  //   useEffect(() => {}, []);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      otp: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validationSchema: yup.object({
      username: yup
        .string()
        .required("UserName is required")
        .min(10, "User Name should be minimum  20 characters long")
        .max(45, "Email/Username must not be greator than 45 characters"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password should be minimum  6 characters long")
        .max(25, "Password must not be greator than 25 characters"),
    }),
    onSubmit: async (values) => {
      setformSubmitted(true);
      //   dispatch(setLoader(true));
      // setOpen(true)
      let formdata = {
        usernameOrEmail: values?.username.trimEnd().trimStart(),
        password: values?.password.trimEnd().trimStart(),
      };

      await generateApi(formdata)
        .then((res) => {
          if (res) {
            setformSubmitted(false);
            if (res?.data?.statusDescription?.statusCode == 200) {
              // console.log(res.data);
              setShowOTP(true);
              toast.success(res?.data?.statusDescription?.description);
            } else {
              toast.warning(res?.data?.statusDescription?.description);
            }
          }
        })
        .catch((e) => {
          // toast.error("Exception Occured");
        });
    },
  });

  const verifyOtp = async () => {
    setOtpForm(true);
    if (!formik.values?.otp) {
      formik.setFieldError("otp");
      // toast.error("OTP is required");
      return;
    }
    let formdata = {
      usernameOrEmail: formik.values?.username,
      password: formik.values?.password,
      otp: formik.values?.otp,
    };
    setformSubmitted(true);
    dispatch(setLoader(true));
    let res = await common_axios.post(`/auth/v1/otp/verify`, formdata);
    if (res) {
      setformSubmitted(false);
      if (res?.data?.statusDescription.statusCode == 200) {
        toast.success(res?.data?.statusDescription?.description);
        // console.log(res.data);
        loggedInSuccessFull(res.data);
        setOtpForm(false);
      } else {
        dispatch(setLoader(false));
        toast.error(res?.data?.statusDescription?.description);
      }
    }
  };

  const loggedInSuccessFull = (data) => {
    // console.log(data.userDetail);
    history.push("/navstatus");
    localStorage.setItem("user", JSON.stringify(data.userDetail));
    localStorage.setItem("userId", JSON.stringify(data?.userDetail?.userId));
    localStorage.setItem("token", data?.userDetail?.userTokenDetail?.jwtToken);

    common_axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data?.userDetail?.userTokenDetail?.jwtToken}`;
    common_axios.defaults.headers.common["source"] = "web";
    common_axios.defaults.headers.common["userId"] = JSON.stringify(
      data?.userDetail?.userId
    );
    dispatch(setisLoginUser(true));
    dispatch(setUserData(data.userDetail));
    dispatch(setLoader(false));
  };

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };

  return (
    <>
      <section className="g-sidenav-show login_8 bg-gray-200 bg_gradient">
        <main className="main-content my-aut lgin_cntnt position-relative w-auto border-radius-l">
          {true ? (
            <>
              <div className="container-fluid login_container_8 px-0">
                <div className="row d-md-flex  h_vh align-items-cente mx-0">
                  <div
                    className="col-md-4  offset-md-3 d-flex align-items-center bg_8 mx-auto form_col_5"
                    // style={{ padding: "3.5rem" }}
                  >
                    <div className="w-100 login_div">
                      {true && (
                        <form
                          className="form_hire p-0"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="" id="sign_in">
                            <div className="">
                              <div className="text-center"></div>
                              <div
                                className="text-center mt-4 form_grid "
                                style={{ display: "inline-grid" }}
                              >
                                <img
                                  src={logo_img}
                                  className="img-fluid beam_img mx-auto"
                                  // style={{ height: "95px" }}
                                ></img>
                                <span className="d-inline-block text-capitalize login_text">
                                  Log in
                                </span>
                              </div>
                            </div>
                            <div className="my-4">
                              <div className="input-group input-group-outline input_field">
                                {true && (
                                  <>
                                    <div className="col-md-12 d-inline-flex">
                                      <div className="me-2 mt-3"></div>
                                      <TextField
                                        required
                                        className="w-100"
                                        label="Username"
                                        name="username"
                                        type="email"
                                        variant="outlined" // Use "outlined" to prevent label misalignment
                                        autoComplete="on"
                                        disabled={showOtp}
                                        size="small"
                                        placeholder="Enter username"
                                        value={formik.values?.username}
                                        onChange={(e) => {
                                          setType(e.target.value);
                                          formik.handleChange(e);
                                        }}
                                        error={
                                          formik.touched.username &&
                                          Boolean(formik.errors.username)
                                        }
                                        helperText={
                                          formik.touched.username &&
                                          formik.errors.username
                                        }
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <i className="fas fa-envelope"></i>
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="input-group input-group-outline input_field mt-4">
                                {true && (
                                  <div className="col-md-12 d-inline-flex">
                                    <div className="me-2 mt-3"></div>
                                    <div className="input-group input-group-outline input_field">
                                      <TextField
                                        required
                                        className="w-100"
                                        label="Password"
                                        placeholder="Enter password"
                                        name="password"
                                        variant="outlined"
                                        disabled={showOtp}
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        // variant="standard"
                                        size="small"
                                        value={formik.values?.password}
                                        onChange={(e) => {
                                          formik.handleChange(e);
                                        }}
                                        error={
                                          formik.touched.password &&
                                          Boolean(formik.errors.password)
                                        }
                                        helperText={
                                          formik.touched.password &&
                                          formik.errors.password
                                        }
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <i className="fas fa-lock"></i>
                                            </InputAdornment>
                                          ),
                                          // <-- This is where the toggle button is added.
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                  handleClickShowPassword
                                                }
                                                onMouseDown={
                                                  handleMouseDownPassword
                                                }
                                              >
                                                {showPassword ? (
                                                  <VisibilityIcon
                                                    sx={{ color: "#56499e" }}
                                                  />
                                                ) : (
                                                  <VisibilityOffIcon
                                                    sx={{ color: "#56499e" }}
                                                  />
                                                )}
                                              </IconButton>
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {showOtp && (
                                <div className="input-group input-group-outline input_field mt-4">
                                  {true && (
                                    <div className="col-md-12 d-inline-flex">
                                      <div className="me-2 mt-3"></div>
                                      <TextField
                                        required
                                        className="w-100"
                                        label="OTP"
                                        name="otp"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        value={formik.values?.otp}
                                        onChange={(e) => {
                                          if (
                                            /^[0-9]*$/.test(e?.target?.value)
                                          ) {
                                            if (e.target.value.length <= 6) {
                                              formik.handleChange(e);
                                            }
                                          }
                                        }}
                                        error={
                                          otpForm && formik.values?.otp == ""
                                        }
                                        helperText={
                                          otpForm &&
                                          formik.values?.otp == "" &&
                                          "OTP is required"
                                        }
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <i className="fas fa-key"></i>{" "}
                                              {/* OTP Key Icon */}
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            {!showOtp && (
                              <button
                                className="btn register_grad d-block w-100 text-white"
                                type="submit"
                                disabled={formSubmitted}
                              >
                                Log In
                              </button>
                            )}
                            {showOtp && (
                              <button
                                className="btn register_grad d-block w-100 text-white"
                                type="button"
                                onClick={(e) => {
                                  verifyOtp();
                                }}
                                disabled={formSubmitted}
                              >
                                Verify
                              </button>
                            )}
                          </div>
                          <div className="row forget_reset mt-4">
                            <div className="col-md-6">
                              <Link
                                to="/forgotpassword"
                                className="text-capitalize link-info fw-bold forget_txt"
                              >
                                Forgot Password
                              </Link>
                            </div>
                            <div className="col-md-6">
                              <div className="text-end">
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    formik.handleReset(e);
                                    setShowOTP(false);
                                    setOtpForm(false);
                                  }}
                                  className="text-capitalize link-info fw-bold reset_txt"
                                >
                                  Reset
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1></h1>
          )}
          {/* ...............................................2 Factor Auth.............................................................. */}
        </main>
      </section>
    </>
  );
}
