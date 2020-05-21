import React, { useContext, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

import { store } from "../store";

import NavBar from "./Nav/NavBar";
import Card from "./Card/Card";

const DashBoard = () => {
  const globalState = useContext(store);
  const {
    getUserProfile,
    getMarkets,
    state: { markets },
  } = globalState;

  useEffect(() => {
    getUserProfile();
    getMarkets();
  }, []);

  return (
    <div>
      <div className="pt-2">
        <NavBar />
      </div>
      <div className="container pt-5">
        <Card cardData={markets} />
      </div>
    </div>
  );
};

export default DashBoard;
