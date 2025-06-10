import moment from "moment";
import { useEffect, useState } from "react";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";

export default function ExportButton(props) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    setSelectedKeys(props.selectedKeys);
    // console.log(props.data);
  }, [props.data, props.type, props.selectedKeys]);

  const columnsDefination = () => {
    let newObj = {};
    if (props.type == 1) {
      selectedKeys.shift(14, 0, "raisedBy");
      //selectedKeys.shift(14, 0, "raisedBy");
    } else if (props.type == 2) {
      selectedKeys.shift(14, 0, "raisedTo");
    } else if (props.type == 3) {
      selectedKeys.shift(15, 0, "raisedTo");
      selectedKeys.shift(14, 0, "raisedBy");
      selectedKeys.shift(14, 0, "updatedAt");
    } else {
    }

    selectedKeys.forEach((data) => {
      newObj[data] = "";
    });
    return newObj;
  };

  const downloadData = () => {
    let arr = [];

    props.data.forEach((obj) => {
      let newObj = {};

      let keys = [...selectedKeys];
      if (props.type == 1) {
        keys.shift(14, 0, "raisedBy");
        //selectedKeys.shift(14, 0, "raisedBy");
      } else if (props.type == 2) {
        keys.shift(14, 0, "raisedTo");
      } else if (props.type == 3) {
        keys.shift(15, 0, "raisedTo");
        keys.shift(14, 0, "raisedBy");
        keys.shift(13, 0, "updatedAt");
      } else {
      }

      keys.forEach((data) => {
        newObj[data] = obj[data];
      });

      if (props.type == 1 || props.type == 2 || props.type == 3) {
        newObj["P&L"] = obj["totalRevenueAmount"] - obj["totalExpenseAmount"];
      }

      arr.push(newObj);
    });

    console.log(arr);
    // console.log(arr);

    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    moment(new Date()).format("DD MM YYYY");
    let name = `${moment(new Date()).format("DD-MM-YYYY")}`;
    // dispatch(setLoader(false));
    writeFile(wb, `${name}.xlsx`);
  };
  return (
    <>
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
          downloadData();
        }}
      >
        <span> Export</span>
      </button>
    </>
  );
}
