import React from "react";

const Image = ({
  divClassName,
  imageSource,
  imageClassName,
  imageAlt,
  customImageStyle,
}) => {
  return (
    <div className={divClassName} key={imageSource}>
      <img
        src={imageSource}
        className={imageClassName}
        alt={imageAlt}
        style={customImageStyle}
      />
    </div>
  );
};

export default Image;
