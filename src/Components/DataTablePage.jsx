import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { Tooltip, Pagination, Stack, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import NoDataFound from "./NoDataFound";
import moment from "moment/moment";
import ExportButton from "./ExportButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { common_axios } from "../App";
import SkeletonComp from "./SkeletonComp";
import "../Components/DataTablePage.css";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import { DownloadFile } from "../services/expenseService";
import { useSelector } from "react-redux";
// ExportButton
// NoDataFound

const DataTable = ({
  Apiurl,
  title,
  request1,
  respObj,
  handleResponse,
  columns1,
  parentData,
  paginationShow,
  titleHide,
  content,
  tableId,
  manualHit,
  showModify,
  uploadId,
  handleModify = () => {},
}) => {
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: parentData?.length ? parentData?.length : 10,
  });
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [paginationPage, setPaginationPage] = useState(0);
  const [uploadId1, setUploadId1] = useState(0);

  const [modifyShow, setModifyShow] = useState(false);

  const [request, setRequest] = useState(request1);
  const [pageSize, setPageSize] = useState(false);

  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const getFieldHandle = (name) => {
    return name ? name : "N/A";
  };

  const columns = useMemo(() => {
    let baseColumns = columns1;

    return baseColumns;
  }, [data, TableStatus, columns1]);

  const viewDetail = (data) => {
    // console.log(data);
  };

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data: data,
      },
      useSortBy,
      usePagination
    );

  const handlePageChange = (event, value) => {
    setPaginationPage(value);
    fetchData(value);
  };

  const uploadSelector = useSelector(
    (state) => state.authSliceandSidebar.uploadId
  );

  useEffect(() => {
    setData([]);
    if (parentData) {
      setData([]);
      console.log(parentData);
      setData(parentData);
    } else {
      fetchData();
    }
  }, [request1, columns1, Apiurl, parentData, TableStatus, manualHit]);

  useEffect(() => {
    // if (uploadId) {
    //   console.log(uploadId);
    //   setUploadId1(uploadId);
    // }

    if (uploadSelector) {
      setUploadId1(uploadSelector);
    }
    if (showModify) {
      setModifyShow(true);
      console.log("sdfsdgvf");
    } else {
      setModifyShow(false);
    }
  }, [uploadId, showModify, uploadSelector]);

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

  const fetchData = async () => {
    setHideSkeleton(true);
    let res = await common_axios.post(Apiurl, request);

    if (res?.data?.statusDescription?.statusCode == 200) {
      setHideSkeleton(false);

      if (content) {
        setData(res.data[respObj][content]);
        setPaginationPage(res.data[respObj].number + 1);
        setTotalCount(res.data[respObj].totalElements);
        setTotalPages(res.data[respObj].totalPages);
      } else {
        setData(res.data[respObj]);
      }

      // console.log(res.data);
    } else {
      setHideSkeleton(false);
    }

    // .then((res) => {

    // })
    // .catch((err) => {});
  };

  const downloadData = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    moment(new Date()).format("DD MM YYYY");
    let name = `${moment(new Date()).format("DD-MM-YYYY")}`;
    // dispatch(setLoader(false));
    writeFile(wb, `${name}.xlsx`);
  };

  const downloadfile = async () => {
    let formdata = {
      uploadId: uploadId1,
    };

    console.log(formdata);

    const anchor = document.createElement("a");
    anchor.href =
      "https://beamapi.altruistindia.com/business/v1/download/uploaded-file/" +
      uploadId1;
    anchor.download = "Download.xlsx";
    // Suggested filename for download
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="card shadow-none border bg_white create_expense_card">
      {!titleHide && (
        <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 create_form_span ">
          <i className="fas fa-plus-circle mx-1"></i>&nbsp;{title}
        </span>
      )}
      <div className="card-body">
        <div className="d-flex justify-content-between">
          {paginationShow && (
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
          )}

          <div
            className="d-flex  ms-auto me-0"
            style={{ justifyContent: "flex-end !important" }}
          >
            {paginationShow && (
              <Tooltip title="Refresh">
                <button
                  type="submit"
                  style={{ marginRight: "20px" }}
                  className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                  onClick={() => {
                    // clearTable();
                  }}
                >
                  <RefreshIcon />
                </button>
              </Tooltip>
            )}

            {modifyShow && (
              <span className="file_excel me-4  mt-1">
                <a
                  href="https://beamapi.altruistindia.com/business/v1/download/sample-file/Income_and_Expenses_Template.xlsx"
                  className="cursor-pointer"
                  title="Download sample excel file"
                  style={{ color: "green" }}
                >
                  <i class="fas fa-file-excel"></i>
                </a>
              </span>
            )}
            {modifyShow && (
              <button
                className="btn btn-primary"
                style={{
                  fontSize: "11px",
                  marginRight: "20px",
                  height: "28px",
                  marginTop: "4%",
                }}
                onClick={(e) => {
                  handleModify(e);
                }}
              >
                Modify
              </button>
            )}

            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontSize: "11px",
                marginRight: "20px",
                height: "28px",
                marginTop: "4%",
              }}
              onClick={() => {
                if (tableId === "create_expense") {
                  downloadfile();
                } else {
                  downloadData();
                }
              }}
            >
              <span> Export</span>
            </button>
          </div>
        </div>

        {hideSkeleton ? (
          <SkeletonComp count={10} />
        ) : (
          <>
            {data?.length > 0 && totalCount > 0 ? (
              <div
                className="table-responsive"
                id={tableId}
                style={{ marginTop: "2%" }}
              >
                <table
                  {...getTableProps()}
                  className="table table-striped table-bordered"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}{" "}
                            {column.isSorted
                              ? column.isSortedDesc
                                ? "↑"
                                : "↓"
                              : ""}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}

                          // className={` ${
                          //   cell.column.Header == "Activity" &&
                          //   "widht_class  text-left update_td"
                          // }  ${
                          //   cell.column.Header == "Type" &&
                          //   "text-capitalize"
                          // }  `}
                        >
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
          </>
        )}

        {paginationShow && (
          <div className="d-flex justify-content-between mt-3">
            <div>
              Page:{" "}
              <strong>
                {paginationPage} of {totalPages}
              </strong>
            </div>
            <div className="prev_next d-flex align-items-center">
              <Stack spacing={2}>
                <Pagination
                  onChange={(e, value) => {
                    handlePageChange(e);
                    changeTableData(1, value);
                  }}
                  page={paginationPage}
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
