import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { store } from "../../store";

import NavBar from "../Nav/NavBar";
import Card from "../Card/Card";
import Button from "../Button/Button";

const Search = () => {
  const globalState = useContext(store);
  const {
    getMarkets,
    dispatch,
    locationAllowed,
    locationError,
    onChangeInput,
    checkIsAdmin,
    state: { markets, name, category, showLoginButton },
  } = globalState;

  useEffect(() => {
    getMarkets();
    checkIsAdmin();
  }, [getMarkets, checkIsAdmin]);

  const askForLocation = (e) => {
    const geo = navigator.geolocation;
    if (!geo) {
      dispatch({
        type: "change",
        payload: "Geolocation is not supported",
        field: "locationError",
      });
    }
    navigator.geolocation.getCurrentPosition(locationAllowed, locationError);
  };

  return (
    <div>
      {showLoginButton && <Redirect exact to="/admin/home" />}
      <div className="pt-2">
        <NavBar />
      </div>
      <div className="d-flex pt-5 justify-content-center align-items-center">
        <div>
          <input
            type="text"
            name="name"
            placeholder="enter market name"
            className="form-control"
            onChange={onChangeInput}
          />
        </div>
        <div className="m-2">
          <input
            type="text"
            name="category"
            placeholder="enter market category"
            className="form-control"
            onChange={onChangeInput}
          />
        </div>
        <div>
          <Button
            buttonClassName="btn btn-outline-success m-2"
            buttonTitle="Search Market"
            disabled={!(category.length > 0 && name.length > 0)}
            onClick={(e) => askForLocation(e)}
          />
        </div>
      </div>
      <div className="container pt-5">
        {markets && <Card cardData={markets} showEditDeleteButton={false} />}
      </div>
    </div>
  );
};

export default Search;
