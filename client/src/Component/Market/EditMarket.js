import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";

import { store } from "../../store";

import Form from "../Form/Form";
import NavBar from "../Nav/NavBar";

const EditMarket = () => {
  let { id } = useParams();
  const globalState = useContext(store);
  const {
    uploadFiles,
    getMarket,
    updateMarket,
    doLogout,
    onChangeInput,
    checkIsAdmin,
    state: {
      market,
      marketPictures,
      name,
      description,
      category,
      address,
      showLoginButton,
    },
  } = globalState;
  useEffect(() => {
    getMarket(id);
    checkIsAdmin();
  }, []);

  return (
    <div>
      <div>
        <NavBar showLoginButton={showLoginButton} onClick={doLogout} />
      </div>
      <div>
        {market && (
          <Form
            uploadFiles={uploadFiles}
            onChangeInput={onChangeInput}
            fileArray={
              marketPictures.length > 0 ? marketPictures : market.pictures
            }
            buttonTitle="Save Changes"
            name={name.length > 0 ? name : market.name}
            category={category.length > 0 ? category : market.category}
            description={
              description.length > 0 ? description : market.description
            }
            address={address.length > 0 ? address : market.address}
            handleClick={updateMarket}
            shouldDisable={true}
          />
        )}
      </div>
    </div>
  );
};

export default EditMarket;
