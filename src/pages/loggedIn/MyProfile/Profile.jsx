import React, { useEffect, useMemo, useState } from "react";
import "./Profile.css";
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

import moment from "moment/moment";
import avtr_img from "../../../assets/images/avatar.png";

const MyProfile = () => {

    return (
        //     <div className="p-4 content_main_open" id="nav_status">
        //       <div className="content">

        //       <div className="user-card">

        //     <div className="card-cover">
        //       <div className="avatar-wrapper">
        //         <div className="avatar">
        //           <img src="https://cdn.tailkit.com/media/placeholders/avatar-c_GmwfHBDzk-160x160.jpg" alt="User Avatar" className="avatar-img" />
        //         </div>
        //       </div>
        //     </div>

        //     <div className="card-body">
        //       <h3 className="card-name">Antony Jaramillo</h3>
        //       <p className="card-info">Web Developer ∙ 12 Projects</p>
        //     </div>
        //   </div>


        //       </div>
        //     </div>

        <section id="profile" className="w-100 py-3 px-1 content_main_open">
            <div className="container-fluid content">
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="pt-20 rounded-top bgImage">
                        </div>
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 images px-4">
                                <div className="d-flex align-items-center">
                                    <div className="avtar_div avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10" >
                                        <img src={avtr_img} alt="Uploaded preview" />
                                    </div>
                                    <div className="lh-1">
                                        <h2 className="mb-0">
                                            <a className="text-decoration-none" data-bs-toggle="tooltip" data-placement="top" title="" data-original-title="Beginner" href="/pages/profile#!"></a>
                                        </h2>
                                        <p className="m-0 mt-3">
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal-details" type="button" role="tab" aria-controls="personal-details" aria-selected="true">
                                        Personal Information
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="account-tab" data-bs-toggle="tab" data-bs-target="#account-settings" type="button" role="tab" aria-controls="account-settings" aria-selected="false">
                                        Account Settings
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="preferences-tab" data-bs-toggle="tab" data-bs-target="#preferences-customization" type="button" role="tab" aria-controls="preferences-customization" aria-selected="false">
                                        Preferences & Customization
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="activity-tab" data-bs-toggle="tab" data-bs-target="#activity-history" type="button" role="tab" aria-controls="activity-history" aria-selected="false">
                                        Activity & History
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="support-tab" data-bs-toggle="tab" data-bs-target="#support-help" type="button" role="tab" aria-controls="support-help" aria-selected="false">
                                        Support & Help
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="card mt-2 border-0">
                            <div className="card-body">
                                <div id="myTabContent" className="tab-content p-3 bg-white">
                                    {/* personal info tab */}

                                    <div className="tab-pane fade show active" id="personal-details" role="tabpanel" aria-labelledby="personal-tab">
                                        <div className="d-flex align-items-start">
                                            <div className="nav flex-column nav-pills me-3 navs_div" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <button className="nav-link active mb-1 d-flex align-items-center gap-1 " id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                                    <i class="fas fa-user-circle"></i>
                                                    <span className="w-100 ms-1">User Profile</span>
                                                </button>
                                                {/* <button className="nav-link  mb-1 d-flex align-items-center gap-1" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" disabled="">
                                                    <img src="/static/media/training.2ae246debf8b6a7985c63aa372715d2b.svg" />
                                                    <span className="w-100 ms-1">Job Details</span>
                                                </button>
                                                <button className="nav-link  mb-1 d-flex align-items-center gap-1" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" disabled="">
                                                    <img src="/static/media/license_number.075d46d3ee41cdc318d2b7595719cd07.svg" />
                                                    <span className="w-100 ms-1">Other Details</span>
                                                </button> */}
                                            </div>
                                            <div className="tab-content p-3" id="v-pills-tabContent">
                                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                                                    <form className="">
                                                        <div className="row">
                                                            {/* <div className="mb-4 col-6 col-xl-4 form-floating">
                                                                <input placeholder="" name="firstName" type="text" id="firstName" className="form-control" value=" " />
                                                                <div className="image">
                                                                    <i className="fa-solid fa-circle-user"></i>
                                                                </div>
                                                                <div className="invalid-feedback"></div>
                                                                <label for="firstName" className="frst_name">First Name
                                                                    <span className="required-asterisk">*
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-4 form-floating">
                                                                <input placeholder="" type="text" id="middleName" className="form-control" value="" />
                                                                <div className="image">
                                                                    <i className="fa-solid fa-circle-user">
                                                                    </i>
                                                                </div>
                                                                <div className="invalid-feedback">
                                                                </div>
                                                                <label for="middleName">Middle Name</label>
                                                            </div> */}
                                                            <div className="mb-4 col-6 col-xl-4 form-floating">
                                                                <input placeholder="" type="text" id="lastName" className="form-control" value="" />
                                                                <div className="image">
                                                                    <i className="fa-solid fa-circle-user"></i>
                                                                </div>
                                                                <div className="invalid-feedback">
                                                                </div>
                                                                <label for="lastName">Name<span className="required-asterisk">*</span>
                                                                </label>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-4 form-floating">
                                                                <input placeholder="" type="text" id="personalEmail" className="form-control" value="" />
                                                                <div className="image">
                                                                    <i className="fa-solid fa-envelope"></i>
                                                                </div>
                                                                <div className="invalid-feedback"></div>
                                                                <label for="personalEmail">Personal Email<span className="required-asterisk">*</span></label>
                                                            </div>
                                                            <div className="d-flex col-6 col-xl-4 flex-wrap flag_country m85 mb-4">
                                                                <div className="w-100 form-floating">
                                                                    <input placeholder="" disabled="" type="number" id="mobileNo" className="form-control" value="" />
                                                                    <div className="image phn_img">
                                                                        <i className="fa-solid fa-phone"></i>
                                                                    </div>
                                                                    <label for="mobileNo">Contact Number<span className="required-asterisk">*</span></label>
                                                                </div>
                                                                <div className="w-100 invalid-feedback">
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-4 date-wrapper-box position-relative">
                                                                <label className="position-absolute form-label" for="religionId">Designation<span className="required-asterisk">*</span></label>
                                                                <select aria-label="Default select example" className="form-select" id="religionId">
                                                                    <option value="">Select designation</option>
                                                                    <option value="1">Designer</option>
                                                                    <option value="2">Developer</option>
                                                                    <option value="3">Manager</option>
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                </div>
                                                                <div className="image">
                                                                    <i className="fa-solid fa-medal"></i>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-4 date-wrapper-box position-relative">
                                                                <label className="position-absolute form-label" for="qualificationId">Department<span className="required-asterisk">*</span></label>
                                                                <select aria-label="Default select example" className="form-select" id="qualificationId">
                                                                    <option value="">Select department</option>
                                                                    <option value="1">Technical</option>
                                                                    <option value="2">Finance</option>
                                                                    <option value="3">Hospitality</option>
                                                                </select>
                                                                <div className="invalid-feedback"></div>
                                                                <div className="image"> <i className="fa-solid fa-circle-user"></i>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col d-flex align-items-center justify-content-between gap-1">
                                                            <button id="userProfileDraft" type="button" className="upload btn-btn-primary draft me-2 d-flex align-items-center d-none">
                                                                <img src="/static/media/disk.0f15744b318dbcf350243edc30ea4e13.svg" alt="icon" />
                                                                <span className="ps-2">Save as Draft</span>
                                                            </button>
                                                            <button id="userProfileNext" className="upload btn-btn-primary draft next d-flex align-items-center ms-auto" type="submit">
                                                                <span className="pe-2">Next</span>
                                                                <i className="fa-solid fa-angles-right"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    {/* account tab */}
                                    <div className="tab-pane fade" id="account-settings" role="tabpanel" aria-labelledby="account-tab">
                                        <div className="d-flex align-items-start">
                                            {/* Left Vertical Tabs */}
                                            <div className="nav flex-column nav-pills me-3 navs_div" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <button className="nav-link active mb-1 d-flex align-items-center gap-1" id="v-pills-changepwd-tab"
                                                    data-bs-toggle="pill" data-bs-target="#v-pills-changepwd" type="button" role="tab"
                                                    aria-controls="v-pills-changepwd" aria-selected="true">
                                                    <i class="fas fa-key"></i>
                                                    <span className="w-100 ms-1">Change Password</span>
                                                </button>
                                                <button className="nav-link mb-1 d-flex align-items-center gap-1 mt-2" id="v-pills-auth-tab"
                                                    data-bs-toggle="pill" data-bs-target="#v-pills-auth" type="button" role="tab"
                                                    aria-controls="v-pills-auth" aria-selected="false">
                                                    <i class="fas fa-user-shield"></i>
                                                    <span className="w-100 ms-1">Two Factor Authentication</span>
                                                </button>
                                            </div>

                                            {/* Right Content Area */}
                                            <div className="tab-content p-3" id="v-pills-tabContent">
                                                {/* Change Password Content */}
                                                <div className="tab-pane fade show active" id="v-pills-changepwd" role="tabpanel" aria-labelledby="v-pills-changepwd-tab">
                                                    <form>
                                                        <div className="row">
                                                            <div className="mb-4 col-6 col-xl-4 form-floating">
                                                                <input placeholder="" type="password" id="newPassword" className="form-control" />
                                                                <div className="image">
                                                                    <i className="fa-solid fa-lock"></i>
                                                                </div>
                                                                <label htmlFor="newPassword">New Password<span className="required-asterisk">*</span></label>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-4 form-floating">
                                                                <input placeholder="" type="password" id="reEnterPassword" className="form-control" />
                                                                <div className="image">
                                                                    <i className="fa-solid fa-lock"></i>
                                                                </div>
                                                                <label htmlFor="reEnterPassword">Re-enter Password<span className="required-asterisk">*</span></label>
                                                            </div>
                                                        </div>
                                                        <div className="col d-flex align-items-center justify-content-between gap-1">
                                                            <button id="changePwdSubmit" className="upload btn-btn-primary draft next d-flex align-items-center ms-auto" type="submit">
                                                                <span className="pe-2">Change Password</span>
                                                                <i className="fa-solid fa-angles-right"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>

                                                {/* Two Factor Authentication Content */}
                                                <div className="tab-pane fade" id="v-pills-auth" role="tabpanel" aria-labelledby="v-pills-auth-tab">
                                                    <form>
                                                        <div className="row">
                                                            <div className="d-flex align-items-center mb-4">
                                                                <h5 className="mb-0">Two Factor Authentication</h5>
                                                                <div className="form-check form-switch ms-3 mb-0">
                                                                    <input className="form-check-input mt-2" type="checkbox" id="twoFactorToggle" />
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-4">
                                                                <label className="form-label">Choose Verification Method<span className="required-asterisk">*</span></label>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="twoFactorMethod" id="emailOption" value="email" />
                                                                    <label className="form-check-label" htmlFor="emailOption">Email</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="twoFactorMethod" id="smsOption" value="sms" />
                                                                    <label className="form-check-label" htmlFor="smsOption">SMS</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col d-flex align-items-center justify-content-between gap-1">
                                                            <button id="userProfileNext" className="upload btn-btn-primary draft next d-flex align-items-center ms-auto" type="submit">
                                                                <span className="pe-2">Next</span>
                                                                <i className="fa-solid fa-angles-right"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    {/* Preferences & Customization Tab Content */}
                                    <div className="tab-pane fade" id="preferences-customization" role="tabpanel" aria-labelledby="preferences-tab">
                                        <div className="d-flex align-items-start">
                                            {/* Left Vertical Tabs */}
                                            <div className="nav flex-column nav-pills me-3 navs_div" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <button className="nav-link active mb-1 d-flex align-items-center gap-1" id="v-pills-notification-tab"
                                                    data-bs-toggle="pill" data-bs-target="#v-pills-notification" type="button" role="tab"
                                                    aria-controls="v-pills-notification" aria-selected="true">
                                                    <i class="fas fa-envelope-square"></i>
                                                    <span className="w-100 ms-1">Notifications Setting</span>
                                                </button>

                                            </div>

                                            {/* Right Content Area */}
                                            <div className="tab-content p-3" id="v-pills-tabContent">
                                                {/* Change Password Content */}
                                                <div className="tab-pane fade show active" id="v-pills-notification" role="tabpanel" aria-labelledby="v-pills-notification-tab">
                                                    <form>
                                                        <div className="row">
                                                            <div className="mb-4 col-6 col-xl-4">
                                                                <label className="form-label">Choose Notification Method<span className="required-asterisk">*</span></label>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="emailOption" value="email" />
                                                                    <label className="form-check-label" htmlFor="emailOption">Email</label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="smsOption" value="sms" />
                                                                    <label className="form-check-label" htmlFor="smsOption">SMS</label>
                                                                </div>
                                                            </div>

                                                            <div className="col d-flex align-items-center justify-content-between gap-1">
                                                                <button id="notificationSubmit" className="upload btn-btn-primary draft next d-flex align-items-center ms-auto" type="submit">
                                                                    <span className="pe-2">Next</span>
                                                                    <i className="fa-solid fa-angles-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    {/* Activity & History Tab Content */}
                                    <div className="tab-pane fade" id="activity-history" role="tabpanel" aria-labelledby="activity-tab">
                                        <div className="d-flex align-items-start">
                                            {/* Left Vertical Tabs */}
                                            <div className="nav flex-column nav-pills me-3 navs_div" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <button className="nav-link active mb-1 d-flex align-items-center gap-1" id="v-pills-recent_login-tab"
                                                    data-bs-toggle="pill" data-bs-target="#v-pills-recent_login" type="button" role="tab"
                                                    aria-controls="v-pills-recent_login" aria-selected="true">
                                                    <i class="fas fa-sign-in-alt"></i>
                                                    <span className="w-100 ms-1">Recent Logins</span>
                                                </button>
                                                <button className="nav-link mb-1 d-flex align-items-center gap-1 mt-2" id="v-pills-req_appro-tab"
                                                    data-bs-toggle="pill" data-bs-target="#v-pills-req_appro" type="button" role="tab"
                                                    aria-controls="v-pills-req_appro" aria-selected="true">
                                                    <i class="fas fa-thumbs-up"></i>
                                                    <span className="w-100 ms-1">Requests, Approvals & Actions Taken</span>
                                                </button>

                                            </div>

                                            {/* Right Content Area */}
                                            <div className="tab-content p-3" id="v-pills-tabContent">
                                                {/* Change Password Content */}
                                                <div className="tab-pane fade show active" id="v-pills-recent_login" role="tabpanel" aria-labelledby="v-pills-recent_login-tab">
                                                    <form>
                                                        <div className="row">
                                                            <div className="mb-4 col-6 col-xl-6 rec_login_div">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Recent Login Date</h5>
                                                                    <p className="m-0 ms-3">10 Feb 2025</p>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-6 rec_login_div">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Recent Login Time</h5>
                                                                    <p className="m-0 ms-3">11:20AM 00.10.45</p>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-6 rec_login_div">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Recent Login IP</h5>
                                                                    <p className="m-0 ms-3">5678903452</p>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-6 rec_login_div">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Recent Login Type</h5>
                                                                    <p className="m-0 ms-3">Web or App</p>
                                                                </div>
                                                            </div>

                                                            <div className="col d-flex align-items-center justify-content-between gap-1">
                                                                <button id="notificationSubmit" className="upload btn-btn-primary draft next d-flex align-items-center ms-auto" type="submit">
                                                                    <span className="pe-2">Next</span>
                                                                    <i className="fa-solid fa-angles-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                {/* req approve content */}
                                                <div className="tab-pane fade" id="v-pills-req_appro" role="tabpanel" aria-labelledby="v-pills-req_appro-tab">
                                                    <form>
                                                        <div className="row">
                                                            <div className="mb-4 col-6 col-xl-5 rec_login_div d-flex justify-content-center">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Request Date & Time</h5>
                                                                    <p className="m-0 ms-3">10 Feb 2025 11:20AM</p>
                                                                </div>
                                                            </div>
                                                            {/* <div className="mb-4 col-6 col-xl-6 rec_login_div">
                                                               <div className="d-flex">
                                                                <h5 className="m-0">Recent Login Time</h5>
                                                                <p className="m-0 ms-3">11:20AM 00.10.45</p>
                                                               </div>
                                                            </div> */}
                                                            <div className="mb-4 col-6 col-xl-4 rec_login_div d-flex justify-content-center">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Request Type</h5>
                                                                    <p className="m-0 ms-3">xyz</p>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 col-6 col-xl-3 rec_login_div d-flex justify-content-center">
                                                                <div className="d-flex">
                                                                    <h5 className="m-0">Request ID</h5>
                                                                    <p className="m-0 ms-3">1456</p>
                                                                </div>
                                                            </div>

                                                            <div className="col d-flex align-items-center justify-content-between gap-1">
                                                                <button id="notificationSubmit" className="upload btn-btn-primary draft next d-flex align-items-center ms-auto" type="submit">
                                                                    <span className="pe-2">Next</span>
                                                                    <i className="fa-solid fa-angles-right"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Support & Help Tab Content */}
                                    <div className="tab-pane fade" id="support-help" role="tabpanel" aria-labelledby="support-tab">
                                        <form className="">
                                            <div className="row">
                                                <div className="d-flex align-items-end">
                                                    <div className="mb-4 col-6 col-xl-4 date-wrapper-box position-relative">
                                                        <label className="position-absolute form-label" for="supportHelp">
                                                            Support and Help<span className="required-asterisk">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="supportHelp"
                                                            placeholder="Enter details"
                                                        />
                                                        <div className="invalid-feedback"></div>
                                                        <div className="image question">
                                                            <i className="fa-solid fa-circle-question"></i>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4 col-6 col-xl-2 date-wrapper-box">
                                                    <button type="submit" className="btn ms-3 sub_bt">Submit</button>

                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>



                                </div>
                                <button type="button" className="upload btn-btn-primary draft mt-2 m-auto d-fle d-block ms-auto me-0 align-items-center justify-content-center mt-3" disabled="">Save As Draft</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default MyProfile;
