import React from "react";

const Button = ({ buttonClassName, buttonTitle, onClick }) => {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {buttonTitle}
    </button>
  );
};

export default Button;
