import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./CreateExpense.css";
import {
  getClientCostCenters,
  getCompanies1,
  getCosstCenterDetails,
  getCurrencyDetail1s,
  getDataByUploadId,
  getSummaryDetails1122,
  getYearMont1h,
  saveBusiness,
  uploadFile,
} from "../../../services/expenseService";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import {
  setLoader,
  setTabIndex,
  setUploadIdState,
} from "../../../redux/features/authSliceandSidebar";
import DynamicModal from "../../../Components/Modal";
import DataTable from "../../../Components/DataTablePage";
import TablewithoutPagination from "../../../Components/TablewithoutPagination";
import moment from "moment";
import { DatePicker } from "rsuite";

export default function CreateExpense() {
  const [user, setUser] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [accountCodes, setAccountCodes] = useState([]);

  const [monthHeadlist, setMonthHeadlist] = useState([]);

  const [summaryData, setSummaryData] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [approverName, setApproverName] = useState("");
  const [summaryHead, setSummaryHead] = useState(null);

  const [heading, setHeading] = useState("");

  const [details, setDetails] = useState(null);

  const [businessTypeList, setbusinessTypeList] = useState([
    {
      id: 1,
      name: "Expense",
      value: "expense",
    },
    {
      id: 2,
      name: "Revenue",
      value: "revenue",
    },
  ]);

  const [errorsList, setErrorList] = useState([]);

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const closeBulkRef = useRef(null);

  const [uploadId, setUploadId] = useState(0);
  const [currencyList, setCurrencYList] = useState([]);
  const [yearList, setyearList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  const [currencyId, setCurrencyId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadData, setUploadData] = useState([]);

  const [bulkUpload, setBulkUpload] = useState(false);

  const [budgetType, setBudgetType] = useState(0);

  const dispatch = useDispatch();

  const [requiredFields, setRequiredFields] = useState([
    {
      name: "head",
      maxLength: null,
      minLength: null,
      required: true,
      value: null,
      showName: "Head",
    },

    // {
    //   name: "costCenterName",
    //   maxLength: null,
    //   minLength: null,
    //   required: true,
    //   value: null,
    //   showName: "Cost Center Name",
    // },
    {
      name: "year",
      maxLength: null,
      minLength: null,
      required: true,
      value: null,
      showName: "Year",
    },
    {
      name: "month",
      maxLength: null,
      minLength: null,
      required: true,
      value: null,
      showName: "Month",
    },
    // {
    //   name: "quantity",
    //   maxLength: null,
    //   minLength: null,
    //   required: true,
    //   value: 1,
    //   showName: "Quantity",
    // },
    {
      name: "ratePerUnit",
      maxLength: null,
      minLength: null,
      required: true,
      value: null,
      showName: "Rate",
    },
    // {
    //   name: "Field",
    //   maxLength: null,
    //   minLength: null,
    //   required: true,
    //   value: null,
    //   showName: "Rate",
    // },
    // {
    //   name: "totalRevenueAmount",
    //   maxLength: null,
    //   minLength: null,
    //   required: true,
    //   value: null,
    //   showName: "Total Amount",
    // },
  ]);

  const history = useHistory();

  const [obj, setObj] = useState({
    accountCodeId: null,
    accountCode: null,
    mainHead: null,
    head: null,
    costCenterCode: null,
    ledgerName: null,
    costCenterName: null,
    serviceDescription: null,
    quantity: 1,
    ratePerUnit: "",
    year: null,
    totalRevenueAmount: "",
    monthlyExpenseAmount: null,
    monthlyProjectedAmount: null,
    accountState: null,
    costCenterList: [],
    businessType: null,
    yearState: null,
    monthState: null,
    month: null,
    ledgerCodeList: [],
    ledgerState: null,
    ledgerName: "",
    companyName: "",
    businessName: "",
    newAccountList: [],
  });
  const [subList, setSubList] = useState([
    {
      accountCodeId: null,
      accountCode: null,
      mainHead: null,
      head: null,
      costCenterCode: null,
      ledgerName: null,
      costCenterName: null,
      serviceDescription: null,
      quantity: 1,
      ratePerUnit: null,
      year: null,
      totalRevenueAmount: null,
      monthlyExpenseAmount: null,
      monthlyProjectedAmount: null,
      accountState: null,
      costCenterList: [],
      costCenterState: null,
      costCenterId: null,
      yearState: null,
      monthState: null,
      month: null,
      businessType: null,
      ledgerCodeList: [],
      ledgerState: null,
      ledgerName: "",
      companyName: "",
      businessName: "",
      newCostCenterDetails: [],
      costClientCode: null,
      costClientName: null,
      costClientState: null,
      newAccountList: [],
    },
  ]);

  const refreshExpenses = () => {
    let val = [];
    val.push({
      accountCodeId: null,
      accountCode: null,
      mainHead: null,
      head: null,
      costCenterCode: null,
      ledgerName: null,
      costCenterName: null,
      serviceDescription: null,
      quantity: 1,
      ratePerUnit: null,
      year: null,
      totalRevenueAmount: null,
      monthlyExpenseAmount: null,
      monthlyProjectedAmount: null,
      accountState: null,
      costCenterList: [],
      costCenterState: null,
      costCenterId: null,
      yearState: null,
      monthState: null,
      month: null,
      businessType: null,
      ledgerCodeList: [],
      ledgerState: null,
      ledgerName: "",
      companyName: "",
      businessName: "",
    });
    setSubList(val);
  };

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      // localStorage.getItem('userId')
      getCompanies();
      getYearList();
      getCurrecnyDetails();

      console.log(location);
      console.log(history.location.pathname);
    } else {
      setUser(null);
    }
  }, []);

  const clearFields = (index) => {
    const val = [...subList];

    val[index].accountState = null;
    val[index].accountCode = null;
    val[index].mainHead = null;
    val[index].accountCodeId = null;
    val[index].head = null;
    val[index].costCenterState = null;
    val[index].costCenterId = null;
    val[index].costCenterState = null;
    val[index].costClientCode = null;
    val[index].costClientName = null;
    val[index].newCostCenterDetails = [];
    val[index].newCostCenterDetails = [];
    val[index].costCenterState = null;
    val[index].costCenterId = null;
    val[index].costClientState = null;
    val[index].ledgerState = null;
    val[index].yearState = null;
    val[index].year = null;
    val[index].monthState = null;
    val[index].quantity = 1;
    val[index].ratePerUnit = "";
    val[index].totalRevenueAmount = "";

    setSubList(val);
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  useEffect(() => {
    if (history.location.pathname == "/createactual") {
      setBudgetType(1);
      setHeading("Add Actuals");
      document.getElementById("reset_id")?.click();
    } else {
      setBudgetType(0);
      setHeading("Create Projections");
      document.getElementById("reset_id")?.click();
    }
  }, [history.location.pathname]);

  const mapSetter = async (bulkData) => {
    // Initialize array with default object
    let arr = [
      {
        accountCodeId: null,
        accountCode: null,
        mainHead: null,
        head: null,
        costCenterCode: null,
        ledgerName: "",
        costCenterName: null,
        serviceDescription: null,
        quantity: null,
        ratePerUnit: "",
        year: null,
        totalRevenueAmount: "",
        monthlyExpenseAmount: null,
        monthlyProjectedAmount: null,
        accountState: null,
        costCenterList: [],
        businessType: null,
        yearState: null,
        monthState: null,
        month: null,
        ledgerCodeList: [],
        ledgerState: null,
        companyName: "",
        businessName: "",
      },
    ];

    // Fetch revenue and expense cost center lists
    const fetchCostCenterList = async (businessType) => {
      const obj = bulkData.find((x) => x.businessType === businessType);
      if (!obj) return [];

      const formdata = {
        companyId: obj.companyId,
        businessId: obj.businessId,
        accountCode: obj.accountCode,
      };

      const res = await getCosstCenterDetails(formdata);
      return res?.data?.statusDescription?.statusCode === 200
        ? res?.data?.costCenterMasterList
        : [];
    };

    const [revcostList, expcostList] = await Promise.all([
      fetchCostCenterList("revenue"),
      fetchCostCenterList("expense"),
    ]);

    // subList = bulkData;

    // // Process bulkData
    // const subList = bulkData.map((x, index) => {
    //   const companyState =
    //     companyList.find((cl) => cl.companyId === x.companyId) || null;
    //   const businessState =
    //     companyState?.businessMaster?.find(
    //       (b) => b.businessId === x.businessId
    //     ) || null;
    //   const currencyState = currencyList.includes(x.currency)
    //     ? x.currency
    //     : null;
    //   const accountCodeState =
    //     businessState?.accountCodes?.find(
    //       (a) => a.accountCodeId === x.accountCodeId
    //     ) || null;
    //   const monthState = monthList.find((m) => m.includes(x.month)) || null;
    //   const yearState = yearList.includes(x.year) ? x.year : null;
    //   const ledgerCodeList = accountCodeState?.ledgerCodes || [];
    //   const ledgerState =
    //     ledgerCodeList.find((l) => l.ledgerCodeId === x.ledgerCodeId) || null;
    //   const costCenterList =
    //     x.businessType === "revenue" ? revcostList : expcostList;
    //   const costCenterState =
    //     costCenterList.find((c) => c.costCenterId === x.costCenterId) || null;
    //   const currecyState = currencyList.find(
    //     (x1) => x1.currencyCode == x.currency
    //   );
    //   // Set approver name if approverLevel is 0
    //   const approver = businessState?.approversList?.find(
    //     (a) => a.approvarLevel === 0
    //   );
    //   if (approver) setApproverName(approver.approverName);

    //   setAccountCodes(businessState?.accountCodes || []);
    //   setBusinessList(companyState?.businessMaster);

    //   const newItem = {
    //     ...x,
    //     yearState,
    //     accountState: accountCodeState,
    //     monthState,
    //     currencyState: currecyState,
    //     businessState,
    //     ledgerCodeList,
    //     ledgerState,
    //     costCenterState,
    //     costCenterList,
    //     companyState,
    //   };
    //   formik.setFieldValue("companyId", x.companyId);
    //   formik.setFieldValue("companyState", companyState);
    //   formik.setFieldValue("businessState", businessState);
    //   formik.setFieldValue("currencyState", currecyState);
    //   formik.setFieldValue("currencyId", currecyState.currencyCode);
    //   formik.setFieldValue("businessId", x.businessId);

    //   setCurrencyId(currecyState.currencyCode);

    //   return newItem;
    // });

    setSubList(bulkData);
    dispatch(setLoader(false));
    // getDataByUploadId1(bulkData[0]["uploadId"]);
  };

  const handleOpenModal = (type) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (event) => {
    formik.setFieldValue("file", null);
    const file = event.target.files[0];
    if (!file) return;

    // console.log(file.name.split("."));

    if (
      file.name.split(".")[1] == "xlsx" ||
      file.name.split(".")[1] == "xls" ||
      file.name.split(".")[1] == "csv"
    ) {
    } else {
      toast.warning("Please upload only excel files");
      return;
    }

    formik1.setFieldValue("file", file);
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
      yearMonthState: null,
      year: "",
      month: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      if (!bulkUpload) {
        // // console.log(errors);
        if (
          errorsList.length > 0 &&
          (!values?.companyState ||
            !values?.businessState ||
            !values?.currencyState) &&
          !approverName
        ) {
          if (errorsList.length > 0) {
            toast.error("Please fill all required fields");
          }
          if (
            !approverName &&
            formik.values?.businessState?.approversList.length == 0
          ) {
            toast.warning("Approver not available");
          }

          return;
        }
      }

      let formdata = {
        businessDetail: [],
      };
      dispatch(setLoader(true));
      if (bulkUpload) {
        subList?.forEach((data) => {
          data["raisedBy"] = user.fullName;
          data["roleId"] = user.role.id;
          data["companyId"] = values.companyId;
          data["businessId"] = values.businessId;
          data["businessType"] = data.type ? data.type : data.businessType;
          data["budgetType"] = budgetType;
          formdata.businessDetail.push(data);
        });
      } else {
        subList?.forEach((data) => {
          data["costClientName"] = data.costCenterState?.costCenterName;
          data["costCenterName"] = data.costClientState?.costCenterName;
          data["costClientCode"] = data.costCenterState?.costCenterCode;
          data["costCenterId"] = data.costCenterState?.costCenterId;
          data["costCenterCode"] = data.costClientState?.costCenterCode;

          // // console.log(data);
          data["raisedBy"] = user.fullName;
          data["roleId"] = user.role.id;
          data["accountCodeId"] = data.accountState.accountCodeId;
          data["currency"] = values?.currencyId;
          data["businessType"] = data.type ? data.type : data.businessType;
          // data["businessType"] = data.type;
          data["businessName"] = values?.businessState.businessName;
          data["companyName"] = values?.companyState.companyName;
          // data["ledgerCode"] = data.ledgerState.ledgerCode;
          data["companyId"] = values.companyId;
          data["businessId"] = values.businessId;
          // data["ledgerName"] = data.ledgerState.ledgerName;
          data["budgetType"] = budgetType;
          data["costCenterId"] = data.costCenterState?.costCenterId;
          formdata.businessDetail.push(data);
        });
      }

      await saveBusiness(formdata).then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          toast.success(res?.data?.statusDescription?.description);
          refreshExpenses();
          setBulkUpload(false);
          dispatch(setLoader(false));
          resetForm();
          document.getElementById("close_confirm")?.click();
          setFormSubmitted(false);
          document.getElementById("reset_id")?.click();
          dispatch(setTabIndex("myreq"));
          history.push("/navstatus");
        } else {
          toast.error(res?.data?.statusDescription?.description);
        }
      });
    },
  });

  const formik1 = useFormik({
    initialValues: {
      file: null,
      submitted: false,
      budgetType: budgetType,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let formdata = new FormData();
      formik1.setFieldValue("submitted", true);

      if (!formik.values.yearMonthState) {
        toast.warning("Year and Month is required");
        return;
      }
      if (!values?.file) {
        toast.warning("file is required");
        return;
      }

      dispatch(setLoader(true));

      formdata.append("file", values?.file);
      formdata.append("companyName", formik.values.companyState.companyName);
      formdata.append("businessName", formik.values.businessState.businessName);
      formdata.append("currency", formik.values.currencyId);
      formdata.append("year", formik.values.year);
      formdata.append(
        "month",
        moment(formik.values.yearMonthState).format("MMM")
      );

      formdata.append("budgetType", values?.budgetType);

      await uploadFile(formdata)
        .then((res) => {
          dispatch(setLoader(false));
          if (res?.data?.statusDescription?.statusCode == 200) {
            closeBulkRef?.current?.click();
            formik1.setFieldValue("submitted", false);

            // console.log(res?.data?.businessDetailDraftList["uploadId"]);

            setBulkUpload(true);
            setUploadData(res?.data?.businessDetailDraftList);

            setUploadId(res?.data?.businessDetailDraftList[0]["uploadId"]);
            dispatch(
              setUploadIdState(
                res?.data?.businessDetailDraftList[0]["uploadId"]
              )
            );

            console.log(res?.data?.businessDetailDraftList[0]["uploadId"]);
            getDataByUploadId1(
              res?.data?.businessDetailDraftList[0]["uploadId"]
            );

            const companyState =
              companyList.find(
                (cl) =>
                  cl.companyId ===
                  res?.data?.businessDetailDraftList[0].companyId
              ) || null;
            const businessState =
              companyState?.businessMaster?.find(
                (b) =>
                  b.businessId ===
                  res?.data?.businessDetailDraftList[0].businessId
              ) || null;
            const currecyState = currencyList.find(
              (x1) =>
                x1.currencyCode ==
                res?.data?.businessDetailDraftList[0].currency
            );
            const approver = businessState?.approversList?.find(
              (a) => a.approvarLevel === 0
            );
            if (approver) setApproverName(approver.approverName);

            formik.setFieldValue(
              "companyId",
              res?.data?.businessDetailDraftList[0].companyId
            );
            formik.setFieldValue("companyState", companyState);
            formik.setFieldValue("businessState", businessState);
            formik.setFieldValue("currencyState", currecyState);
            formik.setFieldValue("currencyId", currecyState.currencyCode);
            formik.setFieldValue(
              "businessId",
              res?.data?.businessDetailDraftList[0].businessId
            );

            setCurrencyId(currecyState.currencyCode);
            mapSetter(res?.data?.businessDetailDraftList);
          } else {
            toast.error(res?.data?.statusDescription?.description);
            dispatch(setLoader(false));
          }
        })
        .catch((err) => {
          // toast.error("Something wrong");
          dispatch(setLoader(false));
        });
    },
  });

  const getDataByUploadId1 = async (uploadId) => {
    let formdata = {
      uploadId: uploadId,
      summaryType: "draft",
      budgetType: budgetType,
    };
    await getDataByUploadId(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        // console.log(res?.data.businessSummary);
        let data = transformData(res.data);
        // console.log(data);
        setSummaryData(data.tableData);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
      }
    });
  };

  const getAmountHandle = (value) => {
    return value ? new Intl.NumberFormat().format(value) : "N/A";
  };

  // const transformData = (data) => {
  //   // Extract unique months from all businessSummary entries
  //   const months = new Set();
  //   data.businessSummary.forEach((entry) => {
  //     Object.keys(entry.monthlyRevenue).forEach((month) => {
  //       months.add(month);
  //     });
  //   });

  //   const monthHeaders = Array.from(months).sort((a, b) => {
  //     const [monthA, yearA] = a.split("-");
  //     const [monthB, yearB] = b.split("-");

  //     const yearDiff = parseInt(yearA, 10) - parseInt(yearB, 10);
  //     if (yearDiff !== 0) return yearDiff; // Sort by year first

  //     return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB); // Then by month
  //   }); // Sorted for consistency

  //   // Convert businessSummary into table-ready data
  //   const tableData = data.businessSummary.map((entry) => {
  //     let row = {
  //       costCenterName: entry.costCenterName,
  //       head: entry.head,
  //       businessType: entry.businessType,
  //       currency: entry.currency,
  //       totalSum: entry.totalSum,
  //       // uploadId: entry?.uploadId,
  //     };

  //     // Populate revenue values dynamically for each month
  //     monthHeaders.forEach((month) => {
  //       row[month] = entry.monthlyRevenue[month] || 0; // Default to 0 if not present
  //     });

  //     console.log(row);

  //     return row;
  //   });
  //   setMonthHeadlist(monthHeaders);
  //   return { monthHeaders, tableData };
  // };
  const transformData = (data) => {
    // Extract unique months from all businessSummary entries
    const months = new Set();
    data.businessSummary.forEach((entry) => {
      Object.keys(entry.monthlyRevenue).forEach((month) => {
        months.add(month);
      });
    });

    // console.log(months);

    const monthHeaders = Array.from(months).sort((a, b) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");

      const yearDiff = parseInt(yearA, 10) - parseInt(yearB, 10);
      if (yearDiff !== 0) return yearDiff; // Sort by year first

      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB); // Then by month
    }); // Sorted for consistency

    // Convert businessSummary into table-ready data
    const tableData = data.businessSummary.map((entry) => {
      let row = {
        costCenterName: entry.costCenterName,
        head: entry.head,
        businessType: entry.businessType,
        currency: entry.currency,
        totalSum: entry.totalSum,
        uploadId: entry.uploadId,
        costClientName: entry.costClientName,
      };

      // Populate revenue values dynamically for each month
      monthHeaders.forEach((month) => {
        row[month] = entry.monthlyRevenue[month] || 0; // Default to 0 if not present
      });

      console.log(monthHeaders);

      return row;
    });
    dispatch(setLoader(false));
    setMonthHeadlist(monthHeaders);
    return { monthHeaders, tableData };
  };
  const handleSummaryClick = useCallback((row) => {
    console.log(row);
    getSummaryDetails1(row);
  }, []);

  const getSummaryDetails1 = useCallback(async (cell) => {
    let formdata = {
      head: cell.row.original.head,
      costCenterName: cell.row.original.costCenterName,
      uploadId: cell.row.original.uploadId,
      businessType: cell.row.original.businessType,
      summaryType: "draft",
    };

    setSummaryHead(formdata);

    console.log(formdata);

    await getSummaryDetails1122(formdata)
      .then((res) => {
        if (res.data.statusDescription.statusCode == 200) {
          setIsOpen(true);
          setDetails(res.data.businessDetails);
        } else {
          toast.error(res.data.statusDescription.description);
        }
      })
      .catch((err) => {
        toast.error("Err", err);
      });
    // Your fetch logic here...
  }, []); // No dependencies unless necessary

  const getFieldHandle = (name) => {
    return name ? name : "N/A";
  };

  const columns1 = useMemo(() => {
    let baseColumns = [
      {
        Header: "Head",
        accessor: "head",
        Cell: (cell) => {
          return (
            <>
              <Tooltip
                title={
                  <h6 style={{ color: "lightblue" }}>
                    {cell.row.original.head}
                  </h6>
                }
                sx={{ cursor: "pointer" }}
                arrow
                placement="right-start"
              >
                <span
                  className="text-success  three_head"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    handleSummaryClick(cell);
                  }}
                >
                  {cell.row.original.head?.slice(0, 25)}
                </span>{" "}
              </Tooltip>
            </>
          );
        },
      },
      // {
      //   Header: "Location",
      //   accessor: "costCenterName",
      //   Cell: (cell) => {
      //     return (
      //       <>
      //         <Tooltip
      //           title={
      //             <h6 style={{ color: "lightblue" }}>
      //               {cell.row.original.costCenterName}
      //             </h6>
      //           }
      //           sx={{ cursor: "pointer" }}
      //           arrow
      //           placement="right-start"
      //         >
      //           <span
      //             className="text-success"
      //             style={{ cursor: "pointer" }}
      //             onClick={(e) => {
      //               handleSummaryClick(cell);
      //             }}
      //           >
      //             {getFieldHandle(
      //               cell.row.original.costCenterName.slice(0, 25)
      //             )}
      //           </span>{" "}
      //         </Tooltip>
      //       </>
      //     );
      //   },
      // },

      {
        Header: "Client",
        accessor: "costClientName",
        Cell: (cell) => {
          return (
            <>
              <Tooltip
                title={
                  <h6 style={{ color: "lightblue" }}>
                    {cell.row.original.costClientName}
                  </h6>
                }
                sx={{ cursor: "pointer" }}
                arrow
                placement="right-start"
              >
                <span
                  className="text-success three_head"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    handleSummaryClick(cell);
                  }}
                >
                  {getFieldHandle(
                    cell.row.original.costClientName?.slice(0, 25)
                  )}
                </span>{" "}
              </Tooltip>
            </>
          );
        },
      },

      {
        Header: "Business Type",
        accessor: "businessType",
        Cell: (cell) => {
          return (
            <>
              <span className="text-success text-capitalize three_head">
                {" "}
                {getFieldHandle(cell.row.original.businessType)}
                <span>({cell.row.original.currency})</span>
              </span>
            </>
          );
        },
      },

      ...monthHeadlist.map((month) => ({
        Header: month,
        accessor: month,
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="amount_span">
                {new Intl.NumberFormat().format(cell.row.original[month])}
              </span>
              {/* {cell.row.original[month]} */}
            </>
          );
        },
      })),
      {
        Header: `Total Sum  ${currencyId}`,
        accessor: "totalSum",
        Cell: (cell) => {
          return (
            <>
              {/* <span
                className="text-success mr-2"
                style={{ marginRight: "2px" }}
              >
                {" "}
                {cell.row.original.currency}
              </span> */}

              <span className="amount_span">
                {new Intl.NumberFormat().format(cell.row.original.totalSum)}
              </span>
            </>
          );
        },
      },
    ];
    // console.log(baseColumns);
    return baseColumns;
  }, [monthHeadlist, summaryData]);

  const columns3 = useMemo(() => {
    let baseColumns = [
      {
        Header: "For Period",
        accessor: "month",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-left acti_span">
                {cell.row.original.month}-{cell.row.original?.year}
              </span>
            </>
          );
        },
      },
      {
        Header: "Ledger Name",
        accessor: "ledgerName",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-left acti_span">
                {cell.row.original.ledgerName}
              </span>
            </>
          );
        },
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="amount_span">{cell.row.original.quantity}</span>
            </>
          );
        },
      },
      {
        Header: `Rate  (${currencyId})`,
        accessor: "ratePerUnit",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="amount_span">
                {cell.row.original.ratePerUnit}
              </span>
            </>
          );
        },
      },
      {
        Header: `Total Amount  (${currencyId})`,
        accessor: "totalRevenueAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="amount_span">
                {cell.row.original.totalRevenueAmount}
              </span>
            </>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.createdAt)).format(
                "DD-MMM-YYYY h:mm a"
              )}
            </>
          );
        },
      },
    ];

    return baseColumns;
  }, [details]);

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

  const getYearList = async () => {
    let year = [];
    let month = [];

    await getYearMont1h()
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          // // console.log(res?.data?.yearMonthMaster);
          res?.data?.yearMonthMaster.forEach((element) => {
            if (element.year) {
              year.push(element.year);
            }
            if (element.month) {
              month.push(element.month);
            }
          });

          let y = [...new Set(year)];
          let yearlist = y;
          // // console.log(yearlist);
          // // console.log(month);
          setyearList(yearlist);
          setMonthList(month);
        }
      })
      .catch((err) => {});
  };

  const getCurrecnyDetails = async () => {
    await getCurrencyDetail1s()
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          // // console.log(res.data);
          setCurrencYList(res?.data?.currencyMaster);
        } else {
        }
      })
      .catch((err) => {});
  };

  const handleChangeInput = (index, event) => {
    const values = [...subList];
    values[index][event.target?.name] = event.target?.value;
    setSubList(values);
  };
  const getCostCenterDetails = async (accountCode, index) => {
    let formdata = {
      companyId: formik.values?.companyId,
      businessId: formik.values?.businessId,
      accountCode: accountCode,
    };
    await getCosstCenterDetails(formdata)
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          const valu = [...subList];

          valu[index].costCenterList = res?.data?.costCenterMasterList;
          setSubList(valu);
        }
      })
      .catch((err) => {});
  };

  const getNewCostCenters = async (data, index) => {
    let formdata = {
      businessType: data.businessType,
      centerCode: data.costCenterCode,
    };

    await getClientCostCenters(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        const valu = [...subList];

        console.log(res?.data);
        valu[index].costClientCode = null;
        valu[index].costClientName = null;
        valu[index].costClientState = null;
        valu[index].newCostCenterDetails = [];
        valu[index].newCostCenterDetails = res?.data?.costClientMappingList;

        setSubList(valu);
      } else {
        const valu = [...subList];

        valu[index].costClientCode = null;
        valu[index].costClientName = null;
        valu[index].costClientState = null;
        valu[index].newCostCenterDetails = [];

        setSubList(valu);
      }
    });
  };
  const handleAddfields = () => {
    let values = [...subList];
    obj.quantity = 1;
    values?.push(obj);
    setSubList(values);
  };

  const handleRemovefields = () => {
    let values = [...subList];
    if (values?.length == 1) {
      return;
    }

    values?.pop();
    setSubList(values);
  };

  const handleChangeFields = (e, value, index) => {
    // // console.log(e);
  };

  const resetForm = (e) => {
    formik.handleReset(e);
    let val = [];
    let on = { ...obj };

    setBulkUpload(false);

    on.quantity = 1;
    on.ratePerUnit = "";
    on.totalRevenueAmount = "";
    on.accountState = null;
    //   on.costCenterState = null;
    //   on.costClientCode = null;
    //  on.costClientName = null;
    setApproverName("");
    setFormSubmitted(false);
    setSummaryData([]);

    val.push(on);
    // // console.log(val);
    setSubList(val);
  };

  const validateFields = (data, fields) => {
    return data.map((item) => {
      let errors = {};
      requiredFields.forEach((field) => {
        if (field.required) {
          if (
            item[field.name] === null ||
            item[field.name] === undefined ||
            item[field.name] === ""
          ) {
            errors[field.name] = `${field.showName} is required`;
          }
        }
      });
      return errors; // Store error object for each row
    });
  };

  return (
    <>
      <div className="p-4 content_main_open" id="create_expense">
        <div className="card shadow-none border bg_white create_expense_card">
          <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
            <i className="fas fa-plus-circle mx-1"></i>&nbsp; {heading}
          </span>
          <div className="card-body">
            <form className="row mt- my-0 g-3 needs-validation">
              <div className="row  w-100 m-0">
                <div className="col-md-12 d-flex mx-2 justify-content-between main_info">
                  <div className="col-md-4 d-fle flex-wrap align-items-center px- justify-content-start">
                    <div className="d-flex mt-2">
                      <p className="create_expense_p d-flex">
                        {" "}
                        <i className="fas fa-user-circle mx-2"></i>
                        &nbsp;Requested By :
                        {/* <span className="mx-1 italics">{user?.fullName}</span> */}
                        <span className="mx-1 text-bold">
                          {" "}
                          <b>{user?.fullName}</b>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 d-fle flex-wrap align-items-center px-">
                    <div className="d-flex mt-2">
                      <p className="create_expense_p d-flex">
                        {" "}
                        <i className="fas fa-user-circle mx-2"></i>
                        &nbsp;Approver:{" "}
                        <span className="mx-1 ">
                          {approverName ? <b>{approverName} </b> : "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4 mb-2">
                <div className="row d-flex w-100 m-0">
                  <div className="col-md-3">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={companyList || []}
                        getOptionLabel={(option) => option?.companyName}
                        value={formik.values?.companyState}
                        required
                        onChange={(event, newValue, reason) => {
                          // // console.log(newValue);
                          if (bulkUpload) {
                            return;
                          }
                          if (reason == "clear") {
                            resetForm(event);
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
                  <div className="col-md-3">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={businessList || []}
                        getOptionLabel={(option) => option?.businessName}
                        value={formik.values?.businessState}
                        required
                        onChange={(event, newValue, reason) => {
                          if (bulkUpload) {
                            return;
                          }
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

                          let obj = newValue?.approversList?.find((x) => {
                            return x.approvarLevel == 0;
                          });

                          if (obj) {
                            setApproverName(obj.approverName);
                          }

                          let arr = [];

                          //Loading.

                          setAccountCodes(newValue.accountCodes);
                        }}
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
                  <div className="col-md-3">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={currencyList || []}
                        getOptionLabel={(option) => option?.currencyCode}
                        value={formik.values?.currencyState}
                        required
                        onChange={(event, newValue, reason) => {
                          // console.log(newValue);
                          if (bulkUpload) {
                            return;
                          }
                          if (reason == "clear") {
                            formik.setFieldValue("currencyId", null);
                            formik.setFieldValue("currencyState", null);
                            return;
                          }
                          if (bulkUpload) {
                            return;
                          }
                          setCurrencyId(newValue.currencyCode);
                          // // console.log(newValue);
                          formik.setFieldValue(
                            "currencyId",
                            newValue.currencyCode
                          );
                          formik.setFieldValue("currencyState", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Currency"
                            error={
                              formSubmitted &&
                              formik.values?.currencyState == null
                            }
                            helperText={
                              formSubmitted &&
                              formik.values?.currencyState == null
                                ? "Currency is required"
                                : ""
                            }
                          />
                        )}
                      />
                    </FormControl>
                  </div>

                  {/* <div className="col-md-3">
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
                  </div> */}
                  <div className="col-md-3 d-flex justify-content-end">
                    <span className="file_excel me-3">
                      <a
                        href="https://beamapi.altruistindia.com/business/v1/download/sample-file/Income_and_Expenses_Template.xlsx"
                        className="cursor-pointer"
                        title="Download sample excel file"
                        style={{ color: "green" }}
                      >
                        <i class="fas fa-file-excel"></i>
                      </a>
                    </span>
                    <button
                      type="button"
                      className="btn btn-primary bulk bulk_btn me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal5"
                      disabled={
                        (!formik.values.companyState ||
                          !formik.values.businessState ||
                          !formik.values.currencyState) &&
                        bulkUpload
                      }
                    >
                      Bulk Upload
                    </button>
                    {bulkUpload && (
                      <button
                        type="button"
                        className="btn  btn-danger bulk  "
                        title="Reset Bulk Upload"
                        onClick={(e) => {
                          resetForm(e);
                          formik1.handleReset(e);
                        }}
                      >
                        <i class="fas fa-undo-alt"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {!bulkUpload && (
                <div className="row  d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-success mx-1 plus_btn"
                    onClick={(e) => {
                      handleAddfields();
                    }}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-1 minus_btn"
                    onClick={(e) => {
                      handleRemovefields();
                    }}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
              )}
              {!bulkUpload &&
                subList?.map((subObj, index) => {
                  return (
                    <div className="mt-3 my-4 drop_main_div" key={index}>
                      <div className=" more_padding card p-">
                        <div className="sub_expense_div row w-100 m-0 p-0">
                          <div
                            id="create_expense"
                            className="ro expense_div d-fle w-100 m-0 p- p-3"
                          >
                            <div className="col-md- d-flex m-0 p- w-100 justify-content-end pt-  pb-">
                              <div className="col-md-1 d-flex justify-content-center align-items-center cross">
                                <button
                                  type="button"
                                  className="btn btn-sm clear_btn"
                                  onClick={(e) => {
                                    let val = [...subList];
                                    val[index].quantity = 1;
                                    val[index].ratePerUnit = "";
                                    val[index].totalRevenueAmount = "";
                                    val[index] = obj;

                                    setSubList(val);
                                  }}
                                >
                                  <i className="fas fa-trash-alt ms-1"></i>{" "}
                                  &nbsp;Clear
                                </button>
                              </div>
                            </div>
                            <div className="col-md- row px-0 my-3">
                              <div className="col-md-3">
                                <FormControl
                                  fullWidth
                                  required="true"
                                  className=" mus"
                                  style={{ height: "31px" }}
                                >
                                  <InputLabel
                                    style={{ fontSize: "11px" }}
                                    // id="demo-simple-select-label"
                                    // shrink="true"
                                  >
                                    Select Business Type
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    // id="demo-simple-select"
                                    value={subObj?.businessType}
                                    style={{
                                      fontSize: "10px",
                                      padding: "10px",
                                    }}
                                    name="businessType"
                                    // InputLabelProps={{ shrink: true }}
                                    // inputProps={{
                                    //   shrink: true,
                                    // }}
                                    required
                                    label="Business Type"
                                    // InputProps={{ style: { fontSize: '11px' } }}
                                    onChange={(event) => {
                                      clearFields(index);
                                      handleChangeInput(index, event);
                                    }}
                                  >
                                    {businessTypeList.length > 0 &&
                                      businessTypeList?.map((d, index) => {
                                        return (
                                          <MenuItem value={d.value} key={index}>
                                            {d?.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="col-md-3">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={
                                      accountCodes.filter((x) => {
                                        return x.type == subObj.businessType;
                                      }) || []
                                    }
                                    name="accountCode"
                                    getOptionLabel={(option) => option?.head}
                                    required
                                    value={subObj.accountState || null}
                                    onChange={(event, newValue, reason) => {
                                      if (reason == "clear") {
                                        const val = [...subList];
                                        val[index].accountState = null;
                                        val[index].accountCode = null;
                                        val[index].mainHead = null;
                                        val[index].accountCodeId = null;
                                        val[index].head = null;
                                        val[index].costCenterState = null;
                                        val[index].costCenterId = null;
                                        val[index].costCenterState = null;
                                        val[index].costClientCode = null;
                                        val[index].costClientName = null;
                                        val[index].newCostCenterDetails = [];
                                        val[index].newCostCenterDetails = [];
                                        val[index].costCenterState = null;
                                        val[index].costCenterId = null;
                                        val[index].costClientState = null;
                                        val[index].ledgerState = null;
                                        val[index].yearState = null;
                                        val[index].year = null;
                                        val[index].monthState = null;
                                        val[index].quantity = 1;
                                        val[index].ratePerUnit = "";
                                        val[index].totalRevenueAmount = "";

                                        setSubList(val);
                                        return;
                                      }

                                      // // console.log(newValue);
                                      const val = [...subList];

                                      val[index].accountState = newValue;
                                      val[index].accountCode =
                                        newValue.accountCode;
                                      val[index].mainHead = newValue.mainHead;
                                      val[index].accountCodeId =
                                        newValue.accountCodeId;
                                      val[index].head = newValue.head;
                                      val[index].costCenterState = null;
                                      val[index].costCenterId = null;
                                      val[index].ledgerState = null;
                                      val[index].businessType = newValue.type;
                                      val[index].ledgerCodeList =
                                        newValue.ledgerCodes;

                                      val[index].costClientState = null;

                                      val[index].yearState = null;
                                      val[index].year = null;
                                      val[index].monthState = null;
                                      val[index].quantity = 1;
                                      val[index].ratePerUnit = "";
                                      val[index].totalRevenueAmount = "";
                                      setSubList(val);
                                      getCostCenterDetails(
                                        newValue.accountCode,
                                        index
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Head"
                                        error={
                                          formSubmitted &&
                                          subObj.accountState == null
                                        }
                                        helperText={
                                          formSubmitted &&
                                          subObj.accountState == null
                                            ? "Head  is required"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div>
                              {/* <div className="col-md-3">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={subObj?.ledgerCodeList || []}
                                    name="costCenter"
                                    getOptionLabel={(option) =>
                                      option?.ledgerName
                                    }
                                    value={subObj?.ledgerState || null}
                                    required
                                    onChange={(event, newValue, reason) => {
                                      if (reason == "clear") {
                                        const val = [...subList];
                                        val[index].ledgerState = null;
                                        setSubList(val);

                                        return;
                                      }

                                      const val = subList?.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              ledgerState: newValue,
                                              ...newValue,
                                            }
                                          : item
                                      );
                                      setSubList(val);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        // val[index].businessType
                                        label={"Select Ledger Name"}
                                        error={
                                          formSubmitted &&
                                          subObj.ledgerState == null
                                        }
                                        helperText={
                                          formSubmitted &&
                                          subObj.ledgerState == null
                                            ? "Ledger Name is required"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div> */}
                              {uploadData.length > 0 &&
                              subObj.costCenterList?.length > 0 ? (
                                <div className="col-md-3">
                                  <FormControl fullWidth>
                                    <Autocomplete
                                      options={subObj?.costCenterList}
                                      name="costCenter"
                                      getOptionLabel={(option) =>
                                        option?.costCenterName
                                      }
                                      value={subObj?.costCenterState}
                                      required
                                      onChange={(event, newValue, reason) => {
                                        if (reason == "clear") {
                                          const val = [...subList];
                                          val[index].costCenterState = null;
                                          val[index].costCenterId = null;
                                          val[index].costCenterName = null;
                                          val[index].newCostCenterDetails = [];

                                          setSubList(val);

                                          return;
                                        }

                                        console.log(newValue);

                                        const val = [...subList];
                                        val[index].costCenterState = newValue;
                                        val[index].costCenterId = newValue?.id;
                                        val[index].costCenterName =
                                          newValue.costCenterName;
                                        setSubList(val);

                                        let formdata = {
                                          costCenterCode:
                                            newValue.costCenterCode,
                                          businessType: newValue.type,
                                        };

                                        getNewCostCenters(formdata, index);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          // val[index].businessType
                                          label={
                                            // subObj?.businessType == "revenue"
                                            //   ? "Select Client"
                                            //   : "Select Location"

                                            "Select Client"
                                          }
                                          error={
                                            formSubmitted &&
                                            subObj.costCenterState == null
                                          }
                                          helperText={
                                            formSubmitted &&
                                            subObj.costCenterState == null
                                              ? "Cost Center is required"
                                              : ""
                                          }
                                        />
                                      )}
                                    />
                                  </FormControl>
                                </div>
                              ) : (
                                <div className="col-md-3">
                                  <FormControl fullWidth>
                                    <Autocomplete
                                      options={subObj?.costCenterList || []}
                                      name="costCenter"
                                      getOptionLabel={(option) =>
                                        option?.costCenterName
                                      }
                                      value={subObj?.costCenterState || null}
                                      required
                                      onChange={(event, newValue, reason) => {
                                        if (reason == "clear") {
                                          const val = [...subList];
                                          val[index].costCenterState = null;
                                          val[index].costCenterId = null;
                                          val[index].newCostCenterDetails = [];
                                          val[index].costClientState = null;
                                          val[index].costClientCode = null;
                                          val[index].costClientName = null;
                                          setSubList(val);

                                          return;
                                        }

                                        console.log(newValue);
                                        const val = [...subList];
                                        val[index].costCenterState = newValue;
                                        val[index].costCenterId = newValue?.id;
                                        setSubList(val);

                                        let formdata = {
                                          costCenterCode:
                                            newValue.costCenterCode,
                                          businessType: newValue.type,
                                        };

                                        getNewCostCenters(formdata, index);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          // val[index].businessType
                                          label={
                                            // subObj?.businessType == "revenue"
                                            //   ? "Select Client"
                                            //   : "Select Location"
                                            "Select Client"
                                          }
                                          error={
                                            formSubmitted &&
                                            subObj.costCenterState == null
                                          }
                                          helperText={
                                            formSubmitted &&
                                            subObj.costCenterState == null
                                              ? "Cost Center is required"
                                              : ""
                                          }
                                        />
                                      )}
                                    />
                                  </FormControl>
                                </div>
                              )}

                              {/* <div className="col-md-3">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={
                                      subObj?.newCostCenterDetails?.reduce(
                                        (unique, o) => {
                                          if (
                                            !unique.some(
                                              (obj) =>
                                                obj.costCenterName ===
                                                o.costCenterName
                                            )
                                          ) {
                                            unique.push(o);
                                          }
                                          return unique;
                                        },
                                        []
                                      ) || []
                                    }
                                    name="Client"
                                    getOptionLabel={(option) =>
                                      subObj.businessType == "expense"
                                        ? option?.costCenterName
                                        : option?.costCenterName
                                    }
                                    value={subObj?.costClientState || null}
                                    required
                                    onChange={(event, newValue, reason) => {
                                      if (reason == "clear") {
                                        const val = [...subList];
                                        val[index].costClientState = null;
                                        val[index].costClientCode = null;
                                        val[index].costClientName = null;
                                        setSubList(val);

                                        return;
                                      }

                                      console.log(newValue);
                                      let val = [...subList];

                                      val[index]["costClientState"] = newValue;
                                      setSubList(val);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        // val[index].businessType
                                        label={
                                          subObj.businessType == "expense"
                                            ? "Select Client"
                                            : "Select Location"
                                        }
                                        error={
                                          formSubmitted &&
                                          subObj.costClientState == null
                                        }
                                        helperText={
                                          formSubmitted &&
                                          subObj.costClientState == null
                                            ? "Client is required"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div> */}
                            </div>
                            <div className="col-md- p-0 d-flex m-0 p- w-100 justify-content-between pt-0">
                              <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={yearList || []}
                                    name="year"
                                    getOptionLabel={(option) => String(option)}
                                    value={subObj?.year || null}
                                    required
                                    onChange={(event, newValue, reason) => {
                                      if (reason == "clear") {
                                        const val = [...subList];
                                        val[index].yearState = null;
                                        val[index].year = null;
                                        setSubList(val);
                                        return;
                                      }
                                      // // console.log(newValue);
                                      const val = [...subList];
                                      val[index].yearState = newValue;
                                      val[index].year = newValue;
                                      setSubList(val);
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                      option == value
                                    }
                                    renderInput={(params, i) => (
                                      <TextField
                                        {...params}
                                        id={i}
                                        label="Select Year"
                                        error={
                                          formSubmitted &&
                                          subObj.yearState == null
                                        }
                                        helperText={
                                          formSubmitted &&
                                          subObj.yearState == null
                                            ? "Year is required"
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div>
                              <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <FormControl fullWidth>
                                  <Autocomplete
                                    options={monthList || []}
                                    name="month"
                                    getOptionLabel={(option) => option}
                                    value={subObj?.monthState || null}
                                    required
                                    onChange={(event, newValue, reason) => {
                                      if (reason == "clear") {
                                        const val = [...subList];
                                        val[index].monthState = null;
                                        val[index].month = null;
                                        setSubList(val);
                                        return;
                                      }
                                      const val = [...subList];
                                      val[index].monthState = newValue;
                                      val[index].month = newValue;
                                      setSubList(val);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Month"
                                        error={
                                          formSubmitted &&
                                          subObj.monthState == null
                                        }
                                        helperText={
                                          formSubmitted &&
                                          subObj.monthState == null
                                            ? "Month is required"
                                            : ""
                                        }
                                      />
                                    )}
                                    renderOption={(props, option) => (
                                      <li
                                        {...props}
                                        key={`$${option}-${index}`}
                                      >
                                        {option}
                                      </li>
                                    )}
                                  />
                                </FormControl>
                              </div>
                              <div className="col-md-3 d-flex justify-content- align-items-center">
                                <div className="mt-1 w-100">
                                  <TextField
                                    required
                                    className="w-100"
                                    label="Quantity"
                                    name="quantity"
                                    // type="email"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    autoComplete="off"
                                    type="number"
                                    placeholder="Enter Quantity"
                                    size="small"
                                    value={subObj?.quantity || null}
                                    inputProps={{
                                      pattern: "[0-9]*",
                                      inputMode: "numeric",
                                    }}
                                    onChange={(e) => {
                                      handleChangeInput(index, e);
                                    }}
                                    error={
                                      formik.values?.errors[index] &&
                                      formik.values?.errors[index]?.quantity
                                    }
                                    helperText={
                                      formik.values?.errors[index] &&
                                      formik.values?.errors[index]?.quantity
                                    }
                                    onBlur={(e) => {
                                      console.log(subObj.quantity);
                                      console.log(subObj.ratePerUnit);
                                      if (
                                        subObj?.quantity &&
                                        subObj?.ratePerUnit
                                      ) {
                                        // // console.log(subObj);
                                        const val = [...subList];
                                        if (subObj.businessType == "expense") {
                                          val[index].totalRevenueAmount =
                                            subObj?.quantity *
                                            subObj?.ratePerUnit;
                                          setSubList(val);
                                        }
                                        if (subObj.businessType == "revenue") {
                                          val[index].totalRevenueAmount =
                                            subObj?.quantity *
                                            subObj?.ratePerUnit;
                                          setSubList(val);
                                        }
                                      }
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <div className="mt-1 w-100">
                                  <TextField
                                    required
                                    className="w-100"
                                    label={`Rate  ${
                                      currencyId ? currencyId : ""
                                    }`}
                                    name="ratePerUnit"
                                    type="number"
                                    // type="email"
                                    variant="outlined"
                                    autoComplete="off"
                                    placeholder="Enter Rate"
                                    size="small"
                                    value={subObj?.ratePerUnit || ""}
                                    onChange={(e) => {
                                      handleChangeInput(index, e);
                                    }}
                                    inputProps={{
                                      pattern: "[0-9]*",
                                      inputMode: "numeric",
                                    }} // Helps with numeric keyboard on mobile
                                    onBlur={(e) => {
                                      if (
                                        subObj?.quantity &&
                                        subObj?.ratePerUnit
                                      ) {
                                        // // console.log(subObj);
                                        const val = [...subList];
                                        if (subObj.businessType == "expense") {
                                          val[index].totalRevenueAmount =
                                            Number(subObj?.quantity) *
                                            Number(subObj?.ratePerUnit);
                                          setSubList(val);
                                        }
                                        if (subObj.businessType == "revenue") {
                                          val[index].totalRevenueAmount =
                                            Number(subObj?.quantity) *
                                            Number(subObj?.ratePerUnit);
                                          setSubList(val);
                                        }
                                      }
                                    }}
                                    error={
                                      formik.values?.errors[index] &&
                                      formik.values?.errors[index]?.ratePerUnit
                                    }
                                    helperText={
                                      formik.values?.errors[index] &&
                                      formik.values?.errors[index]?.ratePerUnit
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <div className="mt-1 w-100">
                                  <TextField
                                    required
                                    className="w-100"
                                    label="Total"
                                    name="totalRevenueAmount"
                                    InputLabelProps={{ shrink: true }}
                                    // type="email"
                                    type="text"
                                    variant="outlined"
                                    disabled={true}
                                    autoComplete="off"
                                    placeholder="Enter Total"
                                    size="small"
                                    value={subObj?.totalRevenueAmount || ""}
                                    // onChange={(e) => {
                                    //   handleChangeInput(index, e);
                                    // }}

                                    error={
                                      formik.values?.errors[index] &&
                                      formik.values?.errors[index]
                                        ?.totalRevenueAmount
                                    }
                                    helperText={
                                      formik.values?.errors[index] &&
                                      formik.values?.errors[index]
                                        ?.totalRevenueAmount
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {bulkUpload && (
                <TablewithoutPagination
                  columns1={columns1}
                  paginationShow={false}
                  title={"Summary"}
                  parentData={summaryData}
                  titleHide={true}
                  tableId={"create_expense"}
                />
              )}

              <div className="row mt-3">
                <div className="col-md-10 d-flex align-items-center mx-auto">
                  <div className="mx-auto">
                    <button
                      className="btn btn-success btns_last mx-2"
                      type="button"
                      // data-bs-toggle="modal"
                      // data-bs-target="#exampleModal6"
                      onClick={(e) => {
                        // document.getElementById("openConfimration")?.click();
                        if (!bulkUpload) {
                          setFormSubmitted(true);
                          let errors = validateFields(subList, requiredFields);
                          setErrorList(errors);
                          console.log(errors);
                          if (errors.length == 0 || isEmpty(errors[0])) {
                            setFormSubmitted(false);
                            document
                              .getElementById("openConfimration")
                              ?.click();
                          } else {
                            formik.setFieldValue("errors", errors);
                          }
                        } else {
                          console.log("sdfsdbhfusdgfv");
                          document.getElementById("openConfimration")?.click();
                        }
                      }}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-danger btns_last mx-2"
                      type="reset"
                      id="reset_id"
                      onClick={(e) => {
                        resetForm(e);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row mb-4 mt-1 w-100 m-0 p-0">
          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <div className="col-md-6">
              <div className="card shadow-none border bg_white mt-4 activity_log_div_1 mx-3">
                <span className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 activity_span">
                  Activity Logs
                </span>
                <div className="text-center mt-4">
                  <div className="text-center no_record">
                    <h5>No Record Found..!!</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-none border bg_white mt-4 notes_div mx-3">
                <span className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 notes ">
                  Notes
                </span>
                <div className="text-center mt-4">
                  <div className="text-center no_record">
                    <h5>No Record Found..!!</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="c"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal5"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal5"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Bulk Upload File
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="query-close"
                aria-label="Close"
                onClick={(e) => {
                  formik1.handleReset(e);
                  fileInputRef.current.value = ""; // Cle
                  formik;
                }}
              ></button>
            </div>
            <form onSubmit={formik1.handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <DatePicker
                    format="MMM-yyyy"
                    appearance="default"
                    placeholder="Start Year & Month"
                    value={formik.values.yearMonthState}
                    onChange={(e) => {
                      console.log(e);
                      formik.setFieldValue("yearMonthState", e);
                      formik.setFieldValue("year", new Date(e).getFullYear());
                      formik.setFieldValue("month", new Date(e).getMonth());
                    }}
                    oneTap
                    className={`${
                      !formik.values.yearMonthState && formik1.values.submitted
                        ? "is-invalid12 custom-datepicker"
                        : ""
                    } `}
                  />

                  {!formik.values.yearMonthState &&
                    formik1.values.submitted && (
                      <span className="text text-danger">
                        {" "}
                        Year Month is required
                      </span>
                    )}
                </div>
                <div className="row my-4 mx-2">
                  <input
                    type="file"
                    className={`form-control ${
                      formik1.values?.submitted &&
                      fileInputRef.current.value == ""
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) => {
                      handleFileUpload(e);
                    }}
                    ref={fileInputRef}
                  />
                  {formik1.values?.submitted &&
                    fileInputRef.current.value == "" && (
                      <span className="text-danger">
                        Choose file for upload
                      </span>
                    )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeBulkRef}
                  onClick={(e) => {
                    formik1.handleReset(e);
                    fileInputRef.current.value = ""; // Cle
                  }}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className={"btn btn-success"}
                  onClick={(e) => {}}
                >
                  Bulk Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="openConfimration"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal6"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade submit_config_modal"
        id="exampleModal6"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Submit Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="close_confirm"
                aria-label="Close"
                onClick={(e) => {}}
              ></button>
            </div>
            <form onSubmit={formik1.handleSubmit}>
              <div className="modal-body">
                <div className="row m-1">
                  <p>Are you sure you want to submit this request?</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => {}}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className={"btn btn-success"}
                  onClick={(e) => {
                    formik.handleSubmit(e);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DynamicModal
        id="Showtable"
        isOpen={isModalOpen}
        title={"Summary Open"}
        onClose={handleCloseModal}
        onSubmit={formik.handleSubmit}
        submitLabel={"Submit"}
      >
        <DataTable
          columns1={columns1}
          paginationShow={false}
          title={"Summary"}
          parentData={summaryData}
        />
      </DynamicModal>

      <DynamicModal
        id="detail"
        isOpen={isOpen}
        title={
          <h6>
            <span className="text-primary">{summaryHead?.head}</span>&gt;{" "}
            <span className="text-success">{summaryHead?.costCenterName}</span>{" "}
          </h6>
        }
        modalType={"modal-xl"}
        onClose={(e) => {
          setIsOpen(false);
        }}
        onSubmit={(e) => {
          setIsOpen(false);
        }}
        submitLabel={"Ok"}
        hideSubmit={false}
      >
        {" "}
        <div className="modal-body">
          <TablewithoutPagination
            columns1={columns3}
            paginationShow={true}
            title={"Summary"}
            parentData={details || []}
            titleHide={true}
            tableId={"create_expense1"}
            showModify={false}
            uploadId={0}
            // handleModify={(e) => {
            //   e?.preventDefault();
            //   document.getElementById("bulkModal")?.click();
            // }}
          />
        </div>
      </DynamicModal>
    </>
  );
}
