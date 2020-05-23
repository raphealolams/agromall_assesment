import React from "react";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Button from "../Button/Button";
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
  shouldDisable,
}) => {
  const styles = {
    multiPreview: {
      maxWidth: "150px",
    },
  };

  const disabled = shouldDisable
    ? shouldDisable
    : category.length > 0 &&
      name.length > 0 &&
      description.length > 0 &&
      address.length > 0;

  return (
    <div>
      <div className="container pt-5">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Market Name</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              onChange={onChangeInput}
              name="name"
              value={name || " "}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Market Category</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              onChange={onChangeInput}
              name="category"
              value={category || " "}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputAddress">Address</label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder=""
              onChange={onChangeInput}
              name="address"
              value={address || " "}
            >
              {address}
            </textarea>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputAddress2">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder=""
              onChange={onChangeInput}
              name="description"
              value={description || " "}
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
                <Image
                  imageSource={url}
                  customImageStyle={styles.multiPreview}
                  imageAlt="...."
                />
              ))}
            </div>
          </div>
        </div>

        <Link to="/admin/home">
          <Button buttonClassName="btn btn-default" buttonTitle="Back" />
        </Link>

        <Button
          buttonClassName="btn btn-primary m-2"
          buttonTitle={buttonTitle}
          onClick={handleClick}
          disabled={!disabled}
        />
      </div>
    </div>
  );
};

export default Form;
