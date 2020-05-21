import React from "react";
import Image from "../Image/Image";
const Slider = ({ pictures }) => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {pictures.map((picture, index) => {
          return (
            <Image
              divClassName={`carousel-item ${index === 0 ? "active" : " "}`}
              imageSource={picture}
              imageClassName="d-block w-100"
              imageAlt="market icon"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
