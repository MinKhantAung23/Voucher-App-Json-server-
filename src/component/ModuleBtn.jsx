/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className="flex h-full flex-col items-center justify-center gap-3 bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg duration-300"
    >
      {icon}
      {name}
    </Link>
  );
};

export default ModuleBtn;
