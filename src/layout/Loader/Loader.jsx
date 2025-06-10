import React, { useEffect, useState } from "react";
import "./Loader.css";
import { useSelector } from "react-redux";

const Loader = ({ show }) => {
  const loader = useSelector((state) => state.authSliceandSidebar.loader);

  if (!loader) return null; // Do not render if show is false

  return (
    loader && (
      <div className="overlay">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
