import React from "react";

const Button = ({ buttonClassName, buttonTitle, onClick, disabled }) => {
  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {buttonTitle}
    </button>
  );
};

export default Button;
