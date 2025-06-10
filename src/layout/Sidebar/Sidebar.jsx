// import "./Sidebar2.css";
import "../../assets/css/create_form.css";
import React, { useEffect, useState } from "react";
import budget_logo from "../../assets/images/beam logo_white.png";
import "./Sidebar.css";
import IconButton from "@mui/material/IconButton";
import beamDocument from "../../assets/BEAM_Budgeting_Portal_User_Manual_Guide.pdf";
import {
  setMenuButton,
  setSidebarOpen,
} from "../../redux/features/authSliceandSidebar";
import {
  Router,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
export default function Sidebar2() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [menuButton, setMenuButton1] = React.useState(false);

  const [user, setUser] = useState(null);

  const [roleId, setRoleId] = React.useState(0);

  const [menuArray, setMenuArray] = React.useState([]);
  const [myRoute, setmyRoute] = React.useState("");
  const location = useLocation();

  const [currRoute, setCurrRoute] = useState();
  const history = useHistory();
  React.useEffect(() => {
    console.log(location);

    setCurrRoute(location.pathname);
  }, [location.pathname]);

  React.useEffect(() => {
    if (localStorage.getItem("roleId") != null) {
      setRoleId(localStorage.getItem("roleId"));
      // sideBarHandle();
    }
    if (localStorage.getItem("user") != null) {
      setMenuArray(JSON.parse(localStorage.getItem("user"))?.role?.roleMenu);
    }
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });

  const [isSideBaropen, setIsSidebaropen] = useState(false);
  const params = useParams();

  const isLogin = useSelector((state) => state.authSliceandSidebar.isLogin);

  const y = useSelector((state) => state.authSliceandSidebar.sideBarOpen);

  useEffect(() => {
    if (y) {
      setIsSidebaropen(true);
    } else {
      setIsSidebaropen(false);
    }
  }, [y]);

  // const  router  =  useRouter() ;

  React.useEffect(() => {
    if (isLogin) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [isLogin]);

  const navigate = (route) => {
    setCurrRoute(route);
    history.push(`${route}`);
  };

  return (
    <>
      {/* <div className={showSidebar ? "area" : "d-none"}></div> */}
      {showSidebar && (
        <section id="sidebar_menu" className={isSideBaropen ? "open" : ""}>
          <div className="main">
            <div
              className={isSideBaropen ? "pt-3 logo logo_open" : "logo_closed"}
            >
              <img src={budget_logo} alt="logo" className="d-block m-auto" />
            </div>
            <div className="wrapper">
              {menuArray?.length > 0 &&
                menuArray?.map((obj, i) => {
                  return (
                    <>
                      <div key={i}>
                        <Tooltip
                          title={
                            <h6 style={{ color: "lightblue" }}>
                              {obj.menuMaster?.menuName}
                            </h6>
                          }
                          sx={{ cursor: "pointer" }}
                          arrow
                          placement="right-start"
                          key={i}
                        >
                          <div
                            className={`dashboard d-flex align-items-center py-2  ${
                              currRoute == obj.menuMaster.route ? "active" : ""
                            }  `}
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              if (obj.menuMaster?.route.includes("document")) {
                                let a = document.createElement("a");
                                a.href = beamDocument;
                                a.target = "_blank";
                                a.click();
                              } else {
                                navigate(obj.menuMaster?.route);
                              }
                            }}
                          >
                            <i
                              className={
                                obj?.menuMaster?.menuIcon
                                  ? obj?.menuMaster?.menuIcon
                                  : "fas fa-id-card"
                              }
                            ></i>
                            <span
                              className="ms-3"
                              onClick={(e) => {
                                // history.push();
                                navigate(obj.menuMaster?.route);
                              }}
                            >
                              {obj.menuMaster?.menuName}
                            </span>
                          </div>
                        </Tooltip>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
