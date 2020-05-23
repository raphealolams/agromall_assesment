import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { store } from "../../store";

import Button from "../Button/Button";
import NavBar from "../Nav/NavBar";
import Slider from "../Slider/Slider";

const styles = {
  customHeight: { height: "300px" },
};
const ViewMarket = () => {
  let { id } = useParams();
  const globalState = useContext(store);
  const {
    getMarket,
    handleDelete,
    checkIsAdmin,
    doLogout,
    state: {
      market,
      isMarketDeletedError,
      isMarketDeleted,
      showEditDeleteButton,
      showLoginButton,
    },
  } = globalState;

  useEffect(() => {
    getMarket(id);
    checkIsAdmin();
  }, []);

  const deleteDialog = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete this record ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes Delete!",
          onClick: () => {
            handleDelete();
          },
        },
        {
          label: "No cancel delete!",
          onClick: () => {},
        },
      ],
    });
  };
  console.log(showLoginButton);
  return (
    <div>
      {isMarketDeletedError &&
        toast.error("Error Deleting Market", {
          position: toast.POSITION.TOP_RIGHT,
        })}

      {isMarketDeleted && <Redirect exact to="/admin/home" />}
      <div className="pt-2">
        <NavBar showLoginButton={showLoginButton} onClick={doLogout} />
      </div>
      <div className="container pt-5">
        <div className="container">
          {market && (
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2">
                <div className="col mb-4">
                  {market.pictures && (
                    <Slider
                      pictures={market.pictures}
                      customImageStyle={styles.customHeight}
                    />
                  )}
                </div>
                <div className="col mb-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title text-muted">
                        <b>Name: {market.name}</b>
                      </p>
                      <p className="card-title text-muted">
                        <b>Category: {market.category}</b>
                      </p>
                      <p className="card-text text-muted">
                        <b>Description: {market.description}</b>
                      </p>
                    </div>
                    <div className="card-footer">
                      {showEditDeleteButton && (
                        <Link to={`/admin/edit/${market.id}`}>
                          <Button
                            buttonClassName="btn btn-outline-primary m-2"
                            buttonTitle="Edit"
                          />
                        </Link>
                      )}
                      {showEditDeleteButton && (
                        <Button
                          buttonClassName="btn btn-outline-danger m-2"
                          buttonTitle="Delete"
                          onClick={deleteDialog}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={
                      market.coordinate &&
                      `${process.env.REACT_APP_API_GOOGLE_URL}?key=${process.env.REACT_APP_API_GOOGLE_KEY}&q=${market.coordinate.latitude},${market.coordinate.longitude}`
                    }
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMarket;
