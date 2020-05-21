import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";

import { store } from "../store";

const DashBoard = () => {
  const globalState = useContext(store);
  const { getUserProfile } = globalState;

  useEffect(() => {
    getUserProfile();
  });
  const styles = {
    container: {
      minHeight: "90vh",
    },
  };

  return <div></div>;
};

export default DashBoard;
