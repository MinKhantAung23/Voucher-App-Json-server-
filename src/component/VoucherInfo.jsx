import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GenerateVoucherId from "../utils/GenerateVoucherId";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import toast from "react-hot-toast";
import useRecordStore from "../stores/useRecordStore";
import { tailspin } from "ldrs";

tailspin.register();

const VoucherInfo = () => {
  const voucherId = GenerateVoucherId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);

  const { records, resetRecord } = useRecordStore();

  const onSubmit = async (data) => {
    setIsPending(true);

    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;

    const currentVoucher = { ...data, records, total, tax, net_total };

    console.log(currentVoucher);

    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const json = await res.json();
    if (res.status == 201) {
      toast.success("Voucher created successfully");

      resetRecord();

      reset();

      setIsPending(false);

      if (data.redirect_to_detail) {
        navigate(`/voucher/detail/${json.id}`);
      }
    } else {
      toast.error(json.message);
    }
  };

  return (
    <div className="grid grid-cols-4 my-8 gap-5">
      <div className="col-span-3">
        <SaleForm />
        <VoucherTable />
      </div>
      <div className="col-span-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="infoForm"
          className="flex flex-col h-full"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Voucher ID
                </label>
                <input
                  type="text"
                  {...register("voucher_id", {
                    required: true,
                  })}
                  value={voucherId}
                  className={`bg-gray-50 border ${
                    errors.voucher_id
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  }  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="eg. 12v3df"
                />
                {errors.voucher_id?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 ">
                    Voucher ID is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Customer Name
                </label>
                <input
                  type="text"
                  {...register("customer_name", {
                    required: true,
                  })}
                  className={`bg-gray-50 border ${
                    errors.customer_name
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  }  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="eg. John Doe"
                />
                {errors.customer_name?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 ">
                    Customer Name is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              {" "}
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Customer Email
                </label>
                <input
                  type="email"
                  {...register("customer_email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    email: true,
                  })}
                  className={`bg-gray-50 border ${
                    errors.customer_email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  }  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="eg. eg@gmail.com"
                />
                {errors.customer_email?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 ">
                    Customer Email is required
                  </p>
                )}
                {errors.customer_email?.type === "pattern" && (
                  <p className="text-red-500 text-sm mt-1 ">
                    Invalid Customer Email
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sale Date
                </label>
                <input
                  type="date"
                  {...register("sale_date", {
                    required: true,
                  })}
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className={`bg-gray-50 border ${
                    errors.sale_date
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  }  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="eg. 10-10-2024"
                />
                {errors.sale_date?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1 ">
                    Sale Date is required
                  </p>
                )}
              </div>
            </div>
          </div>{" "}
          <div className=" flex flex-col justify-end items-end  mt-auto gap-1">
            <div className="flex items-center">
              <label
                htmlFor="redirect_to_detail"
                className="me-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >
                Redirect to Voucher Detail
              </label>
              <input
                {...register("redirect_to_detail")}
                form="infoForm"
                id="redirect_to_detail"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="all-correct"
                className="me-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >
                Make sure all field are correct
              </label>
              <input
                {...register("all_correct")}
                required
                form="infoForm"
                id="all-correct"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button
              type="submit"
              form="infoForm"
              className="text-white mt-4 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm Voucher
              {isPending && (
                <l-line-spinner
                  size="20"
                  stroke="3"
                  speed="1"
                  color="white"
                ></l-line-spinner>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherInfo;
