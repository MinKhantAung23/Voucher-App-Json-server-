import React, { useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiComputerDesktop, HiXCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProudctListSkeletonLoader";
import VoucherEmptyStage from "./VoucherEmptyStage";
import VoucherListRow from "./VoucherListRow";
import { debounce, throttle } from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());
const VoucherList = () => {
  const [search, setSearch] = useState();
  const ref = useRef();
  const { data, isLoading, error } = useSWR(
    search
      ? `${import.meta.env.VITE_API_URL}/vouchers?voucher_id_like=${search}`
      : `${import.meta.env.VITE_API_URL}/vouchers`,
    fetcher
  );

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  const handleClearSearch = () => {
    setSearch("");
    ref.current.value = "";
  };
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch />
          </div>
          <input
            type="text"
            ref={ref}
            onChange={handleSearch}
            id="simple-search"
            className="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Voucher"
            required
          />
          {search && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 end-1 flex items-center ps-3 "
            >
              <HiXCircle />
            </button>
          )}
        </div>
        <div>
          <Link
            to={"/sale"}
            className="p-2.5 ms-2 flex items-center space-x-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span>Create Sale</span>
            <HiComputerDesktop className="size-4" />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-stone-50 dark:bg-stone-700 dark:text-stone-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>
              <th scope="col" className="px-6 py-3 ">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created at
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data.length === 0 ? (
              <VoucherEmptyStage />
            ) : (
              data.map((voucher) => (
                <VoucherListRow key={voucher.id} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
