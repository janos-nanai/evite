import React from "react";

const LoadingSpinner = (props: { asOverLay: boolean }) => {
  return (
    <div className={`${props.asOverLay && "loading-spinner__overlay"}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
