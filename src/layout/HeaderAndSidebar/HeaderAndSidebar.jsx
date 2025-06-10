import { useEffect, useState } from "react";
import { setisLoginUser } from "../../redux/features/authSliceandSidebar";
import { useDispatch, useSelector } from "react-redux";
import Header2 from "../Header/header";
import Sidebar2 from "../Sidebar/Sidebar";

export default function HeaderAndSidebar() {
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
      {isLogin2 && <Header2 />}

      {isLogin2 && <Sidebar2 />}
    </>
  );
}
