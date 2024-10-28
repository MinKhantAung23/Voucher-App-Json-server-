import React from "react";

const ProductEmptyStage = () => {
  return (
    <tr className="bg-white border-b dark:bg-stone-800 dark:border-stone-700 ">
      <td colSpan={5} className="px-6 py-4 text-center font-semibold ">
        There is no data!
      </td>
    </tr>
  );
};

export default ProductEmptyStage;
