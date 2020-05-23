import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { store } from "../../store";

import Form from "../Form/Form";
import NavBar from "../Nav/NavBar";
const AddMarket = () => {
  const globalState = useContext(store);
  const {
    uploadFiles,
    addMarket,
    doLogout,
    onChangeInput,
    checkIsAdmin,
state: {
      marketPictures,
      name,
      description,
      category,
      address,
      showLoginButton,
      isMarketAddedError,
  isMarketAdded,
 showSpinner,
    },
  } = globalState;

  useEffect(() => {
    checkIsAdmin();
  }, []);

  return (
    <div>
      {isMarketAddedError &&
        toast.error("Error Adding Market", {
          position: toast.POSITION.TOP_RIGHT,
        })}

      {isMarketAdded &&
        toast.success("Market Added", {
          position: toast.POSITION.TOP_RIGHT,
        })}
      <div>
        <NavBar showLoginButton={showLoginButton} onClick={doLogout} />
      </div>
      <div>
        <Form
          uploadFiles={uploadFiles}
          onChangeInput={onChangeInput}
          fileArray={marketPictures}
          buttonTitle="Save New Market"
          name={name}
          description={description}
          category={category}
          address={address}
          handleClick={addMarket}
          showSpinner={showSpinner}
        />
      </div>
    </div>
  );
};

export default AddMarket;
