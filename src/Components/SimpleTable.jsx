import { InputAdornment, Tooltip } from "@mui/material";
import { useMemo } from "react";

import InfoIcon from "@mui/icons-material/Info";
import { usePagination, useSortBy, useTable } from "react-table";
export default function SimpleTable(props) {
  let { data } = props;

  const columns = useMemo(() => {
    let colum = props.columns;
    return colum;
  });
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <div
        className=" small_1 table-responsive"
        style={{ marginTop: "2%", maxHeight: "288px" }}
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column?.Header == "status"
                        ? "widht_class"
                        : "text-center width_2 update_th_sp "
                    }
                    // colSpan={columnIndex  === 9 ? 4 : 1}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "↑" : "↓") : ""}
                    </span>
                    {column.Header == "Camp Type" ? (
                      <>
                        <InputAdornment position="end" className="my-auto">
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
                        className={` ${
                          cell.column.Header == "Activity" &&
                          "widht_class  text-left update_td"
                        }  ${
                          cell.column.Header == "Type" && "text-capitalize"
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
    </>
  );
}
