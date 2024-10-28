/* eslint-disable react/prop-types */
import React from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { leapfrog } from "ldrs";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";

leapfrog.register();

const ProductRow = ({ product: { id, product_name, price, created_at } }) => {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });
    mutate(import.meta.env.VITE_API_URL + "/products");
    toast.success("Product deleted successfully");
  };
  return (
    <tr className="bg-white border-b dark:bg-stone-800 dark:border-stone-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>
      <td className="px-6 py-4 text-end">{price}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={created_at} />
      </td>
      <td className="px-6 py-4">
        <div className="flex rounded-md shadow-sm justify-end">
          <Link
            to={`/product/edit/${id}`}
            aria-current="page"
            className=" size-10 flex justify-center items-center text-sm font-medium text-blue-700 bg-white border border-stone-200 rounded-s-lg hover:bg-stone-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <HiOutlinePencil className="text-stone-600" />
          </Link>

          <button
            onClick={handleDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-e-lg hover:bg-stone-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? (
              <l-leapfrog size="20" speed="2.5" color="red"></l-leapfrog>
            ) : (
              <HiOutlineTrash className="text-red-500" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
