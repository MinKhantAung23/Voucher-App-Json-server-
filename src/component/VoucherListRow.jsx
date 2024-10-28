/* eslint-disable react/prop-types */
import React from "react";
import {
  HiOutlineArrowRight,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import ShowDate from "./ShowDate";
import { useSWRConfig } from "swr";
import { leapfrog } from "ldrs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

leapfrog.register();

const VoucherListRow = ({
  voucher: { id, voucher_id, customer_name, customer_email, sale_date },
}) => {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
    });
    mutate(import.meta.env.VITE_API_URL + "/vouchers");
    toast.success("Product deleted successfully");
  };
  return (
    <tr className="bg-white border-b dark:bg-stone-800 dark:border-stone-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-stone-900 whitespace-nowrap dark:text-white"
      >
        {voucher_id}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        {customer_name}
      </th>
      <td className="px-6 py-4">{customer_email}</td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={sale_date} />
      </td>
      <td className="px-6 py-4">
        <div className="flex rounded-md shadow-sm justify-end">
          <button
            onClick={handleDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-stone-200 rounded-s-lg hover:bg-stone-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? (
              <l-leapfrog size="20" speed="2.5" color="red"></l-leapfrog>
            ) : (
              <HiOutlineTrash className="text-red-500" />
            )}
          </button>
          <Link
            to={`/voucher/detail/${id}`}
            aria-current="page"
            className="size-10 flex justify-center items-center text-sm font-medium text-blue-700 bg-white border border-stone-200 rounded-e-lg hover:bg-stone-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <HiOutlineArrowRight className="text-stone-600" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRow;
