import React from "react";
import { Link } from "react-router-dom";

import Image from "../Image/Image";
import Button from "../Button/Button";

const Card = ({ cardData, onClick }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3">
      {cardData.map((data) => {
        return (
          <div className="col mb-4" key={data.id}>
            <div className="card">
              <Image
                divClassName=""
                imageSource={data.pictures[0]}
                imageClassName=""
                imageAlt="market icon"
                customImageStyle={{ width: "100%", height: "250px" }}
              />

              <div className="card-body">
                <p className="card-title text-muted">
                  <b>Name:</b> {data.name}
                </p>
                <p className="card-text text-muted">
                  <b>Description:</b> {data.description.slice(0, 100)}
                </p>
              </div>
              <div className="card-footer">
                <Link to={`/view/${data.id}`}>
                  <Button
                    buttonClassName="btn btn-outline-primary m-2"
                    buttonTitle="View"
                  />
                </Link>
                <Link to={`/edit/${data.id}`}>
                  <Button
                    buttonClassName="btn btn-outline-primary m-2"
                    buttonTitle="Edit"
                  />
                </Link>
                <Button
                  buttonClassName="btn btn-outline-danger m-2"
                  buttonTitle="Delete"
                  onClick={() => onClick(data.id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
