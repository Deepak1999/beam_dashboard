import logo from './logo.svg';
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
// import { StylesProvider } from '@material-ui/core/styles';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import "rsuite/dist/rsuite.min.css";
import 'bootstrap/dist/js/bootstrap.js'
import './index.css';


import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from "react-toastify";
import Header2 from "./layout/Header/header";
import Sidebar2 from './layout/Sidebar/Sidebar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setisLoginUser, setSidebarOpen, setTabIndex, setUserData } from './redux/features/authSliceandSidebar';
import { useDispatch, useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeaderAndSidebar from './layout/HeaderAndSidebar/HeaderAndSidebar';
import Loader from './layout/Loader/Loader';
import Loading from './layout/Loader/Loading';
<script src='./Nav.js'></script>

// import '../src/pages/loggedInUser/main.css'

const LazyRoutes = React.lazy(
  () => import('./pages/login')
)


const Routes = LazyRoutes;

export var common_axios = axios.create({
  // // // baseURL: "http://192.168.167.66:5001/",
  // baseURL: `https://beamapi.altruistindia.com/`

  // baseURL: `https://beamapi.altruistindia.com/`

  // baseURL: `${process.env.REACT_APP_COMMON_API_live_local}/`,
  // baseURL: `http://localhost:8085/`,
  // baseURL: `http://localhost:8089/`,
  baseURL: `http://192.168.167.5:8050/`,

  // baseURL: `${process.env.REACT_APP_COMMON_API_STAGING_LIVE}/`
});

function App() {


  const token1 = localStorage.getItem("token");
  const uid = localStorage.getItem("userId");
  // const [open, setOpen] = useState(false);

  if (token1 != null) {
    common_axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
    common_axios.defaults.headers.common["source"] = "web";
    common_axios.defaults.headers.common["userId"] = uid;
  }
  else {
    common_axios.defaults.headers.common["Authorization"] = null;
    common_axios.defaults.headers.common["userId"] = null
  }


  // common_axios.defaults.headers.common["jwtToken"] = token1;
  // common_axios.defaults.headers["source"] = '1'
  // common_axios.defaults.headers["appVersion"] = '0'

  const [token, setToken] = useState(null);

  var y = useSelector(
    (state) => state.authSliceandSidebar.isLogin
  );

  const [isLogin, setIsLogin] = useState(false);



  const history = useHistory();

  const dispatch = useDispatch();





  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'))
      dispatch(setisLoginUser(true))
      setIsLogin(true)

      let user = JSON.parse(localStorage.getItem('user'))
      dispatch(setUserData(user))

      console.log(history.location.pathname)

      if (history.location?.pathname == "/") {
        history.push('/navstatus')
      }
      else {
        history.push(`${history.location.pathname}`)
      }

    }
    else {
      dispatch(setisLoginUser(false))
      console.log(history)

      if (history.location.pathname != "/") {
        history.push('/')
      }
      setIsLogin(false)


    }
  }, [])




  useEffect(() => {
    if (y) {
      common_axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
      common_axios.defaults.headers.common["source"] = "web";
      common_axios.defaults.headers.common["userId"] = localStorage.getItem('userId');
    }

    console.log(y)
  }, [y])




  common_axios.interceptors.response.use(
    async (config) => {
      if (!config) {
        localStorage.clear();
        if (!toast.isActive('sdfsdfsdfsdfsdfsd')) {
          toast.error("Session Expired")
        }
        history.push('/')
        dispatch(setSidebarOpen(false))
        dispatch(setisLoginUser(false))
        dispatch(setTabIndex(""))
        window.location.reload(true)
        return config
      }


      if (config && config.data.statusDescription.statusCode == 403 || config.data.statusDescription.statusCode == 401) {
        if (!toast.isActive('sdfsdfsdfsdfsdfsd')) {
          toast.error(config.data.statusDescription.description, {
            toastId: "sdfsdfsdfsdfsdfsd", // Ensures this toast doesn't appear multiple times
          })
        }
        history.push('/')
        localStorage.clear();
        dispatch(setSidebarOpen(false))
        window.location.reload(true)
        dispatch(setTabIndex(""))

      }

      return config
    },
    error => {
      // console.log(error)
      Promise.reject(error)

    }
  )


  return (
    <>
      <Suspense fallback={<></>}>
        <HeaderAndSidebar />
      </Suspense>

      <Loader />
      <Suspense fallback={<Loading />} >
        <Routes />
      </Suspense>
      <ToastContainer draggable autoClose={1500} />

    </>



  );
}

export default App;
