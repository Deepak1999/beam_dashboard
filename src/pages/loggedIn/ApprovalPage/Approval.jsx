import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Approval.css";
import {
  ApproveReject,
  getCompanies1,
  getCosstCenterDetails,
  getDataByUploadId,
  getDetailsById,
  getqueryDetails,
  getSummaryDetails1122,
  ModifyExpenses,
  raiseQueries,
  replyQueries,
  uploadFile,
} from "../../../services/expenseService";
import InfoIcon from "@mui/icons-material/Info";
import {
  Autocomplete,
  FormControl,
  TextField,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { useFormik } from "formik";
import {
  FaTimes,
  FaInfoCircle,
  FaPencilAlt,
  FaQuestion,
  FaReply,
} from "react-icons/fa";
import CircleConnectors from "../../../Components/CircleConnectors";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setExpense,
  setLoader,
  setTabIndex,
  setUploadIdState,
} from "../../../redux/features/authSliceandSidebar";
import moment from "moment";
import ColumnFilter from "../../../Components/ColumnFilter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoRecordFound from "../../../Components/NoRecordFound";
import SimpleTable from "../../../Components/SimpleTable";
import DynamicModal from "../../../Components/Modal";
import TablewithoutPagination from "../../../Components/TablewithoutPagination";
import { Details } from "@mui/icons-material";
export default function ApprovalPage() {
  const [user, setUser] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [accountCodes, setAccountCodes] = useState([]);

  const [data, setHistory] = useState([]);
  const [showApprove, setShowApprove] = useState(false);
  const [qhierarchyList, setqhiearchyList] = useState([]);
  const [monthHeadlist, setMonthHeadlist] = useState([]);

  const [modifySummary, setModifySummary] = useState([]);

  const [modifyBulkData, setModifyBulkData] = useState([]);

  const [prevUploadId, setprevUploadId] = useState(0);
  const [newUploadId, setnewUploadId] = useState(0);

  const [notesList, setNotesList] = useState([]);

  const [isQueryRaise, setIsQueryRaise] = useState(false);

  const [showModify, setShowModify] = useState(false);

  const [isReply, setReply] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [summaryHead, setSummaryHead] = useState(null);

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

  const [queryData, setQueryData] = useState(null);

  const [isSubmitted, setisSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [summaryData, setSummaryData] = useState([]);

  const [details, setDetails] = useState(null);

  const [uploadIdD, setUploadIdD] = useState(0);

  // const  [data ,setData] = useState([]) ;

  const [obj, setObj] = useState({
    accountCodeId: null,
    accountCode: null,
    mainHead: null,
    head: null,
    costCenterCode: null,
    ledgerName: null,
    costCenterName: null,
    serviceDescription: null,
    quantity: null,
    ratePerUnit: null,
    year: null,
    totalRevenueAmount: null,
    monthlyExpenseAmount: null,
    monthlyProjectedAmount: null,
    accountState: null,
    costCenterList: [],
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
      quantity: null,
      ratePerUnit: null,
      year: null,
      totalRevenueAmount: null,
      monthlyExpenseAmount: null,
      monthlyProjectedAmount: null,
      accountState: null,
      costCenterList: [],
      costCenterState: null,
      costCenterId: null,
    },
  ]);

  const [expense, setExpense1] = useState(null);

  const expenseSel = useSelector((state) => state.authSliceandSidebar.expense);
  const uploadSelector = useSelector(
    (state) => state.authSliceandSidebar.uploadId
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const fileInputRef = useRef(null);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  useEffect(() => {
    dispatch(setLoader(true));
    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")));
      // // console.log((user);
      if (expenseSel) {
        // setExpense1(expenseSel);
        // getExpenseDetail(expenseSel);
        let formdata = {
          id: expenseSel?.id,
        };
        getDetailAgain(formdata);
        localStorage.setItem("expenseId", expenseSel.id);
      } else if (!expenseSel && localStorage.getItem("expenseId") != null) {
        let formdata = {
          id: localStorage.getItem("expenseId"),
        };
        getDetailAgain(formdata);
      }
    } else {
      setUser(null);
    }
  }, [expenseSel]);

  useEffect(() => {
    if (uploadSelector) {
      setUploadIdD(uploadSelector);
    }
  }, [uploadSelector]);

  const setIypeFor = (data, type) => {
    // // // console.log((data);
    // // // console.log((type);

    formik.setFieldValue("type", type);

    document.getElementById("open_modal11")?.click();
  };

  const getSummaryDetails = (data) => {
    // console.log((data);
  };

  const raiseQuery = () => {
    const formdata = {};
  };

  const columns = useMemo(() => {
    let baseColumns = [
      {
        Header: "Activity",
        accessor: "activityLog",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-left acti_span">
                {cell.row.original.activityLog}
              </span>{" "}
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
              <span className="created_at_span">
                {" "}
                {moment(new Date(cell.row.original.createdAt)).format(
                  "DD-MMM-YYYY h:mm a"
                )}{" "}
              </span>
            </>
          );
        },
      },
    ];

    return baseColumns;
  }, [data]);

  const columns2 = useMemo(() => {
    let baseColumns = [
      {
        Header: "Note",
        accessor: "notes",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-left acti_span">
                {cell.row.original.notes}
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
  }, [data]);

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

      // {
      //   Header: "Cost Center/Client",
      //   accessor: "costCenterName",
      //   Cell: (cell) => {
      //     return (
      //       <>
      //         {" "}
      //         <span className="text-left acti_span">
      //           {cell.row.original.costCenterName}
      //         </span>
      //       </>
      //     );
      //   },
      // },
      // {
      //   Header: "Head",
      //   accessor: "head",
      //   Cell: (cell) => {
      //     return (
      //       <>
      //         {" "}
      //         <span className="text-left acti_span">
      //           {cell.row.original.head}
      //         </span>
      //       </>
      //     );
      //   },
      // },
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
      // {
      //   Header: "Business Type",
      //   accessor: "businessType",
      //   Cell: (cell) => {
      //     return (
      //       <>
      //         {" "}
      //         <span className="text-left acti_span">
      //           {cell.row.original.businessType}
      //         </span>
      //       </>
      //     );
      //   },
      // },

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
        Header: `Rate  (${expense?.currency})`,
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
        Header: `Total Amount  (${expense?.currency})`,
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

  const getDataByUploadId1 = async (uploadId) => {
    let formdata = {
      uploadId: uploadId,
      summaryType: "draft",
    };

    // console.log((formdata);
    await getDataByUploadId(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        let data = transformData(res.data);
        setModifyBulkData(data.tableData);
        document.getElementById("modify-close1")?.click();
        // dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
      }
    });
  };

  const handleFileUpload = (event) => {
    formik2.setFieldValue("file", null);
    const file = event.target.files[0];
    if (!file) return;

    // // console.log((file.name.split("."));

    if (
      file.name.split(".")[1] == "xlsx" ||
      file.name.split(".")[1] == "xls" ||
      file.name.split(".")[1] == "csv"
    ) {
    } else {
      toast.warning("Please upload only excel files");
      return;
    }

    formik2.setFieldValue("file", file);
  };

  const getFieldHandle = (name) => {
    return name ? name : "N/A";
  };

  const handleSummaryClick = useCallback((row) => {
    // console.log((row);
    getSummaryDetails1(row);
  }, []);

  const getSummaryDetails1 = useCallback(async (cell) => {
    let formdata = {
      head: cell.row.original.head,
      costCenterName: cell.row.original.costCenterName,
      uploadId: cell.row.original.uploadId,
      businessType: cell.row.original.businessType,
    };

    setSummaryHead(formdata);

    // console.log((formdata);

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

  const columns1 = useMemo(() => {
    return [
      {
        Header: "Head",
        accessor: "head",
        Cell: (cell) => {
          return (
            <>
              {" "}
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
                  className="text-success three_head"
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
      //               cell.row.original.costCenterName?.slice(0, 25)
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
                {getFieldHandle(cell.row.original.businessType)}{" "}
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
                {" "}
                {new Intl.NumberFormat().format(cell.row.original[month])}{" "}
              </span>
            </>
          );
        },
      })),

      {
        Header: `Total Sum  ${expense?.currency}`,
        accessor: "totalSum",
        Cell: (cell) => {
          return (
            <>
              <span className="amount_span">
                {new Intl.NumberFormat().format(cell.row.original.totalSum)}
              </span>
            </>
          );
        },
      },
    ];
  }, [expense?.currency, monthHeadlist]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const getExpenseDetail = (expense) => {
    // // // console.log((expense);
    setSubList([]);

    let formdata = expense;
    let arr = [];
    dispatch(setLoader(true));

    // // console.log((expense);

    let hierarchyList = [];

    expense?.approversList.forEach((x, i) => {
      let val = { ...x };
      if (x.approvarLevel == expense?.currentApprovalLevel) {
        // console.log(("dfskjfhgsdfvds");
        if (localStorage.getItem("user") != null) {
          let user = JSON.parse(localStorage.getItem("user"));
          if (x.approverUserId == user.userId) {
            // // // console.log((x);
            if (expense?.approvalStatus == 0) {
              setShowApprove(true);
            } else {
              setShowApprove(false);
            }
          } else {
            setShowApprove(false);
          }
        }
      } else if (x.approvarLevel < expense?.currentApprovalLevel) {
        // console.log(("dfskjfhgsfffffdfvds");
        let formdata = {
          userId: x.approverUserId,
          userName: x.approverName,
        };

        // console.log((formdata);
        hierarchyList.push(formdata);
      } else {
      }
    });

    expense.approversList.forEach((x) => {
      // console.log((x.approvarLevel);
      // console.log((expense.currentApprovalLevel);
    });

    // expense.approvers

    setIsQueryRaise(false);
    setReply(false);
    let show = false;

    if (expense?.approvalStatus == 0) {
      expense?.businessQueries.forEach((x) => {
        if (
          x.raisedByUserId == JSON.parse(localStorage.getItem("user"))?.userId
        ) {
          setIsQueryRaise(true);
        }
        if (
          x.raisedToUserId == JSON.parse(localStorage.getItem("user"))?.userId
        ) {
          setQueryData(x);
          setReply(true);
          setShowModify(true);
          show = true;
        }
      });

      if (isReply) {
        setShowModify(true);
      }

      if (!showApprove && !show) {
        setShowModify(false);
      }

      if (
        expense?.approvalStatus == 0 &&
        expense?.raisedToUserId ==
          JSON.parse(localStorage.getItem("user"))?.userId &&
        !show
      ) {
        setShowModify(true);
      }
    }

    // // console.log((expense, "dfsdihfbugyvsds");

    let initiator = {
      userId: expense?.userId,
      userName: expense?.raisedBy,
    };
    hierarchyList.push(initiator);
    uploadSummary(expense?.uploadId);

    if (uploadSelector) {
      setUploadIdD(uploadSelector);
    } else {
      setUploadIdD(expense?.uploadId);
      dispatch(setUploadIdState(expense.uploadId));
    }

    setprevUploadId(expense?.uploadId);
    // // // console.log((hierarchyList);
    setqhiearchyList(hierarchyList);
    arr.push(formdata);
    // getQueryDetails(expense);

    let notesArr = [];

    expense?.approvalHistory.forEach((x) => {
      if (x.notes) {
        notesArr.push(x);
      }
    });

    setNotesList(notesArr);

    let history = expense?.approvalHistory.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setHistory(history);
    setSubList(arr);
  };
  // const transformData = (data) => {
  //   // Extract unique months from all businessSummary entries
  //   const months = new Set();
  //   data.businessSummary.forEach((entry) => {
  //     Object.keys(entry.monthlyRevenue).forEach((month) => {
  //       months.add(month);
  //     });
  //   });

  //   // // console.log((months);

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
  //       uploadId: entry.uploadId,
  //       costClientName: entry.costClientName,
  //     };

  //     // Populate revenue values dynamically for each month
  //     monthHeaders.forEach((month) => {
  //       row[month] = entry.monthlyRevenue[month] || 0; // Default to 0 if not present
  //     });

  //     return row;
  //   });

  //   const newData = [...tableData].sort(
  //     (a, b) =>
  //       monthOrder.indexOf(a.month?.split("-")[0]) -
  //       monthOrder.indexOf(b.month?.split("-")[0])
  //   );

  //   // // console.log((newData);

  //   setMonthHeadlist(monthHeaders);
  //   return { monthHeaders, tableData };
  // };

  const transformData = (data) => {
    if (!data?.businessSummary?.length)
      return { monthHeaders: [], tableData: [] };

    const monthsSet = new Set();

    // Collect unique months
    data.businessSummary.forEach(({ monthlyRevenue }) => {
      Object.keys(monthlyRevenue).forEach((month) => monthsSet.add(month));
    });

    // Sort months by year, then by defined month order
    const monthHeaders = Array.from(monthsSet).sort((a, b) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");
      const yearDiff = +yearA - +yearB;
      return yearDiff !== 0
        ? yearDiff
        : monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

    // Transform entries to include all months
    const tableData = data.businessSummary.map((entry) => {
      const {
        costCenterName,
        head,
        businessType,
        currency,
        totalSum,
        uploadId,
        costClientName,
        monthlyRevenue,
      } = entry;

      const monthlyData = monthHeaders.reduce((acc, month) => {
        acc[month] = monthlyRevenue[month] || 0;
        return acc;
      }, {});

      return {
        costCenterName,
        head,
        businessType,
        currency,
        totalSum,
        uploadId,
        costClientName,
        ...monthlyData,
      };
    });

    setMonthHeadlist(monthHeaders);
    return { monthHeaders, tableData };
  };

  const getAmountHandle = (value) => {
    return value ? new Intl.NumberFormat().format(value) : "N/A";
  };
  const uploadSummary = async (uploadId) => {
    let formdata = {
      uploadId: uploadId,
      // summaryType: "draft",
    };
    await getDataByUploadId(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        // // console.log((res?.data.businessSummary);
        let data = transformData(res.data);
        // // console.log((data);

        // console.log((data.tableData);
        setSummaryData(data.tableData);
        dispatch(setLoader(false));
      }
    });
  };

  const formik2 = useFormik({
    initialValues: {
      file: null,
      submitted: false,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let formdata = new FormData();
      formik1.setFieldValue("submitted", true);
      if (!values?.file) {
        // toast.warning("file is required");
        return;
      }

      dispatch(setLoader(true));

      formdata.append("file", values?.file);

      await uploadFile(formdata)
        .then((res) => {
          if (res && res?.data?.statusDescription?.statusCode == 200) {
            // setIsModalOpen(false);
            formik1.setFieldValue("submitted", false);

            // console.log((res);
            setModifySummary(res?.data?.businessDetailDraftList);
            getDataByUploadId1(
              res?.data?.businessDetailDraftList[0]["uploadId"]
            );
            setnewUploadId(res?.data?.businessDetailDraftList[0]["uploadId"]);

            dispatch(
              setUploadIdState(
                res?.data?.businessDetailDraftList[0]["uploadId"]
              )
            );

            // const companyState =
            //   companyList.find(
            //     (cl) =>
            //       cl.companyId === res?.data?.businessDetailDraftList[0].companyId
            //   ) || null;
            // const businessState =
            //   companyState?.businessMaster?.find(
            //     (b) =>
            //       b.businessId ===
            //       res?.data?.businessDetailDraftList[0].businessId
            //   ) || null;
            // const currecyState = currencyList.find(
            //   (x1) =>
            //     x1.currencyCode == res?.data?.businessDetailDraftList[0].currency
            // );
            // const approver = businessState?.approversList?.find(
            //   (a) => a.approvarLevel === 0
            // );
            // if (approver) setApproverName(approver.approverName);

            // formik.setFieldValue(
            //   "companyId",
            //   res?.data?.businessDetailDraftList[0].companyId
            // );
            // formik.setFieldValue("companyState", companyState);
            // formik.setFieldValue("businessState", businessState);
            // formik.setFieldValue("currencyState", currecyState);
            // formik.setFieldValue("currencyId", currecyState.currencyCode);
            // formik.setFieldValue(
            //   "businessId",
            //   res?.data?.businessDetailDraftList[0].businessId
            // );

            // setCurrencyId(currecyState.currencyCode);
          } else {
            dispatch(setLoader(false));
          }

          mapSetter(res?.data?.businessDetailDraftList);
        })
        .catch((err) => {
          // toast.error("Something wrong");
          dispatch(setLoader(false));
        });
    },
  });

  const handleCloseModal = (e) => {
    setIsModalOpen(false);
    // formik2.handleReset(e);
  };

  const getQueryDetails = async (expense) => {
    let formdata = {
      businessDetailId: expense?.id,
    };

    await getqueryDetails(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        // // // console.log((res?.data);

        // // console.log((user);

        if (res?.data?.businessQueryRaisedBy?.length > 0) {
          let obj = res?.data?.businessQueryRaisedBy.find((x) => {
            return x.raisedByUserId == user?.userId;
          });

          let obj1 = res?.data?.businessQueryRaisedTo.find((x) => {
            return x.raisedToUserId == user?.userId;
          });
          if (obj) {
            setIsQueryRaise(true);
          } else {
            setIsQueryRaise(false);
          }
          // // console.log((obj1);

          if (obj1) {
            setReply(true);
            setQueryData(obj1);
          } else {
            setReply(false);
          }
        }
        // if (res?.data?.businessQueryRaisedTo?.length > 0) {
        //   let obj = res?.data?.businessQueryRaisedTo.find((x) => {
        //     return x.raisedToUserId == user?.id;
        //   });

        //   if (obj) {
        //     setReply(true);
        //     setQueryData(obj);
        //   } else {
        //     setReply(false);
        //   }
        // }
      } else {
      }
    });
  };

  const getDetailAgain = async (formdata) => {
    setReply(false);
    setIsQueryRaise(false);
    await getDetailsById(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        dispatch(setLoader(false));
        setExpense1(res?.data?.businessDetailMaster);

        res?.data?.businessDetailMaster.businessQueries.forEach((x) => {
          if (
            x.raisedByUserId ==
              JSON.parse(localStorage.getItem("user"))?.userId &&
            x.queryStatus == 0
          ) {
            setIsQueryRaise(true);
            // console.log((x);
          }

          if (
            x.raisedToUserId ==
              JSON.parse(localStorage.getItem("user"))?.userId &&
            x.queryStatus == 0
          ) {
            setReply(true);
            // console.log((x);
          }
        });

        // let obj = res?.data?.businessDetailMaster.businessQueries.find((x) => {
        //   return x.raisedByUserId == user?.userId && x.queryStatus == 0;
        // });

        // let obj1 = res?.data?.businessDetailMaster.businessQueries.find((x) => {
        //   return x.raisedToUserId == user?.userId && x.queryStatus == 0;
        // });

        // // // console.log((obj1);
        // if (obj) {
        //   // console.log((obj);
        //   setIsQueryRaise(true);
        // } else {
        //   setIsQueryRaise(false);
        // }
        // // // console.log((obj1);

        // if (obj1) {
        //   setReply(true);
        //   setQueryData(obj1);
        // } else {
        //   setReply(false);
        // }

        getExpenseDetail(res?.data?.businessDetailMaster);
        if (!expenseSel) {
          dispatch(setExpense(res?.data?.businessDetailMaster));
        }
      } else {
        dispatch(setLoader(false));
        // // // console.log((res.data);
      }
    });
  };

  const formik1 = useFormik({
    initialValues: {
      type: 0,
      query: "",
      id: 0,
      queryText: "",
      raisedToUserId: 0,
      raisedByUserId: Number(localStorage.getItem("userId")),
      businessDetailId: expense?.id,
      raisedBy: "",
      raisedTo: "",
      raisedUserNameState: null,
      isSubmitted: false,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      setisSubmitted(true);

      if (values?.type == 1) {
        if (values?.queryText == "" || values?.raisedToUserId == 0) {
          return;
        }
        dispatch(setLoader(true));
        values["raisedBy"] = JSON.parse(localStorage.getItem("user")).fullName;
        values["raisedTo"] = values?.raisedUserNameState?.userName;
        values["businessMasterId"] = expense?.id;
        await raiseQueries(values)
          .then((res) => {
            dispatch(setLoader(false));
            if (res?.data?.statusDescription?.statusCode == 200) {
              toast.success(res?.data?.statusDescription?.description);
              setisSubmitted(false);
              document.getElementById("query-close")?.click();

              let formdata = {
                id: expense?.id,
              };
              getDetailAgain(formdata);

              history.push("/navstatus");
              dispatch(setTabIndex("myqueries"));
            } else {
              toast.error(res?.data?.statusDescription?.description);
            }
          })
          .catch((err) => {
            // toast.error("Something wrong");
          });
      } else {
        if (values?.queryText == "") {
          return;
        }
        values["businessMasterId"] = expense?.id;
        values["replyText"] = values?.queryText;
        let valu = values;
        // // // console.log((queryData);

        valu["queryId"] = queryData?.id;
        // // // console.log((valu);
        await replyQueries(valu)
          .then((res) => {
            dispatch(setLoader(false));
            if (res?.data?.statusDescription?.statusCode == 200) {
              if (modifyBulkData?.length === 0) {
                toast.success(res?.data?.statusDescription?.description);
                document.getElementById("query-close")?.click();
                history.push("/navstatus");
                dispatch(setTabIndex("myqueries"));
              } else {
                document.getElementById("query-close")?.click();
                ModifyDetails();
              }
            } else {
              toast.error(res?.data?.statusDescription?.description);
            }
          })
          .catch((err) => {
            // toast.error("Something wrong");
          });
      }
    },
  });

  const customMonthYearSort = (rowA, rowB, columnId) => {
    const [monthA, yearA] = rowA.values[columnId].split("-");
    const [monthB, yearB] = rowB.values[columnId].split("-");

    const yearDiff = parseInt(yearA, 10) - parseInt(yearB, 10);
    if (yearDiff !== 0) return yearDiff; // Sort by year first

    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB); // Then by month
  };

  const formik = useFormik({
    initialValues: {
      type: 0,
      reason: "",
      id: expense?.id,
      reply: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let formdata = {
        approvalStatus: values?.type,
        businessDetailIds: [],
        notes: values?.reason,
      };
      if (values?.type == 2 && values?.reason == "") {
        toast.warning("Reason is required");
        return;
      }
      dispatch(setLoader(true));

      formdata.businessDetailIds.push(expense?.id);

      await ApproveReject(formdata)
        .then((res) => {
          dispatch(setLoader(false));
          if (res?.data?.statusDescription?.statusCode == 200) {
            if (modifyBulkData?.length > 0) {
              document.getElementById("apprej-close")?.click();
              ModifyDetails();
            } else {
              toast.success(res?.data?.statusDescription?.description);
              document.getElementById("apprej-close")?.click();
              let formdata = {
                id: expense?.id,
              };
              getDetailAgain(formdata);
              history.push("/navstatus");
            }
          } else {
            toast.error(res?.data?.statusDescription?.description);
          }
        })
        .catch((err) => {
          // toast.error("Something wrong");
        });
    },
  });

  const ModifyDetails = async () => {
    let formdata = {
      modifiedUploadId: prevUploadId,
      businessDetail: modifySummary,
    };

    let summary = [...modifySummary];

    let summary1 = summary.map((x) => {
      return { ...x, raisedBy: user.fullName, roleId: user.role.id };
    });

    formdata.businessDetail = summary1;

    await ModifyExpenses(formdata).then((x) => {
      if (x.data.statusDescription.statusCode == 200) {
        toast.success(x.data.statusDescription.description);

        let formdata = {
          id: expense?.id,
        };
        getDetailAgain(formdata);
        setTimeout(() => {
          history.push("/navstatus");
        }, 1000);
      } else {
        toast.error(x.data.statusDescription.description);
      }
    });
  };

  const handleText = (text) => {
    return (
      <h6>
        <span>{text?.head}</span>&gt; <span>{text?.costCenterName}</span>{" "}
      </h6>
    );
  };

  return (
    <>
      <div className="p-4 content_main_open" id="approval_page">
        <div className="card shadow-none border bg_white create_expense_card">
          <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
            <i className="fas fa-plus-circle mx-1"></i>&nbsp; Request Detail
          </span>
          <div className="card-body">
            <form className="row mt- my-0 g-3 needs-validation">
              <div className="row m-0">
                {/* First Row */}
                <div className="row d-flex justify-content-start align-items-center">
                  <div className="col-md-2 d-flex flex-column text-start">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      <span>Company :</span>
                      <b style={{ color: "rgb(94, 93, 93)" }}>
                        {" "}
                        {getFieldHandle(expense?.companyName)}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      Business Group :
                      <b style={{ color: "rgb(94, 93, 93)" }}>
                        {" "}
                        {getFieldHandle(expense?.businessName)}
                      </b>
                    </p>
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      Requested By :
                      <b style={{ color: "rgb(94, 93, 93)" }}>
                        {" "}
                        {getFieldHandle(expense?.raisedBy)}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-4 d-flex flex-column text-end">
                    {/* expense?.approversList  */}
                    {expense?.approversList?.length > 0 && (
                      <CircleConnectors
                        props={expense?.approversList}
                        approvalStatus={expense?.approvalStatus}
                        currentApproval={expense?.currentApprovalLevel}
                      />
                    )}
                  </div>
                </div>

                {/* Second Row */}
                <div className="row d-flex justify-content-start align-items-center mt-2">
                  <div className="col-md-2 d-flex flex-column text-start">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      Budget Id :
                      <span
                        className="text text-success"
                        style={{ fontSize: "medium" }}
                      >
                        <b>{getFieldHandle(expense?.id)}</b>
                      </span>
                    </p>
                  </div>

                  <div className="col-md-3 d-flex flex-column text-center">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      Total Revenue :
                      <b style={{ color: "rgb(94, 93, 93)" }}>
                        <span className="text-success">
                          {" "}
                          {expense?.currency}{" "}
                        </span>
                        {getAmountHandle(expense?.totalRevenueAmount)}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-3 d-flex flex-column text-center">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      Total Expense :
                      <b style={{ color: "rgb(94, 93, 93)" }}>
                        {" "}
                        <span className="text-success">
                          {" "}
                          {expense?.currency}{" "}
                        </span>
                        {getAmountHandle(expense?.totalExpenseAmount)}
                      </b>
                    </p>
                  </div>
                  <div className="col-md-4 d-flex flex-column text-end">
                    <p style={{ fontSize: "small", margin: "0px" }}>
                      Status :
                      {expense?.approvalStatus == 0 ? (
                        <>
                          <b style={{ color: "rgb(94, 93, 93)" }}>
                            {" "}
                            Pending at{" "}
                          </b>
                          &nbsp;
                          <b className="text-success">
                            {" "}
                            {getFieldHandle(expense?.raisedTo)}
                          </b>
                        </>
                      ) : expense?.approvalStatus == 2 ? (
                        <>
                          <b className="text-danger">Rejected</b>
                        </>
                      ) : (
                        <>
                          <b className="text-success">Settled</b>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {subList?.length > 0 && modifyBulkData?.length == 0 && (
                <TablewithoutPagination
                  columns1={columns1}
                  paginationShow={true}
                  title={"Summary"}
                  parentData={summaryData}
                  titleHide={true}
                  tableId={"create_expense"}
                  showModify={showModify}
                  uploadId={prevUploadId}
                  handleModify={(e) => {
                    e?.preventDefault();
                    document.getElementById("bulkModal")?.click();
                  }}
                />
              )}

              {modifyBulkData?.length > 0 && (
                <TablewithoutPagination
                  columns1={columns1}
                  paginationShow={false}
                  title={"Summary"}
                  uploadId={newUploadId}
                  parentData={modifyBulkData}
                  titleHide={true}
                  tableId={"create_expense"}
                />
              )}

              {showApprove ? (
                <div className="row">
                  <div className="col-md-10 d-flex align-items-center mx-auto mt-2">
                    <div className="mx-auto">
                      <button
                        className="btn btn-success btns_last mx-2"
                        type="button"
                        onClick={(e) => {
                          if (isQueryRaise && modifyBulkData?.length == 0) {
                            toast.error(
                              "You have raised query so you can't approve this expense until query is solved"
                            );
                            return;
                          }

                          e.preventDefault();
                          setIypeFor(expense, 1);
                        }}
                      >
                        {modifyBulkData?.length == 0 ? "Approve" : "Modify"}
                      </button>
                      {modifyBulkData?.length === 0 && (
                        <>
                          <button
                            className="btn btn-danger btns_last mx-2"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIypeFor(expense, 2);
                            }}
                          >
                            Reject
                          </button>

                          <button
                            type="button"
                            className={"btn btn-primary btns_last mx-2"}
                            onClick={(e) => {
                              if (isQueryRaise) {
                                toast.error(
                                  "You can't raise more than one query at a time"
                                );
                                return;
                              }
                              document.getElementById("open_modal12")?.click();
                              setisSubmitted(false);
                              formik1.setFieldValue("type", 1);
                            }}
                          >
                            Query
                          </button>
                        </>
                      )}

                      {modifyBulkData?.length > 0 && (
                        <button
                          type="button"
                          className={"btn btn-secondary btns_last mx-2"}
                          onClick={(e) => {
                            setIsModalOpen(true);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-10 d-flex align-items-center mx-auto mt-2">
                      <div className="mx-auto">
                        {isReply && (
                          <button
                            type="button"
                            className={"btn btn-primary  btns_last mx-2"}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal4"
                            onClick={(e) => {
                              setisSubmitted(false);
                              formik1.setFieldValue("type", 2);
                            }}
                          >
                            {modifyBulkData?.length > 0 ? "Submit" : "Reply"}
                          </button>
                        )}

                        {modifyBulkData?.length > 0 && (
                          <button
                            type="button"
                            className={"btn btn-secondary btns_last mx-2"}
                            onClick={(e) => {
                              setModifyBulkData([]);
                              setModifySummary([]);
                              uploadSummary(prevUploadId);
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
        <div className="row mb-4 mt-4 w-100 m-0 p-0">
          <div className="col-md-12 d-flex justify-content-between align-items-center mt-">
            <div className="col-md-6 h-100">
              <div className="card shadow-none border bg_white mt- activity_log_div mx-3">
                <span className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 activity_span">
                  Activity Logs
                </span>
                <div className="card-body box_withd">
                  {/* <div className="text-center"> */}
                  <div className="text-center no_record">
                    {data?.length > 0 ? (
                      <SimpleTable columns={columns} data={data} />
                    ) : (
                      <NoRecordFound />
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>

            <div className="col-md-6 h-100">
              <div className="card shadow-none border bg_white mt- activity_log_div mx-3">
                <span className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 activity_span">
                  Notes
                </span>
                <div className="card-body box_withd">
                  {/* <div className="text-center"> */}
                  <div className="text-center no_record">
                    {notesList?.length > 0 ? (
                      <SimpleTable columns={columns2} data={notesList} />
                    ) : (
                      <NoRecordFound />
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 h-100">
              {notesList ? (
                <DataTable
                  columns1={columns}
                  paginationShow={false}
                  title={"Notes"}
                  parentData={data}
                  titleHide={true}
                />
              ) : (
                <NoRecordFound />
              )}
            </div> */}
          </div>
        </div>
      </div>

      <button
        type="button"
        id="open_modal11"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade mt-5"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {formik.values?.type == 1 ? (
                  <span>
                    {" "}
                    {modifyBulkData?.length === 0
                      ? "Approve Confirmation"
                      : "Modify/Approve Confimation"}
                  </span>
                ) : (
                  "Reject Confirmation"
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="apprej-close"
                aria-label="Close"
                onClick={(e) => {
                  formik.handleReset(e);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row m-1">
                {formik.values?.type == 1 ? (
                  <span>
                    {" "}
                    {modifyBulkData?.length === 0
                      ? "Are you sure you want to approve this request ?"
                      : "Are you sure you want to submit this request ?"}
                  </span>
                ) : (
                  " Are you sure you want to reject this request ?"
                )}
              </div>

              <div className="row mx-1  mt-3">
                <TextField
                  className="w-100"
                  label={formik.values?.type == 2 ? "Reason" : "Note"}
                  name="reason"
                  InputLabelProps={{ shrink: true }}
                  // type="email"
                  variant="outlined"
                  autoComplete="off"
                  required={formik.values?.type == 2}
                  placeholder={
                    formik.values?.type == 2 ? "Enter Reason" : "Enter Note"
                  }
                  size="small"
                  value={formik.values?.reason}
                  onChange={(e) => {
                    if (e.target.value.length < 100) {
                      formik.handleChange(e);
                    }
                  }}
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                  helperText={formik.touched.reason && formik.errors.reason}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  formik.handleReset(e);
                }}
              >
                Close
              </button>

              <button
                type="submit"
                className={
                  formik.values?.type == 1
                    ? "btn btn-success"
                    : "btn btn-danger"
                }
                onClick={(e) => {
                  formik.handleSubmit(e);
                }}
              >
                {formik.values?.type == 1 ? (
                  <span>
                    {" "}
                    {modifyBulkData?.length === 0 ? "Approve" : "Submit"}
                  </span>
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="open_modal12"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal4"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {formik1.values?.type == 1 ? (
                  "Raise query"
                ) : (
                  <>
                    {" "}
                    {modifyBulkData?.length > 0
                      ? "Modify/Reply query"
                      : "Reply query"}
                  </>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="query-close"
                aria-label="Close"
                onClick={(e) => {
                  setisSubmitted(false);
                  formik1.handleReset(e);
                }}
              ></button>
            </div>
            <div className="modal-body">
              {formik1.values?.type == 1 && (
                <div className="row m-1">
                  <FormControl fullWidth>
                    <Autocomplete
                      options={qhierarchyList}
                      getOptionLabel={(option) => option?.userName}
                      value={formik1.values?.raisedUserNameState}
                      required
                      onChange={(event, newValue, reason) => {
                        if (reason == "clear") {
                          formik1.setFieldValue("raisedUserNameState", null);
                          formik1.setFieldValue("raisedToUserId", 0);
                          return;
                        }
                        formik1.setFieldValue("raisedUserNameState", newValue);
                        formik1.setFieldValue(
                          "raisedToUserId",
                          newValue.userId
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select User"
                          required
                          error={
                            isSubmitted &&
                            formik1.values?.raisedUserNameState == null
                          }
                          helperText={
                            isSubmitted &&
                            formik1.values?.raisedUserNameState == null
                              ? "User is required"
                              : ""
                          }
                        />
                      )}
                    />
                  </FormControl>
                </div>
              )}

              <div className="row mx-1  mt-3">
                <TextField
                  className="w-100"
                  label={
                    formik1.values?.type == 1 ? "Query Note" : "Reply Note"
                  }
                  name="queryText"
                  InputLabelProps={{ shrink: true }}
                  // type="email"
                  variant="outlined"
                  autoComplete="off"
                  required={true}
                  placeholder={
                    formik1.values?.type == 1 ? "Enter query" : "Enter reply"
                  }
                  size="small"
                  value={formik1.values?.queryText}
                  onChange={(e) => {
                    if (e.target.value.length < 100) {
                      formik1.handleChange(e);
                    }
                  }}
                  error={isSubmitted && formik1.values?.queryText == ""}
                  helperText={
                    isSubmitted &&
                    formik1.values?.queryText == "" &&
                    formik1.values?.type == 1
                      ? "Query is required"
                      : isSubmitted &&
                        formik1.values?.queryText == "" &&
                        formik1.values?.type == 2 &&
                        "Reply is required"
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  formik1.handleReset(e);
                  setisSubmitted(false);
                }}
              >
                Close
              </button>

              <button
                type="submit"
                className={
                  formik1.values?.type == 1
                    ? "btn btn-success"
                    : "btn btn-success"
                }
                onClick={(e) => {
                  formik1.handleSubmit(e);
                }}
              >
                {formik1.values?.type == 1 ? "Raise" : "Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <DynamicModal
        id="Showtable"
        isOpen={isModalOpen}
        title={"Modify Summary"}
        onClose={(e) => {
          handleCloseModal(e);
        }}
        onSubmit={(e) => {
          formik2.setFieldValue("submitted", true);
          if (!formik2.values?.file) return;
          // console.log(("Submitted");
          formik2.handleSubmit(e);
        }}
        submitLabel={"Modify"}
      >
        <div className="modal-body">
          <div className="row m-1">
            <input
              type="file"
              className={`form-control ${
                formik2.values?.submitted && fileInputRef.current.value == ""
                  ? "is-invalid"
                  : ""
              }`}
              onChange={(e) => {
                handleFileUpload(e);
              }}
              ref={fileInputRef}
            />
            {formik2.values?.submitted && fileInputRef.current.value == "" && (
              <span className="text-danger">
                Choose atleast one file for upload
              </span>
            )}
          </div>
        </div>
      </DynamicModal> */}

      <button
        type="button"
        id="bulkModal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal6"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal6"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modify Summary
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="modify-close1"
                aria-label="Close"
                onClick={(e) => {
                  formik2.handleReset(e);
                  fileInputRef.current.value = ""; // Cle
                }}
              ></button>
            </div>
            <form onSubmit={formik2.handleSubmit}>
              <div className="modal-body">
                {/* <div className="mb-2 d-flex justify-content-end">
                  <a href="https://beamapi.altruistindia.com/business/v1/download/sample-file/Income_and_Expenses_Template.xlsx">
                    Sample Excel
                  </a>
                </div> */}
                <div className="row m-1">
                  <input
                    type="file"
                    className={`form-control ${
                      formik2.values?.submitted &&
                      fileInputRef.current.value == ""
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(e) => {
                      handleFileUpload(e);
                    }}
                    required
                    ref={fileInputRef}
                  />
                  {formik2.values?.submitted &&
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
                  // ref={closeBulkRef}
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
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DynamicModal
        id="cancel"
        isOpen={isModalOpen}
        title={"Cancel Confirmation"}
        onClose={(e) => {
          handleCloseModal();
        }}
        onSubmit={(e) => {
          setModifyBulkData([]);
          setModifySummary([]);
          uploadSummary(prevUploadId);
          dispatch(setUploadIdState(prevUploadId));
          handleCloseModal();
        }}
        submitLabel={"Ok"}
      >
        {" "}
        <div className="modal-body">
          <div className="row">
            <p> Are you sure you want to cancel this modification ?</p>
          </div>
        </div>
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
      >
        {" "}
        <div className="modal-body">
          {/* <div className="container">
            <div className="row">
              <div className="col-md-3">
                <strong>Month:</strong> {details?.month}
              </div>
              <div className="col-md-3">
                <strong>Year:</strong> {details?.year}
              </div>
              <div className="col-md-3">
                <strong>Cost Center Name:</strong> {details?.costCenterName}
              </div>
              <div className="col-md-3">
                <strong>Head:</strong> {details?.head}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                <strong>Ledger Name:</strong> {details?.ledgerName}
              </div>
              <div className="col-md-3">
                <strong>Business Type:</strong> {details?.businessType}
              </div>
              <div className="col-md-3">
                <strong>Quantity:</strong> {details?.quantity}
              </div>
              <div className="col-md-3">
                <strong>Rate per Unit:</strong> {details?.ratePerUnit}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3">
                <strong>Total Amount:</strong> {details?.totalAmount}
              </div>
              <div className="col-md-3">
                <strong>Upload ID:</strong> {details?.uploadId}
              </div>
            </div>
          </div> */}

          <TablewithoutPagination
            columns1={columns3}
            paginationShow={true}
            title={"Summary"}
            parentData={details || []}
            titleHide={true}
            tableId={"create_expense1"}
            showModify={false}
            uploadId={prevUploadId}
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
