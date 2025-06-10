// import * as React from 'react';
import DataTable from "../../../Components/DataTablePage";
import React, { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import "./Nav.css";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ColumnFilter from "../../../Components/ColumnFilter";
import {
  getDataForRequests,
  getqueryDetails,
  getqueryLists,
  raiseQueries,
} from "../../../services/expenseService";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SkeletonComp from "../../../Components/SkeletonComp";
import {
  setExpense,
  setTabIndex,
} from "../../../redux/features/authSliceandSidebar";
import ExportButton from "../../../Components/ExportButton";
import NoDataFound from "../../../Components/NoDataFound";
import { toast } from "react-toastify";
import TablewithoutPagination from "../../../Components/TablewithoutPagination";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("assignedtome");
  const [data, setData] = useState([]);
  const [TableStatus, setTableStatus] = useState({
    pageSize: 0,
    pageNo: 10,
  });

  const [totalPages, setTotalPages] = useState(0);
  const [paginationPage, setPaginationPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [bulkArray, setBulkArray] = useState([]);

  const [manualHit, setManualHit] = useState(false);

  const [queryType, setQueryType] = useState(0);

  const [request, setRequest] = useState({
    approvalStatus: 0,
    raisedToUserId: localStorage.getItem("userId"),
    pageNo: 0,
    pageSize: 10,
  });

  const [selectedKeys, setselectedKeys] = useState([
    "id",
    "companyName",
    "businessName",
    "monthYearRange",
    "raisedBy",
    "totalExpenseAmount",
    "totalRevenueAmount",
    "P&L",
    "raisedTo",
    "createdAt",
    "totalRevenueAmount",
    "approvalStatus",
  ]);

  const [raiseList, setRaisedList] = useState([]);
  const [raiseToList, setRaiseToList] = useState([]);

  const [request1, setRequest1] = useState({
    approvalStatus: 0,
    raisedToUserId: "",
    raiseByUserId: "",
    pageNo: 0,
    pageSize: 50,
  });

  const tabIndex = useSelector((state) => state.authSliceandSidebar.tabIndex);

  const getAmountHandle = (value) => {
    return value ? new Intl.NumberFormat().format(value) : "N/A";
  };

  const [columnArr, setColumnArr] = useState([
    {
      Header: "ForecastId",
      accessor: "id",
      Cell: (cell) => {
        return (
          <>
            {" "}
            <span className="text-success">{cell.row.original.id}</span>{" "}
          </>
        );
      },
    },
    {
      Header: "Company ",
      accessor: "companyName",
      Cell: (cell) => {
        return <>{getFieldHandle(cell.row.original.companyName)}</>;
      },
    },

    {
      Header: "Business",
      accessor: "businessName",
      Cell: (cell) => {
        return <>{getFieldHandle(cell.row.original.businessName)}</>;
      },
    },
    {
      Header: "Cost Center/Client",
      accessor: "costCenterName",
      Cell: (cell) => {
        return <>{getFieldHandle(cell.row.original.costCenterName)}</>;
      },
    },

    {
      Header: "Type ",
      accessor: "type",
      Cell: (cell) => {
        return (
          <>
            <span style={{ textTransform: "capitalize" }}>
              {" "}
              {getFieldHandle(cell.row.original.businessType)}
            </span>
          </>
        );
      },
    },

    {
      Header: "Raised By",
      accessor: "raisedBy",
      Cell: (cell) => {
        return <> {getFieldHandle(cell.row.original.raisedBy)}</>;
      },
    },

    {
      Header: "Amount",
      accessor: "totalRevenueAmount",
      Cell: (cell) => {
        return (
          <>
            {" "}
            <span className="text-success">
              {cell.row.original.currency}
            </span>{" "}
            {getFieldHandle(cell.row.original.totalRevenueAmount)}
          </>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (cell) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "unset",
                textAlign: "center",
              }}
            >
              {cell.row.original.approvalStatus == 0 && (
                <span
                  className="badge text-white mx-1 cursor_"
                  title="Pending"
                  style={{ padding: "1px", backgroundColor: "#ff8c00" }}
                >
                  <AccessTimeIcon />
                </span>
              )}
              {cell.row.original.approvalStatus == 1 && (
                <span
                  className="badge bg-danger text-white mx-1 cursor_"
                  title="Rejected"
                  style={{ padding: "1px" }}
                >
                  <DoneOutlineIcon />
                </span>
              )}
              {cell.row.original.approvalStatus == 2 && (
                <span
                  className="badge bg-success text-white mx-1 cursor_ "
                  title="Approved"
                  style={{ padding: "1px" }}
                >
                  <CloseIcon />
                </span>
              )}
            </div>
          </>
        );
      },
    },

    {
      Header: "Created",
      accessor: "createdAt",
      Cell: (cell) => {
        return (
          <>
            {moment(new Date(cell.row.original.createdAt))
              // .add(5, "hours")
              // .add(30, "minutes")
              .format("DD-MMM-YYYY h:mm a")}
          </>
        );
      },
    },
    {
      Header: "View",
      Footer: "User-Action",
      accessor: "action",
      Cell: (cell) => {
        return (
          <>
            <IconButton
              title="View Detail"
              style={{ marginLeft: "19%" }}
              onClick={() => {
                viewDetail(cell);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </>
        );
      },
      disableFilters: true,
    },
  ]);
  const [hideSkeleton, setHideSkeleton] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const [isSideBarOpen, setIsSidebaropen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (activeTab == "assignedtome") {
        getAllAssigned();
      } else if (activeTab == "myreq") {
        getAllAssigned1();
      } else if (activeTab == "report") {
        getAllAssigned2();
      } else if (activeTab == "myqueries") {
        getRaisedToID();
      }
    }
  }, [request, activeTab]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const y = useSelector((state) => state.authSliceandSidebar.sideBarOpen);

  useEffect(() => {
    if (y) {
      setIsSidebaropen(true);
    } else {
      setIsSidebaropen(false);
    }
  }, [y]);

  useEffect(() => {
    if (tabIndex != "") {
      setActiveTab(tabIndex);

      if (localStorage.getItem("user")) {
        if (tabIndex == "assignedtome") {
          setActiveTab("assignedtome");
        } else if (tabIndex == "myreq") {
          setActiveTab("myreq");
        } else if (tabIndex == "report") {
          setActiveTab("report");
        }
      }
      if (tabIndex == "myqueries") {
        setRequest1({
          ...request1,
          raisedToUserId: localStorage.getItem("userId"),
        });
      }
    }
  }, [tabIndex]);

  const columns = useMemo(() => {
    let baseColumns = [
      {
        Header: "Id",
        accessor: "id",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">{cell.row.original.id}</span>{" "}
            </>
          );
        },
      },
      {
        Header: "Company",
        accessor: "companyName",
        Cell: (cell) => {
          return <>{getFieldHandle(cell.row.original.companyName)}</>;
        },
      },

      {
        Header: "Business",
        accessor: "businessName",
        Cell: (cell) => {
          return <>{getFieldHandle(cell.row.original.businessName)}</>;
        },
      },

      {
        Header: "Budget Type",
        accessor: "budgetType",
        Cell: (cell) => {
          return (
            <>
              {getFieldHandle(
                cell.row.original.budgetType == 0 ? "Projected" : "Actual"
              )}
            </>
          );
        },
      },
      // {
      //   Header: "Currency",
      //   accessor: "currency",
      //   Cell: (cell) => {
      //     return (
      //       <>
      //         {" "}
      //         <span className="text-success">
      //           {cell.row.original.currency}
      //         </span>{" "}
      //       </>
      //     );
      //   },
      // },

      {
        Header: "Total Revenue",
        accessor: "totalRevenueAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {cell.row.original.currency}
              </span>{" "}
              {getAmountHandle(cell.row.original.totalRevenueAmount)}
            </>
          );
        },
      },
      {
        Header: "Total Expense",
        accessor: "totalExpenseAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {cell.row.original.currency}
              </span>{" "}
              {/* {cell.row.original.currency}{" "} */}
              {getAmountHandle(cell.row.original.totalExpenseAmount)}
            </>
          );
        },
      },

      {
        Header: `P&L`,
        accessor: "totalExpenseAmount1",
        Cell: (cell) => {
          let pl =
            cell.row.original.totalRevenueAmount -
            cell.row.original.totalExpenseAmount;

          pl.toFixed(2);
          return (
            <>
              {" "}
              <span className="text-success">
                {cell.row.original.currency}
              </span>{" "}
              {pl.toFixed(2) ? pl.toFixed(2) : 0}
              {/* {getFieldHandle(cell.row.original.totalExpenseAmount)} */}
            </>
          );
        },
      },

      {
        Header: "For Period",
        accessor: "monthYearRange",
        Cell: (cell) => {
          return <> {getFieldHandle(cell.row.original.monthYearRange)}</>;
        },
      },

      {
        Header: "Raised By",
        accessor: "raisedBy",
        Cell: (cell) => {
          return (
            <> {getFieldHandle(cell.row.original.raisedBy?.split(" ")[0])}</>
          );
        },
      },

      {
        Header: "Raised On",
        accessor: "createdAt",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.createdAt))
                // .add(5, "hours")
                // .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "approvalStatus",
        Cell: (cell) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "unset",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {cell.row.original.approvalStatus == 0 && (
                  <span
                    className="badge text-white mx-1 cursor_"
                    title="Pending"
                    style={{ padding: "1px", backgroundColor: "#ff8c00" }}
                  >
                    <AccessTimeIcon />
                  </span>
                )}
                {cell.row.original.approvalStatus == 1 && (
                  <span
                    className="badge bg-success text-white mx-1 cursor_"
                    title="Approved"
                    style={{ padding: "1px" }}
                  >
                    <DoneOutlineIcon />
                  </span>
                )}
                {cell.row.original.approvalStatus == 2 && (
                  <span
                    className="badge bg-danger text-white mx-1 cursor_ "
                    title="Rejected"
                    style={{ padding: "1px" }}
                  >
                    <CloseIcon />
                  </span>
                )}
              </div>
            </>
          );
        },
      },
      {
        Header: "View",
        Footer: "User-Action",
        accessor: "action",
        Cell: (cell) => {
          return (
            <>
              <IconButton
                title="View Detail"
                style={{ marginLeft: "19%" }}
                onClick={() => {
                  viewDetail(cell);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </>
          );
        },
        disableFilters: true,
      },
    ];

    if (activeTab == "assignedtome") {
    } else if (activeTab == "report") {
      baseColumns.splice(10, 0, {
        Header: "Pending At",
        accessor: "pending At",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.approvalStatus == 0
                ? cell.row.original.raisedTo?.split(" ")[0]  : cell.row.original.approvalStatus == 2 ?"Rejected": cell.row.original.approvalStatus == 2? "Approved"
                : "Settled"}
            </>
          );
        },
      });
    }

    return baseColumns;
  }, [data, TableStatus, activeTab]);

  const columns1 = useMemo(() => {
    let baseColumns = [
      {
        Header: "QueryId",
        accessor: "id",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">{cell.row.original.id}</span>{" "}
            </>
          );
        },
      },
      {
        Header: "Query",
        accessor: "queryText",
        Cell: (cell) => {
          return <>{getFieldHandle(cell.row.original.queryText)}</>;
        },
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        Cell: (cell) => {
          return <>{getFieldHandle(cell.row.original.companyName)}</>;
        },
      },

      {
        Header: "Business",
        accessor: "businessname",
        Cell: (cell) => {
          return <>{getFieldHandle(cell.row.original.businessname)}</>;
        },
      },

      {
        Header: "Raised On",
        accessor: "createdAt",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.createdAt))
                // .add(5, "hours")
                // .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        },
      },
      {
        Header: "View",
        Footer: "User-Action",
        accessor: "action",
        Cell: (cell) => {
          return (
            <>
              <IconButton
                title="View Detail"
                style={{ marginLeft: "19%" }}
                onClick={() => {
                  localStorage.setItem(
                    "expenseId",
                    cell.row.original.businessDetailId
                  );
                  history.push(
                    `/approvalpage/${cell.row.original.businessDetailId}`
                  );
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </>
          );
        },
        disableFilters: true,
      },
    ];

    if (queryType == 0) {
      baseColumns.splice(4, 0, {
        Header: "Raised By",
        accessor: "raisedBy",
        Cell: (cell) => {
          return <> {getFieldHandle(cell.row.original.raisedBy)}</>;
        },
      });
    } else if (queryType == 1) {
      baseColumns.splice(4, 0, {
        Header: "Raised To",
        accessor: "raisedTo",
        Cell: (cell) => {
          return <> {getFieldHandle(cell.row.original.raisedTo)}</>;
        },
      });
    }

    return baseColumns;
  }, [data, TableStatus, activeTab, queryType, request1]);
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

  const getFieldHandle = (name) => {
    return name ? name : "N/A";
  };

  const changeTableData = async (type, value) => {
    if (type == 0) {
    } else if (type == 1) {
      value = value - 1;
    } else {
      value = value - 1;
    }
    // callbackCall();
    await setRequest({ ...request, pageNo: value });
  };

  const viewDetail = (cell) => {
    dispatch(setExpense(cell.row.original));
    history.push(`/approvalpage/${cell.row.original.id}`);
  };

  const viewDetail2 = (cell) => {
    // console.log(cell);
    // dispatch(setExpense(cell.row.original));

    localStorage.setItem("expenseId", cell.row.original.businessDetailId);
    history.push(`/approvalpage/${cell.row.original.businessDetailId}`);
  };

  const getRaisedByID = async () => {
    let formdata = { ...request1 };

    delete formdata["raisedToUserId"];
    formdata["raisedByUserId"] = localStorage.getItem("userId");

    delete formdata["queryStatus"];

    await getqueryLists(formdata)
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          setRaisedList(res.data.businessQuery.content);
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
        // toast.error("Something wrong");
      });
  };

  const getRaisedToID = async () => {
    let formdata = { ...request1 };

    delete formdata["raisedByUserId"];
    formdata["raisedToUserId"] = localStorage.getItem("userId");

    formdata["queryStatus"] = 0;

    await getqueryLists(formdata)
      .then((res) => {
        if (res?.data?.statusDescription?.statusCode == 200) {
          setRaiseToList(res.data.businessQuery.content);
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
        // toast.error("Something wrong");
      });
  };
  const clearTable = async () => {
    setTotalCount(0);
    setTotalPages(0);
    setPaginationPage(0);
    setTableStatus({});
    await setRequest({
      ...request,
      pageNo: 0,
      pageSize: 10,
    });

    setData([]);
  };
  const getAllAssigned = async () => {
    setHideSkeleton(true);
    let formdata = { ...request };
    delete formdata.userId;
    formdata["approvalStatus"] = 0;
    formdata["raisedToUserId"] = localStorage.getItem("userId");
    await getDataForRequests(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setHideSkeleton(false);
        setPaginationPage(res.data.businessDetailMasterList.number + 1);

        setTotalCount(res.data.businessDetailMasterList.totalElements);

        // // console.log(res.data);
        setData(res.data?.businessDetailMasterList.content);
        setTotalPages(res.data?.businessDetailMasterList.totalPages);
      } else {
        setHideSkeleton(false);
        setData([]);
      }
    });
  };

  const getAllAssigned1 = async () => {
    setHideSkeleton(true);
    let formdata = request;
    formdata["raisedToUserId"] = null;
    delete formdata["approvalStatus"];

    formdata["userId"] = localStorage.getItem("userId");
    await getDataForRequests(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setHideSkeleton(false);
        setPaginationPage(res.data.businessDetailMasterList.number + 1);

        setTotalCount(res.data.businessDetailMasterList.totalElements);

        // // console.log(res.data);
        setData(res.data?.businessDetailMasterList.content);
        setTotalPages(res.data?.businessDetailMasterList.totalPages);
      } else {
        setHideSkeleton(false);
        setData([]);
      }
    });
  };

  const getAllAssigned2 = async () => {
    setHideSkeleton(true);
    let formdata = request;
    formdata["userId"] = null;
    formdata["raisedToUserId"] = null;
    formdata["approvalStatus"] = null;
    await getDataForRequests(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setHideSkeleton(false);
        setPaginationPage(res.data.businessDetailMasterList.number + 1);

        setTotalCount(res.data.businessDetailMasterList.totalElements);

        // // console.log(res.data);
        setData(res?.data?.businessDetailMasterList.content);
        setTotalPages(res?.data?.businessDetailMasterList.totalPages);
      } else {
        setHideSkeleton(false);
        setData([]);
      }
    });
  };

  return (
    <div className="p-4 content_main_open" id="nav_status">
      <div className="content">
        {/* Navigation Tabs */}
        <ul className="nav nav-pills" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "assignedtome" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("assignedtome");
                clearTable();
                dispatch(setTabIndex("assignedtome"));
                // getAllAssigned();
                // columnHandler();
              }}
            >
              <span>Assigned to me</span>
              {/* <span className="counter-badge">3</span> */}
              {/* Counter Badge */}
            </button>
          </li>
          <li className="nav-item" role="tablist">
            <button
              className={`nav-link ${activeTab === "myreq" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("myreq");
                clearTable();
                dispatch(setTabIndex("myreq"));
                // getAllAssigned1();
              }}
            >
              <span>My Requests</span>
              {/* <span className="counter-badge myreq">3</span>{" "} */}
              {/* Counter Badge */}
            </button>
          </li>
          <li className="nav-item" role="tablist">
            <button
              className={`nav-link ${activeTab === "report" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("report");
                clearTable();
                dispatch(setTabIndex("report"));
                // getAllAssigned2();
              }}
            >
              <span>Report</span>
              {/* <span className="counter-badge report">3</span>{" "} */}
              {/* Counter Badge */}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "myqueries" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("myqueries");
                dispatch(setTabIndex("myqueries"));

                setRequest1({
                  queryStatus: 0,
                  raisedToUserId: localStorage.getItem("userId"),
                  pageNo: 0,
                  pageSize: 10,
                });
              }}
            >
              <span>My Queries</span>
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className={`tab-content  ${!isSideBarOpen ? "area" : ""}`}>
          {activeTab === "assignedtome" && (
            <div className="container tab-pane active">
              <div className="card shadow-none border bg_white create_expense_card">
                <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
                  <i className="fas fa-plus-circle mx-1"></i>&nbsp;Assigned To
                  Me
                </span>
                <div className="card-body">
                  {data.length > 0 && (
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-start">
                        <select
                          value={TableStatus.pageSize}
                          className="w-30 p-2 pt-1"
                          style={{
                            fontSize: "11px",
                            marginRight: "20px",
                            height: "30px",
                            marginTop: "2.5%",
                          }}
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setTableStatus({
                              ...TableStatus,
                              pageSize: e.target.value,
                              pageNo: 0,
                            });
                            setRequest({
                              ...request,
                              pageSize: e.target.value,
                            });
                          }}
                        >
                          {[...new Set([10, 25, 50, totalCount])]
                            .sort((a, b) => {
                              return a - b;
                            })
                            .map((value) => {
                              return (
                                <option
                                  aria-labelledby="dropdownMenuButton1"
                                  value={value}
                                  key={value}
                                >
                                  Show {value}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div
                        className="d-flex  "
                        style={{ justifyContent: "flex-end !important" }}
                      >
                        <Tooltip title="Refresh">
                          <button
                            type="submit"
                            style={{ marginRight: "20px" }}
                            className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                            onClick={() => {
                              clearTable();
                              getAllAssigned();
                            }}
                          >
                            <RefreshIcon />
                          </button>
                        </Tooltip>
                        <ExportButton
                          selectedKeys={selectedKeys}
                          data={data}
                          type={1}
                        />
                      </div>
                    </div>
                  )}

                  {hideSkeleton ? (
                    <SkeletonComp count={10} />
                  ) : (
                    <>
                      {data?.length > 0 ? (
                        <div
                          className=" small_1 table-responsive"
                          style={{ marginTop: "2%" }}
                        >
                          <table
                            {...getTableProps()}
                            id="example"
                            className="table table-striped message_table table-bordered mytableClass dataTable table-sm  class_size "
                            style={{ width: "100%" }}
                          >
                            <thead>
                              {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                  {headerGroup.headers.map((column) => (
                                    <th
                                      {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                      )}
                                      className={
                                        column?.Header == "status"
                                          ? "widht_class"
                                          : "text-center width_2 update_th_sp "
                                      }
                                      // colSpan={columnIndex  === 9 ? 4 : 1}
                                    >
                                      {column.render("Header")}
                                      <span>
                                        {column.isSorted
                                          ? column.isSortedDesc
                                            ? "↑"
                                            : "↓"
                                          : ""}
                                      </span>
                                      {column.Header == "Camp Type" ? (
                                        <>
                                          <InputAdornment
                                            position="end"
                                            className="my-auto"
                                          >
                                            <Tooltip
                                              title={"P-Promotional T-Transactional"
                                                .split(" ")
                                                .map((arg) => {
                                                  return (
                                                    <>
                                                      {arg}
                                                      <br />
                                                    </>
                                                  );
                                                })}
                                              id="toolTipId"
                                              placement="top"
                                              arrow
                                              sx={{ color: "white" }}
                                            >
                                              <InfoIcon />
                                            </Tooltip>
                                          </InputAdornment>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody
                              className="unique_spacing"
                              {...getTableBodyProps()}
                              id="svg_tbody"
                            >
                              {page.map((row) => {
                                prepareRow(row);
                                return (
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                      return (
                                        <td
                                          {...cell.getCellProps()}
                                          // className="text-start"
                                          className={` ${
                                            cell.column.Header ==
                                              "Total Revenue" ||
                                            cell.column.Header ==
                                              "Total Expense" ||
                                            cell.column.Header == "P&L" ||
                                            cell.column.Header == "Budget Id"
                                              ? "text-right text-end"
                                              : "text-left update_td"
                                          } ${
                                            cell.column.Header == "Status" &&
                                            "widht_class  text-left update_td"
                                          }  ${
                                            cell.column.Header == "Type" &&
                                            "text-capitalize"
                                          }  `}
                                        >
                                          {cell.render("Cell")}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <NoDataFound />
                      )}
                      {data.length > 0 && (
                        <div className="d-flex justify-content-between mt-3">
                          <div>
                            <span>
                              Page:
                              <strong>
                                {0 + 1} of {""}
                                {totalPages}
                              </strong>
                            </span>
                          </div>
                          <div className="prev_next d-flex align-items-center">
                            <button
                              className=" css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root m-0"
                              type="button"
                              onClick={() => {
                                setTableStatus({
                                  ...TableStatus,
                                  pageNo: 0,
                                });
                                setPaginationPage(1);
                                changeTableData(0, 0);
                              }}
                            >
                              First
                            </button>
                            <Stack spacing={2}>
                              <Pagination
                                onChange={(event, value) => {
                                  setTableStatus({
                                    ...TableStatus,
                                    pageNo: Number(value) - 1,
                                  });
                                  setPaginationPage(value);
                                  changeTableData(1, value);
                                }}
                                page={paginationPage}
                                count={totalPages ? totalPages : ""}
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                              />
                            </Stack>
                            <button
                              className="css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root ms-2"
                              type="button"
                              onClick={() => {
                                let totalPage = totalPages;
                                totalPage = totalPage - 1;
                                setTableStatus({
                                  ...TableStatus,
                                  pageNo: totalPage,
                                });
                                setPaginationPage(totalPages);
                                changeTableData(3, totalPages);
                              }}
                            >
                              Last
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* {hideSkeleton ? (
            <SkeletonComp count={10} />
          ) : (
            <DataTable
              columns1={columns}
              title={"Assigned To Me"}
              Apiurl={"/business/v1/details"}
              respObj={"businessDetailMasterList"}
              content={"content"}
              request1={request}
              paginationShow={true}
              manualHit={manualHit}
            ></DataTable>
          )} */}
          {activeTab === "myreq" && (
            <div className="container tab-pane active">
              <div className="card shadow-none border bg_white create_expense_card">
                <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
                  <i className="fas fa-plus-circle mx-1"></i>&nbsp; My Requests
                </span>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                      <select
                        value={TableStatus.pageSize}
                        className="w-30 p-2 pt-1"
                        style={{
                          fontSize: "11px",
                          marginRight: "20px",
                          height: "30px",
                          marginTop: "2.5%",
                        }}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setTableStatus({
                            ...TableStatus,
                            pageSize: e.target.value,
                            pageNo: 0,
                          });
                          setRequest({
                            ...request,
                            pageSize: e.target.value,
                          });
                        }}
                      >
                        {[...new Set([10, 25, 50, totalCount])]
                          .sort((a, b) => {
                            return a - b;
                          })
                          .map((value) => {
                            return (
                              <option
                                aria-labelledby="dropdownMenuButton1"
                                value={value}
                                key={value}
                              >
                                Show {value}
                              </option>
                            );
                          })}
                      </select>
                      {/* </div> */}
                      {/* <div className='d-flex justify-content-start mt-1 '> */}
                      {/* <Checkbox
                        checked={selectBool}
                        onChange={() => {
                          selectAll();
                        }}
                        inputprops={{ "aria-label": "controlled" }}
                      /> */}
                      {/* <p
                        style={{
                          marginTop: "11px",
                          marginBottom: "0px",
                          fontSize: "11px",
                          marginRight: "20px",
                        }}
                      >
                        Select All
                      </p> */}
                      {/* </div> */}
                      {/* <div className="d-flex justify-content-end mb-3"> */}
                    </div>
                    <div
                      className="d-flex  "
                      style={{ justifyContent: "flex-end !important" }}
                    >
                      <Tooltip title="Refresh">
                        <button
                          type="submit"
                          style={{ marginRight: "20px" }}
                          className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                          onClick={() => {
                            getAllAssigned1();
                          }}
                        >
                          <RefreshIcon />
                        </button>
                      </Tooltip>
                      {/* <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          fontSize: "11px",
                          marginRight: "20px",
                          height: "28px",
                          marginTop: "4%",
                        }}
                        // disabled={bulkArray.length == 0}
                        onClick={() => {
                          document.getElementById("confirm-button")?.click();
                        }}
                        // disabled={bulkArray.length == 0}
                      >
                        {bulkArray.length != 0 ? (
                          <span>
                            {" "}
                            Export ({bulkArray.length != 0 && bulkArray.length})
                          </span>
                        ) : (
                          <span> Export</span>
                        )}
                      </button> */}
                      <ExportButton
                        selectedKeys={selectedKeys}
                        data={data}
                        type={2}
                      />
                    </div>
                  </div>

                  {hideSkeleton ? (
                    <SkeletonComp count={10} />
                  ) : (
                    <>
                      {data?.length > 0 ? (
                        <div
                          className=" small_1 table-responsive"
                          style={{ marginTop: "2%" }}
                        >
                          <table
                            {...getTableProps()}
                            id="example"
                            className="table table-striped message_table table-bordered mytableClass dataTable table-sm  class_size "
                            style={{ width: "100%" }}
                          >
                            <thead>
                              {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                  {headerGroup.headers.map((column) => (
                                    <th
                                      {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                      )}
                                      className={
                                        column?.Header == "status"
                                          ? "widht_class"
                                          : "text-center width_2 update_th_sp "
                                      }
                                      // colSpan={columnIndex  === 9 ? 4 : 1}
                                    >
                                      {column.render("Header")}
                                      <span>
                                        {column.isSorted
                                          ? column.isSortedDesc
                                            ? "↑"
                                            : "↓"
                                          : ""}
                                      </span>
                                      {column.Header == "Camp Type" ? (
                                        <>
                                          <InputAdornment
                                            position="end"
                                            className="my-auto"
                                          >
                                            <Tooltip
                                              title={"P-Promotional T-Transactional"
                                                .split(" ")
                                                .map((arg) => {
                                                  return (
                                                    <>
                                                      {arg}
                                                      <br />
                                                    </>
                                                  );
                                                })}
                                              id="toolTipId"
                                              placement="top"
                                              arrow
                                              sx={{ color: "white" }}
                                            >
                                              <InfoIcon />
                                            </Tooltip>
                                          </InputAdornment>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody
                              className="unique_spacing"
                              {...getTableBodyProps()}
                              id="svg_tbody"
                            >
                              {page.map((row) => {
                                prepareRow(row);
                                return (
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                      return (
                                        <td
                                          {...cell.getCellProps()}
                                          // className="text-start"
                                          className={` ${
                                            cell.column.Header ==
                                              "Total Revenue" ||
                                            cell.column.Header ==
                                              "Total Expense" ||
                                            cell.column.Header == "P&L" ||
                                            cell.column.Header == "Budget Id"
                                              ? "text-right text-end"
                                              : "text-left update_td"
                                          } ${
                                            cell.column.Header == "Status" &&
                                            "widht_class  text-left update_td"
                                          }  ${
                                            cell.column.Header == "Type" &&
                                            "text-capitalize"
                                          }  `}
                                        >
                                          {cell.render("Cell")}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <NoDataFound />
                      )}

                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          <span>
                            Page:
                            <strong>
                              {0 + 1} of {""}
                              {totalPages}
                            </strong>
                          </span>
                        </div>
                        <div className="prev_next d-flex align-items-center">
                          <button
                            className=" css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root m-0"
                            type="button"
                            onClick={() => {
                              setTableStatus({
                                ...TableStatus,
                                pageNo: 0,
                              });
                              setPaginationPage(1);
                              changeTableData(0, 0);
                            }}
                          >
                            First
                          </button>
                          <Stack spacing={2}>
                            <Pagination
                              onChange={(event, value) => {
                                setTableStatus({
                                  ...TableStatus,
                                  pageNo: Number(value) - 1,
                                });
                                setPaginationPage(value);
                                changeTableData(1, value);
                                //  resetCheckBoxes();
                                // setrunningStateFun(false);
                              }}
                              page={paginationPage}
                              count={totalPages ? totalPages : ""}
                              variant="outlined"
                              shape="rounded"
                              color="primary"
                            />
                          </Stack>
                          <button
                            className="css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root ms-2"
                            type="button"
                            // style={{ background: "#2C97D4" }}
                            // disabled={
                            //   data1?.totalPages == data1?.pageable?.pageNumber + 1
                            //  }
                            onClick={() => {
                              let totalPage = totalPages;
                              totalPage = totalPage - 1;
                              setTableStatus({
                                ...TableStatus,
                                pageNo: totalPage,
                              });
                              setPaginationPage(totalPages);
                              //  resetCheckBoxes();
                              // alert("gg")
                              changeTableData(3, totalPages);
                              // setrunningStateFun(false);
                            }}
                          >
                            Last
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "report" && (
            <div className="container tab-pane active">
              <div className="card shadow-none border bg_white create_expense_card">
                <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
                  <i className="fas fa-plus-circle mx-1"></i>&nbsp; Report
                </span>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                      <select
                        value={TableStatus.pageSize}
                        className="w-30 p-2 pt-1"
                        style={{
                          fontSize: "11px",
                          marginRight: "20px",
                          height: "30px",
                          marginTop: "2.5%",
                        }}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setTableStatus({
                            ...TableStatus,
                            pageSize: e.target.value,
                            pageNo: 0,
                          });
                          setRequest({
                            ...request,
                            pageSize: e.target.value,
                          });
                        }}
                      >
                        {[...new Set([10, 25, 50, totalCount])]
                          .sort((a, b) => {
                            return a - b;
                          })
                          .map((value) => {
                            return (
                              <option
                                aria-labelledby="dropdownMenuButton1"
                                value={value}
                                key={value}
                              >
                                Show {value}
                              </option>
                            );
                          })}
                      </select>
                      {/* </div> */}
                      {/* <div className='d-flex justify-content-start mt-1 '> */}
                      {/* <Checkbox
                        checked={selectBool}
                        onChange={() => {
                          selectAll();
                        }}
                        inputprops={{ "aria-label": "controlled" }}
                      /> */}
                      {/* <p
                        style={{
                          marginTop: "11px",
                          marginBottom: "0px",
                          fontSize: "11px",
                          marginRight: "20px",
                        }}
                      >
                        Select All
                      </p> */}
                      {/* </div> */}
                      {/* <div className="d-flex justify-content-end mb-3"> */}
                    </div>
                    <div
                      className="d-flex  "
                      style={{ justifyContent: "flex-end !important" }}
                    >
                      <Tooltip title="Refresh">
                        <button
                          type="submit"
                          style={{ marginRight: "20px" }}
                          className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                          onClick={(each) => {
                            clearTable();
                            getAllAssigned2();
                          }}
                        >
                          <RefreshIcon />
                        </button>
                      </Tooltip>
                      <ExportButton
                        selectedKeys={selectedKeys}
                        data={data}
                        type={3}
                      />
                    </div>
                  </div>

                  {hideSkeleton ? (
                    <SkeletonComp count={10} />
                  ) : (
                    <>
                      {data?.length > 0 ? (
                        <div
                          className=" small_1 table-responsive"
                          style={{ marginTop: "2%" }}
                        >
                          <table
                            {...getTableProps()}
                            id="example"
                            className="table table-striped message_table table-bordered mytableClass dataTable table-sm  class_size "
                            style={{ width: "100%" }}
                          >
                            <thead>
                              {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                  {headerGroup.headers.map((column) => (
                                    <th
                                      {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                      )}
                                      className={
                                        column?.Header == "status"
                                          ? "widht_class"
                                          : "text-center width_2 update_th_sp "
                                      }
                                      // colSpan={columnIndex  === 9 ? 4 : 1}
                                    >
                                      {column.render("Header")}
                                      <span>
                                        {column.isSorted
                                          ? column.isSortedDesc
                                            ? "↑"
                                            : "↓"
                                          : ""}
                                      </span>
                                      {column.Header == "Camp Type" ? (
                                        <>
                                          <InputAdornment
                                            position="end"
                                            className="my-auto"
                                          >
                                            <Tooltip
                                              title={"P-Promotional T-Transactional"
                                                .split(" ")
                                                .map((arg) => {
                                                  return (
                                                    <>
                                                      {arg}
                                                      <br />
                                                    </>
                                                  );
                                                })}
                                              id="toolTipId"
                                              placement="top"
                                              arrow
                                              sx={{ color: "white" }}
                                            >
                                              <InfoIcon />
                                            </Tooltip>
                                          </InputAdornment>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody
                              className="unique_spacing"
                              {...getTableBodyProps()}
                              id="svg_tbody"
                            >
                              {page.map((row) => {
                                prepareRow(row);
                                return (
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                      return (
                                        <td
                                          {...cell.getCellProps()}
                                          // className="text-start"
                                          className={` ${
                                            cell.column.Header ==
                                              "Total Expense" ||
                                            cell.column.Header ==
                                              "Total Revenue" ||
                                            cell.column.Header == "P&L" ||
                                            cell.column.Header == "Budget Id"
                                              ? "text-right text-end"
                                              : "text-left update_td"
                                          } ${
                                            cell.column.Header == "Status" &&
                                            "widht_class  text-left update_td"
                                          }  ${
                                            cell.column.Header == "Type" &&
                                            "text-capitalize"
                                          }  `}
                                        >
                                          {cell.render("Cell")}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <NoDataFound />
                      )}

                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          <span>
                            Page:
                            <strong>
                              {0 + 1} of {""}
                              {totalPages}
                            </strong>
                          </span>
                        </div>
                        <div className="prev_next d-flex align-items-center">
                          <button
                            className=" css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root m-0"
                            type="button"
                            onClick={() => {
                              setTableStatus({
                                ...TableStatus,
                                pageNo: 0,
                              });
                              setPaginationPage(1);
                              changeTableData(0, 0);
                            }}
                          >
                            First
                          </button>
                          <Stack spacing={2}>
                            <Pagination
                              onChange={(event, value) => {
                                setTableStatus({
                                  ...TableStatus,
                                  pageNo: Number(value) - 1,
                                });
                                setPaginationPage(value);
                                changeTableData(1, value);
                                //  resetCheckBoxes();
                                // setrunningStateFun(false);
                              }}
                              page={paginationPage}
                              count={totalPages ? totalPages : ""}
                              variant="outlined"
                              shape="rounded"
                              color="primary"
                            />
                          </Stack>
                          <button
                            className="css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root ms-2"
                            type="button"
                            // style={{ background: "#2C97D4" }}
                            // disabled={
                            //   data1?.totalPages == data1?.pageable?.pageNumber + 1
                            //  }
                            onClick={() => {
                              let totalPage = totalPages;
                              totalPage = totalPage - 1;
                              setTableStatus({
                                ...TableStatus,
                                pageNo: totalPage,
                              });
                              setPaginationPage(totalPages);
                              //  resetCheckBoxes();
                              // alert("gg")
                              changeTableData(3, totalPages);
                              // setrunningStateFun(false);
                            }}
                          >
                            Last
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "myqueries" && (
            <div className="container tab-pane active sub_tab_navstatus">
              <ul
                className="nav nav-tabs quer_sub_ul"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                    onClick={(e) => {
                      setQueryType(0);
                      // setRequest1({
                      //   queryStatus: 0,
                      //   raisedToUserId: localStorage.getItem("userId"),
                      //   pageNo: 0,
                      //   pageSize: 10,
                      //   raiseByUserId: null,
                      // });

                      getRaisedToID();
                    }}
                  >
                    Query Inbox
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                    onClick={(e) => {
                      getRaisedByID();
                      setQueryType(1);
                      // setRequest1({
                      //   ...request,
                      //   raiseByUserId: localStorage.getItem("userId"),
                      //   raisedToUserId: null,
                      //   queryStatus: null,
                      // });
                    }}
                  >
                    My Raised
                  </button>
                </li>
              </ul>
              <div
                className="tab-content queries_subtab_content px-0"
                id="myTabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex="0"
                >
                  <TablewithoutPagination
                    columns1={columns1}
                    title={"Query Inbox"}
                    parentData={raiseToList}
                  ></TablewithoutPagination>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex="0"
                >
                  <TablewithoutPagination
                    columns1={columns1}
                    title={"Raise By Me"}
                    parentData={raiseList}
                  ></TablewithoutPagination>
                  {/* <DataTable
                    columns1={columns1}
                    parentData={raiseList}
                    title={"Raised By Me"}
                    Apiurl={"/business/v1/query-detail"}
                    respObj={"businessQuery"}
                    content={"content"}
                    request1={request1}
                  ></DataTable>{" "} */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
