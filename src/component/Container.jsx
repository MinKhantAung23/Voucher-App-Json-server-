/* eslint-disable react/prop-types */
import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`w-11/12 md:w-3/4 lg:w-1/2 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
