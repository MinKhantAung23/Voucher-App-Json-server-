import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lineSpinner } from "ldrs";
import { hourglass } from "ldrs";
import toast from "react-hot-toast";
import useSWR from "swr";

lineSpinner.register();

hourglass.register();

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductEditCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/products/${id}`,
    fetcher
  );

  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleCreateProduct = async (data) => {
    setIsPending(true);
    const dateTime = new Date().toISOString();
    await fetch(import.meta.env.VITE_API_URL + "/products" + `/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: dateTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsPending(false);
    toast.success("Product updated successfully");

    if (data?.back_to_product_list) {
      navigate("/product");
    }
  };
  return (
    <div className="w-full md:w-2/3 my-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <p className="mb-6 font-light text-stone-500 dark:text-stone-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
        similique id error dolores inventore, molestias quos esse aliquid iste.
      </p>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <l-hourglass
            size="75"
            bg-opacity="0.1"
            speed="1.2"
            color="black"
          ></l-hourglass>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="space-y-6 sm:space-y-5"
        >
          <div>
            <div className="mb-4">
              <label
                htmlFor="product_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product_name"
                {...register("product_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
                defaultValue={data?.product_name}
                className={`bg-gray-50 border ${
                  errors.product_name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                }  text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="eg. Apple"
              />
              {errors.product_name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1 ">
                  Product Name is required
                </p>
              )}
              {errors.product_name?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1 ">
                  Product Name must be at least 3 characters
                </p>
              )}
              {errors.product_name?.type === "maxLength" && (
                <p className="text-red-500 text-sm mt-1 ">
                  Product Name must be less than 20 characters
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="product_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Price
              </label>
              <input
                type="text"
                id="product_price"
                {...register("price", {
                  required: true,
                  min: 500,
                  pattern: /^[0-9]+$/,
                })}
                defaultValue={data?.price}
                className={`${
                  errors.price
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                } bg-gray-50 border text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="eg. 1000"
              />
              {errors.price?.type === "required" && (
                <p className="text-red-500 text-sm mt-1 ">
                  Product Price is required
                </p>
              )}
              {errors.price?.type === "min" && (
                <p className="text-red-500 text-sm mt-1 ">
                  Product Price must be at least 10
                </p>
              )}
              {errors.price?.type === "pattern" && (
                <p className="text-red-500 text-sm mt-1 ">
                  Product Price must be a number
                </p>
              )}
            </div>
            <div className="flex items-center">
              <input
                id="checked-checkbox"
                {...register("checked-checkbox", { required: true })}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Make sure all field are correct
              </label>
              {errors.checked_checkbox?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Please check the checkbox
                </p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <input
                id="back_to_product_list"
                {...register("back_to_product_list")}
                type="checkbox"
                checked
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="back_to_product_list"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Back to product list after save
              </label>
            </div>
          </div>
          <div>
            <Link
              to="/product"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="text-white inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
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
      )}
    </div>
  );
};

export default ProductEditCard;
