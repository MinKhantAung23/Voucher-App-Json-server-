/* eslint-disable react/prop-types */

import React from "react";
import { HiChevronRight, HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="flex my-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <Link
          to={"/"}
          className="text-stone-500 flex items-center gap-1 hover:text-stone-700 text-sm font-medium"
        >
          <HiHome className="w-4 h-4" />
          <span>Home</span>
        </Link>{" "}
        <HiChevronRight className="w-4 h-4 text-stone-500" />
        {paths?.map((path, index) => (
          <li key={index} className="inline-flex items-center">
            {index === paths.length - 1 ? (
              <span className="text-stone-500 text-sm font-medium">
                {path.name}
              </span>
            ) : (
              <Link
                to={path.href}
                className="text-stone-500 hover:text-stone-700 text-sm font-medium"
              >
                {path.name}
              </Link>
            )}
            {index < paths.length - 1 && (
              <HiChevronRight className="w-4 h-4 text-stone-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
