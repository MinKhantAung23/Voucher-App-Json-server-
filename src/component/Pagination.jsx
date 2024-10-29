/* eslint-disable react/prop-types */
import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Pagination = ({
  links: { prev, next },
  meta: { total, to, from },
  updateFetchUrl,
}) => {
  const handlePrevBtn = async () => {
    updateFetchUrl(prev);
  };

  const handleNextBtn = async () => {
    updateFetchUrl(next);
  };
  return (
    <div className="flex justify-between items-center mt-4 mb-8">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          {from}{" "}
        </span>
        to
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          {to}{" "}
        </span>
        of
        <span className="font-semibold text-gray-900 dark:text-white">
          {" "}
          {total}{" "}
        </span>
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          disabled={!prev}
          onClick={handlePrevBtn}
          className="disabled:opacity-50 flex justify-center items-center gap-2 px-3 h-8 text-sm font-medium text-blue-700 bg-white border border-stone-200 rounded-s-lg hover:bg-stone-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <HiArrowLeft className="text-stone-600" />
          Prev
        </button>
        <button
          disabled={!next}
          onClick={handleNextBtn}
          className="disabled:opacity-50 flex justify-center items-center gap-2 px-3 h-8 text-sm font-medium text-blue-700 bg-white border border-stone-200 rounded-e-lg hover:bg-stone-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Next
          <HiArrowRight className="text-stone-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
