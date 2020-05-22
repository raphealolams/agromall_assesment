import React, { useContext, useEffect } from "react";

const Form = ({ uploadFiles }) => {
  return (
    <div>
      <div className="container pt-5">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Market Name</label>
              <input type="text" className="form-control" id="inputEmail4" />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Market Category</label>
              <input type="text" className="form-control" id="inputPassword4" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputAddress">Address</label>
              <textarea
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              ></textarea>
            </div>
            <div className="form-group col-md-6">
              <label for="inputAddress2">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              ></textarea>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-group multi-preview">
                {/* {(this.fileArray || []).map((url) => (
                  <img src={url} alt="..." />
                ))} */}
              </div>

              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={uploadFiles}
                  multiple
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Market
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
