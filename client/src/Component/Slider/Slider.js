import React from "react";
import Image from "../Image/Image";
const Slider = ({ pictures, customImageStyle }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {pictures.map((picture, index) => {
          return (
            <Image
              key={picture}
              divClassName={`carousel-item ${index === 0 ? "active" : " "}`}
              imageSource={picture}
              imageClassName="d-block w-100"
              imageAlt="market icon"
              customImageStyle={customImageStyle}
            />
          );
        })}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Slider;
