import { useFormik } from "formik";
import { useEffect, useState } from "react";
import React, { useRef } from "react";

import "../../pages/login/login.css";
import { common_axios } from "../../App";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { TextField, InputAdornment } from "@mui/material";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { TextField, IconButton, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { generateApi, logout } from "../../services/authService";
import {
  setisLoginUser,
  setSidebarOpen,
  setTabIndex,
  setUserData,
} from "../../redux/features/authSliceandSidebar";
import { Link } from "react-router-dom/cjs/react-router-dom";
import setData from "../../utils/DatapassService";
import logo_img from "../../assets/images/logo_altruist.png";

export default function Header2() {
  const history = useHistory();

  const [isSideBarOpen, setisSideBarOpen] = useState(false);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  var y = useSelector((state) => state.authSliceandSidebar.sideBarOpen);

  useEffect(() => {
    if (y) {
      setisSideBarOpen(true);
    } else {
    }
  }, [y]);

  const sidebarHandle = () => {
    if (y) {
      dispatch(setSidebarOpen(false));
    } else {
      dispatch(setSidebarOpen(true));
    }
  };

  const logout1 = async () => {
    let formdata = {
      userId: localStorage.getItem("userId"),
    };
    await logout(formdata).then((res) => {
      if (res) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          document.getElementById("lofout-close")?.click();
          history.push("/");
          localStorage.clear();
          dispatch(setUserData(null));
          dispatch(setisLoginUser(false));
        }
      }
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <section id="header">
        <nav className="navbar-classNameNameic navbar navbar-expand-lg navbar navbar-expand navbar-light container-fluid">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div
                id="hamburger"
                className="hamburger lh-1 me-2"
                onClick={(e) => {
                  sidebarHandle();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="#2a3a44"
                  stroke="#2a3a44"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              <div className="ms-lg-3 d-none d-md-none d-lg-block"></div>
            </div>
            <div className="d-flex align-items-center">
              <p className="beam_fullname">
                BEAM-Budgeting &amp; Estimates For Annual Metrics
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="welcome_name me-3">
                {" "}
                Welcome , {JSON.parse(localStorage.getItem("user"))?.fullName}
              </span>
              {/* <div>
                <div className="notification d-flex align-items-center justify-content-center"></div>
              </div> */}
              <div>
                {/* <div className="avatar avatar-md avatar-indicators avatar-online ms-2 position-relative"></div>
                <div className="box position-absolute">
                  <div className="name">
                    <h6 className="mb-1">John E. Grainger</h6>
                    <a href="#" className="text-decoration-none">
                      View my profile
                    </a>
                  </div>
                  <ul className="m-0">
                    <li className="d-flex align-items-center">
                      <a href="#" className="lh-1"></a>
                      <span className="ms-2">Edit Profile</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <a href="#" className="lh-1"></a>
                      <span className="ms-2">Activity Log</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <a href="#" className="lh-1"></a>
                      <span className="ms-2">Go Pro</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <a href="#" className="lh-1"></a>
                      <span className="ms-2">Account Settings</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <a href="#" className="lh-1"></a>
                      <span className="ms-2">Sign out</span>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="logout-dropdown" ref={dropdownRef}>
                <i
                  className="fas fa-power-off power-icon"
                  onClick={() => setIsOpen((prev) => !prev)}
                ></i>
                {isOpen && (
                  <div className="dropdown-menu logout_menu">
                    {/* <p>
                      <i className="fas fa-user"></i> My Profile
                    </p> */}
                    <p
                      onClick={() => {
                        dispatch(setTabIndex(""));
                        document.getElementById("open_modal")?.click();
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </section>

      <button
        type="button"
        id="open_modal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Logout Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="lofout-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to logout ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  logout1();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
