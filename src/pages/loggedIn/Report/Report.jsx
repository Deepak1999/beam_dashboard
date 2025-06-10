import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/features/authSliceandSidebar";
import { Autocomplete, FormControl, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

import {
  getCompanies1,
  getCurrencyDetail1s,
  GetSUmmaryData,
} from "../../../services/expenseService";

import "./Report.css";
import { DatePicker } from "rsuite";
import moment from "moment";
import { toast } from "react-toastify";

export default function Report() {
  const dispatch = useDispatch();

  const [companyList, setCompanyList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [currencyList, setCurrencyList] = useState([
    { id: 0, name: "Projected" },
    { id: 1, name: "Actual" },
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    getCompanies();
    // getCurrecnyDetails();
  }, []);

  const placeholderGet = (field) => {
    return <p className="text-danger">{field}</p>;
  };

  const getCompanies = async () => {
    await getCompanies1()
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          // // console.log(res.data);
          setCompanyList(res?.data?.companyMasterList);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  };
  const getCurrecnyDetails = async () => {
    await getCurrencyDetail1s()
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          // // console.log(res.data);
          setCurrencyList(res?.data?.currencyMaster);
        } else {
        }
      })
      .catch((err) => {});
  };

  const formik = useFormik({
    initialValues: {
      companyId: null,
      companyState: null,
      businessId: null,
      businessState: null,
      currencyId: null,
      currencyState: null,
      errors: [],
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      setFormSubmitted(true);

      if (
        !values.currencyState ||
        !values.companyState ||
        !values.businessState
      ) {
        return;
      }

      if (!startDate || !endDate) {
        // let year = `${!startDate ? "Start month & year" : ""}  ${
        //   !endDate ? "End month & year" : ""
        // }   is required `;
        // toast.error(year);
        return;
      }
      dispatch(setLoader(true));
      console.log(values);
      console.log(startDate);
      console.log(endDate);

      console.log(moment(startDate).format("YYYY"));
      console.log(moment(startDate).format("MMM"));

      moment(endDate).format("MMM");
      moment(endDate).format("YYYY");
      //   if (!bulkUpload) {
      //     // // console.log(errors);
      //     if (
      //       errorsList.length > 0 &&
      //       (!values?.companyState ||
      //         !values?.businessState ||
      //         !values?.currencyState) &&
      //       !approverName
      //     ) {
      //       if (errorsList.length > 0) {
      //         toast.error("Please fill all required fields");
      //       }
      //       if (
      //         !approverName &&
      //         formik.values?.businessState?.approversList.length == 0
      //       ) {
      //         toast.warning("Approver not available");
      //       }

      //       return;
      //     }
      //   }

      let formdata = {
        companyId: values.companyId,
        businessId: values.businessId,
        budgetType: values.currencyId,
        startMonth: moment(startDate).format("MMM"),
        startYear: moment(startDate).format("YYYY"),
        endMonth: moment(endDate).format("MMM"),
        endYear: moment(endDate).format("YYYY"),
      };

      await GetSUmmaryData(formdata).then((res) => {
        if (res.data.statusDescription.statusCode == 200) {
          console.log(res.data);
          dispatch(setLoader(false));

          setFormSubmitted(false);
          const a = document.createElement("a");
          a.href = res.data.downloadUrl;
          //   a.target = "_blank";
          a.click();
        } else if (res.data.statusDescription.statusCode == 450) {
          toast.warning(res.data.statusDescription.description);
        } else {
          toast.error(res.data.statusDescription.description);
        }
      });
      //   dispatch(setLoader(true));

      //   await saveBusiness(formdata).then((res) => {
      //     if (res?.data?.statusDescription?.statusCode == 200) {
      //       toast.success(res?.data?.statusDescription?.description);
      //       refreshExpenses();
      //       setBulkUpload(false);
      //       dispatch(setLoader(false));
      //       resetForm();
      //       document.getElementById("close_confirm")?.click();
      //       setFormSubmitted(false);
      //       document.getElementById("reset_id")?.click();
      //       dispatch(setTabIndex("myreq"));
      //       history.push("/navstatus");
      //     } else {
      //       toast.error(res?.data?.statusDescription?.description);
      //     }
      //   });
    },
  });

  return (
    <>
      <div className="p-4 content_main_open" id="create_expense">
        <div className="card shadow-none border bg_white create_expense_card">
          <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
            <i className="fas fa-plus-circle mx-1"></i>&nbsp; Summary Report
          </span>
          <div className="card-body">
            <form className="row mt- my-0 g-3 needs-validation">
              <div className="my-4 mb-2">
                <div className="row d-flex w-100 m-0">
                  <div className="col-md-2">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={companyList || []}
                        getOptionLabel={(option) => option?.companyName}
                        value={formik.values?.companyState}
                        required
                        onChange={(event, newValue, reason) => {
                          if (reason == "clear") {
                            // resetForm(event);
                            formik.setFieldValue("companyId", null);
                            formik.setFieldValue("companyState", null);
                            return;
                          }

                          formik.setFieldValue("companyId", newValue.companyId);
                          formik.setFieldValue("companyState", newValue);
                          setBusinessList(newValue.businessMaster);
                          // // console.log(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Company"
                            required
                            error={
                              formSubmitted &&
                              formik.values?.companyState == null
                            }
                            helperText={
                              formSubmitted &&
                              formik.values?.companyState == null
                                ? "Company  is required"
                                : ""
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-2">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={businessList || []}
                        getOptionLabel={(option) => option?.businessName}
                        value={formik.values?.businessState}
                        required
                        onChange={(event, newValue, reason) => {
                          if (reason == "clear") {
                            formik.setFieldValue("businessId", null);
                            formik.setFieldValue("businessState", null);
                            return;
                          }

                          // // console.log(newValue);
                          formik.setFieldValue(
                            "businessId",
                            newValue.businessId
                          );
                          formik.setFieldValue("businessState", newValue);

                          // // console.log(newValue);

                          //   let obj = newValue?.approversList?.find((x) => {
                          //     return x.approvarLevel == 0;
                          //   });
                          //   setAccountCodes(newValue.accountCodes);
                        }}
                        // isOptionEqualToValue={(option, value) =>
                        //   option.companyId == value?.id
                        // }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Business"
                            required
                            error={
                              formSubmitted &&
                              formik.values?.businessState == null
                            }
                            helperText={
                              formSubmitted &&
                              formik.values?.businessState == null
                                ? "Business  is required"
                                : ""
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-2">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={currencyList || []}
                        getOptionLabel={(option) => option?.name}
                        value={formik.values?.currencyState}
                        required
                        onChange={(event, newValue, reason) => {
                          if (reason == "clear") {
                            formik.setFieldValue("currencyId", null);
                            formik.setFieldValue("currencyState", null);
                            return;
                          }
                          //   setCurrencyId(newValue.currencyCode);
                          // // console.log(newValue);
                          formik.setFieldValue("currencyId", newValue.id);
                          formik.setFieldValue("currencyState", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Budget Type"
                            error={
                              formSubmitted &&
                              formik.values?.currencyState == null
                            }
                            helperText={
                              formSubmitted &&
                              formik.values?.currencyState == null
                                ? "Budget Type is required"
                                : ""
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-2">
                    <DatePicker
                      format="MMM-yyyy"
                      appearance="default"
                      placeholder="Start Year & Month"
                      value={startDate}
                      onChange={setStartDate}
                      oneTap
                      className={`${
                        !startDate && formSubmitted
                          ? "is-invalid12 custom-datepicker"
                          : ""
                      } `}
                    />
                    {!startDate && formSubmitted && (
                      <span className="class_span">
                        {" "}
                        Start month is required
                      </span>
                    )}
                  </div>
                  <div className="col-md-2">
                    <DatePicker
                      format="MMM-yyyy"
                      appearance="default"
                      placeholder="End Year & Month"
                      value={endDate}
                      onChange={setEndDate}
                      oneTap
                      className={`${
                        !endDate && formSubmitted ? "is-invalid12" : ""
                      } `}
                    />
                    {!endDate && formSubmitted && (
                      <span className="class_span"> End month is required</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-3 ">
                <div className="col-md-12 d-flex justify-content-end mx-auto">
                  <div>
                    <button
                      className="btn btn-danger btns_last mx-2"
                      type="reset"
                      id="reset_id"
                      onClick={(e) => {
                        formik.handleReset(e);
                        setStartDate(null);
                        setEndDate(null);
                        setFormSubmitted(false);
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="btn btn-success btns_last mx-2"
                      type="submit"
                      // data-bs-toggle="modal"
                      // data-bs-target="#exampleModal6"
                      onClick={(e) => {
                        formik.handleSubmit(e);
                        e.preventDefault();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
