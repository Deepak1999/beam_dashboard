import DataTable from "../../../Components/DataTablePage";
import React, { useEffect, useMemo, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
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
import { getDataForRequests } from "../../../services/expenseService";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SkeletonComp from "../../../Components/SkeletonComp";
import { setExpense } from "../../../redux/features/authSliceandSidebar";
import ExportButton from "../../../Components/ExportButton";
import NoDataFound from "../../../Components/NoDataFound";

export default function RaisedBMe(props) {
  const [data, setData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationPage, setPaginationPage] = useState(0);

  const [request, setRequest] = useState({
    approvalStatus: 0,
    userId: 0,
    pageNo: 0,
    pageSize: 10,
  });

  const [activeTab, setActiveTab] = useState("assignedtome");
  const [TableStatus, setTableStatus] = useState({
    pageSize: 0,
    pageNo: 10,
  });

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

  const getAllAssigned = async () => {
    setHideSkeleton(true);
    let formdata = { ...request };
    delete formdata.userId;
    formdata["status"] = 0;
    formdata["userId"] = localStorage.getItem("userId");
    await getqueryLists(formdata).then((res) => {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setHideSkeleton(false);
        setPaginationPage(res?.data?.businessDetailList.number + 1);

        setTotalCount(res?.data?.businessDetailList.totalElements);

        // // console.log(res.data);
        setData(res.data?.businessDetailList.content);
        setTotalPages(res.data?.businessDetailList.totalPages);
      } else {
        setHideSkeleton(false);
        setData([]);
      }
    });
  };

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

  return (
    <>
      <div className="container tab-pane active">
        <div className="card shadow-none border bg_white create_expense_card">
          <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
            <i className="fas fa-plus-circle mx-1"></i>&nbsp;Raised By Me
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
                    }}
                  >
                    <RefreshIcon />
                  </button>
                </Tooltip>
                <ExportButton data={data} type={1} />
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
                                      cell.column.Header == "Amount" ||
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
