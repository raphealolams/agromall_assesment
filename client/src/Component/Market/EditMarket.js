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
    state: { market, marketPictures, name, description, category, address },
  } = globalState;
  useEffect(() => {
    getMarket(id);
  }, []);
  console.log({ market, marketPictures });
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Form
          uploadFiles={uploadFiles}
          fileArray={
            marketPictures.length > 0 ? marketPictures : market.pictures
          }
          buttonTitle="Save Changes"
          name={name.length > 0 ? name : market.name}
          description={
            description.length > 0 ? description : market.description
          }
          category={category.length > 0 ? category : market.category}
          address={address.length > 0 ? address : market.address}
          handleClick={updateMarket}
        />
      </div>
    </div>
  );
};

export default EditMarket;
