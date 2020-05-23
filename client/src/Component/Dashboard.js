import React, { useContext, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";

import { store } from "../store";

import NavBar from "./Nav/NavBar";
import Card from "./Card/Card";
import { toast } from "react-toastify";

const DashBoard = () => {
  const globalState = useContext(store);
  const {
    handleDelete,
    getUserProfile,
    getMarkets,
    checkIsAdmin,
    doLogout,
    state: { markets, isMarketDeleted, showLoginButton },
  } = globalState;

  useEffect(() => {
    getUserProfile();
    getMarkets();
    checkIsAdmin();
  }, [getUserProfile, getMarkets, checkIsAdmin]);

  const deleteDialog = (id) => {
    confirmAlert({
      title: "Delete this record ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes Delete!",
          onClick: () => {
            handleDelete(id);
          },
        },
        {
          label: "No cancel delete!",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div>
      {isMarketDeleted &&
        toast.success("market deleted", {
          position: toast.POSITION.TOP_RIGHT,
        })}
      <div className="pt-2">
        <NavBar showLoginButton={showLoginButton} onClick={doLogout} />
      </div>
      <div className="container pt-5">
        {markets && <Card cardData={markets} onClick={deleteDialog} />}
      </div>
    </div>
  );
};

export default DashBoard;
