import React from "react";

import Image from "../Image/Image";
const Form = ({
  uploadFiles,
  onChangeInput,
  fileArray,
  buttonTitle,
  name,
  category,
  description,
  address,
  handleClick,
}) => {
  console.log(handleClick);
  const styles = {
    multiPreview: {
      maxWidth: "150px",
    },
  };
  return (
    <div>
      <div className="container pt-5">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Market Name</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              onChange={onChangeInput}
              name="name"
              value={name}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Market Category</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              onChange={onChangeInput}
              name="category"
              value={category}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputAddress">Address</label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder=""
              onChange={onChangeInput}
              name="address"
              value={address}
            >
              {address}
            </textarea>
          </div>
          <div className="form-group col-md-6">
            <label for="inputAddress2">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder=""
              onChange={onChangeInput}
              name="description"
              value={description}
            >
              {description}
            </textarea>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="file"
              className="form-control"
              onChange={uploadFiles}
              multiple
              name="file"
            />
          </div>
          <div className="form-group col-md-6">
            <div className="d-flex justify-content-around">
              {(fileArray || []).map((url) => (
                // <img style={styles.multiPreview} src={url} alt="..." />
                <Image
                  imageSource={url}
                  customImageStyle={styles.multiPreview}
                  imageAlt="...."
                />
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default Form;
