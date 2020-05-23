import React, { useContext, useEffect } from "react";

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
    },
  } = globalState;

  useEffect(() => {
    checkIsAdmin();
  }, []);

  return (
    <div>
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
        />
      </div>
    </div>
  );
};

export default AddMarket;
