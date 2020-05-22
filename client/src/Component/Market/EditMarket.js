import React, { useContext, useEffect } from "react";

import Form from "../Form/Form";
import NavBar from "../Nav/NavBar";

const EditMarket = () => {
  const uploadFiles = (e) => {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  };
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Form uploadFiles={uploadFiles} />
      </div>
    </div>
  );
};

export default EditMarket;
