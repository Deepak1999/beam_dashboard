import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setisLoginUser } from "../redux/features/authSliceandSidebar";
import Report from "../pages/loggedIn/Report/Report";
const LazyCreate = React.lazy(() =>
  import("../pages/loggedIn/Create/CreateExpense")
);

const LazyTabs = React.lazy(() => import("../pages/loggedIn/NavStatus/Nav"));
const LazyLogin = React.lazy(() => import("../pages/login/Login"));
const LazyDashboard = React.lazy(() =>
  import("../pages/loggedIn/Dashboard/Dashboard")
);
const Lazyapproval = React.lazy(() =>
  import("../pages/loggedIn/ApprovalPage/Approval")
);
const LazyProfile = React.lazy(() =>
  import("../pages/loggedIn/MyProfile/Profile")
);
const LazyForget = React.lazy(() =>
  import("../pages/login/forgetPassword/ForgetPassword")
);
export default function RouteFunction() {
  const [isLogin2, setisLogin2] = useState(false);
  const isLogin1 = useSelector((state) => state.authSliceandSidebar.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin1) {
      setisLogin2(true);
    } else if (localStorage.getItem("token") != null) {
      setisLogin2(true);
      dispatch(setisLoginUser(true));
    } else {
      setisLogin2(false);
      dispatch(setisLoginUser(false));
    }
  }, [isLogin1]);

  return (
    <>
      <>
        {isLogin1 ? (
          <Switch>
            <Route path="/dashboard" exact component={LazyDashboard} />
            <Route path="/createexpense" exact component={LazyCreate} />
            <Route path="/createactual" exact component={LazyCreate} />
            <Route path="/navstatus" exact component={LazyTabs} />
            <Route path="/approvalpage/:id" exact component={Lazyapproval} />
            <Route path="/myprofile" exact component={LazyProfile} />
            <Route path="/report" exact component={Report} />

            {/* {localStorage.getItem("user") && (
              <Route path="**" exact component={LazyTabs} />
            )} */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={LazyLogin} />
            <Route path="/forgotpassword" exact component={LazyForget} />
            <Route path="**" exact component={LazyLogin} />
          </Switch>
        )}
      </>
    </>
  );
}
