import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CloseIcon from "@mui/icons-material/Close";
import { validateYupSchema } from "formik";
import { Tooltip } from "@mui/material";

const CircleConnectors = (props) => {
  const [state, setState] = useState([]);
  const [showApprove, setShowApprove] = useState(false);

  useEffect(() => {
    if (props) {
      // console.log(props);
      let parr = props.props;
      let arr = [];

      parr.forEach((x, i) => {
        let val = { ...x };
        if (x.approvarLevel == props.currentApproval) {
          if (localStorage.getItem("user") != null) {
            let user = JSON.parse(localStorage.getItem("user"));
            if (x.approverUserId == user.userId) {
              setShowApprove(true);
            } else {
              setShowApprove(false);
            }
          }

          val.approvalStatus = props.approvalStatus;
        } else if (x.approvarLevel > props.currentApproval) {
          // console.log(x);
          val["approvalStatus"] = 6;
        } else {
          // console.log(x);
          val["approvalStatus"] = 1;
        }
        arr.push(val);
      });
      // console.log(arr);
      setState(arr);
    }
  }, []);

  return (
    <div className="circle-container w-100">
      {state.length > 0 &&
        state.map((x, i) => {
          return (
            <>
              {x.approvalStatus == 1 && (
                <Tooltip
                  title={
                    <h6 style={{ color: "lightblue" }}>{x.approverName}</h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                  placement="right-start"
                  key={i}
                >
                  <div className="circle-wrap" key={i}>
                    <div className="circle done">
                      <DoneIcon />
                    </div>
                    <div className="initials">{x.approverName[0]}</div>{" "}
                  </div>
                </Tooltip>
              )}

              {x.approvalStatus == 2 && (
                <Tooltip
                  title={
                    <h6 style={{ color: "lightblue" }}>{x.approverName}</h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                  key={i}
                  placement="right-start"
                >
                  <div className="circle-wrap" key={i}>
                    <div className="circle reject">
                      <CloseIcon />
                    </div>
                    <div className="initials">{x.approverName[0]}</div>{" "}
                    {/* Initials below the circle */}
                  </div>
                </Tooltip>
              )}

              {x.approvalStatus == 0 && (
                <Tooltip
                  title={
                    <h6 style={{ color: "lightblue" }}>{x.approverName}</h6>
                  }
                  key={i}
                  sx={{ cursor: "pointer" }}
                  arrow
                  placement="right-start"
                >
                  <div className="circle-wrap" key={i}>
                    <div className="circle pending">
                      <HourglassBottomIcon />
                    </div>
                    <div className="initials">{x.approverName[0]}</div>{" "}
                    {/* Initials below the circle */}
                  </div>
                </Tooltip>
              )}

              {x.approvalStatus == 6 && (
                <Tooltip
                  key={i}
                  title={
                    <h6 style={{ color: "lightblue" }}>{x.approverName}</h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                  placement="right-start"
                >
                  <div className="circle-wrap" key={i}>
                    <div className="circle"></div>
                    <div className="initials">{x.approverName[0]}</div>
                  </div>
                </Tooltip>
              )}
            </>
          );
        })}
      {/* Circle 1 */}

      {/* Circle 4 */}
      {/* <div className="circle-wrap">
        <div className="circle"></div>
        <div className="initials">M</div>
      </div> */}

      {/* Circle 5 (No Connector) */}
      {/* <div className="circle-wrap">
        <div className="circle"></div>
        <div className="initials">J</div>
      </div> */}
    </div>
  );
};

export default CircleConnectors;
