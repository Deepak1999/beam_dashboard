import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import NoDataFound from "./NoDataFound";
import moment from "moment/moment";
import SkeletonComp from "./SkeletonComp";
import "../Components/DataTablePage.css";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import { DownloadFile } from "../services/expenseService";
import { useSelector } from "react-redux";
// ExportButton
// NoDataFound

const TablewithoutPagination = ({
  Apiurl,
  title,
  request1,
  respObj,
  handleResponse,
  columns1,
  parentData,
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
    pageSize: parentData?.length ? parentData?.length : 39,
  });
  const [data, setData] = useState([]);
  const [uploadId1, setUploadId1] = useState(0);

  const [modifyShow, setModifyShow] = useState(false);

  const [request, setRequest] = useState(request1);
  const [hideSkeleton, setHideSkeleton] = useState(false);

  const columns = useMemo(() => {
    let baseColumns = columns1;

    return baseColumns;
  }, [data, TableStatus, columns1]);

  useEffect(() => {
    setData([]);
    if (parentData) {
      setData([]);
      // console.log(parentData);
      setData(parentData);
    }
  }, [request1, columns1, Apiurl, parentData, TableStatus, manualHit]);

  const tableData = useMemo(() => data, [data]);
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data: data,
        manualPagination: true, // Explicitly disable internal pagination
        autoResetPage: false,
      },
      useSortBy,
      usePagination
    );

  const uploadSelector = useSelector(
    (state) => state.authSliceandSidebar.uploadId
  );

  useEffect(() => {
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
          <div
            className="d-flex  ms-auto me-0"
            style={{ justifyContent: "flex-end !important" }}
          >
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
            {data?.length > 0 ? (
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
                            className="fixed-column"
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
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="fixed-column"
                            >
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
      </div>
    </div>
  );
};

export default TablewithoutPagination;
