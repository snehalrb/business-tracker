import { useForm } from "react-hook-form";
import { editCustomer, addCustomer, fetchCustomer } from "../utils/api.js";
import { useParams } from "react-router";
import { validateEmail } from "../utils/utils";
import ErrorDisplay from "./errorDisplay.jsx";
import { useEffect, useState } from "react";

const Customer = ({ action }) => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit", defaultValues: customerData || {} });

  useEffect(() => {
    if (id) {
      const getCustomer = async () => {
        try {
          const response = await fetchCustomer(id);
          setCustomerData(response);
        } catch (e) {
          console.log(e);
        }
      };
      getCustomer();
    }
  }, [id]);

  useEffect(() => {
    if (customerData) {
      reset(customerData); // populate form
    }
  }, [customerData]);

  const onSubmitAdd = async (data) => {
    await addCustomer(data);
  };

  const onSubmitEdit = async (data) => {
    const response = await editCustomer(data, id);
    setCustomerData(response);
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button className="flex items-center text-gray-600 hover:text-black mb-2">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Add New Customer</h1>
        <p className="text-gray-500 text-sm">Create and manage your invoices</p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="font-semibold mb-4">Customer information</h2>

        <form
          className="space-y-4"
          onSubmit={id ? handleSubmit(onSubmitEdit) : handleSubmit(onSubmitAdd)}
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name*</label>
              <input
                {...register("fullname", { required: true })}
                type="text"
                name="fullname"
                defaultValue={customerData?.fullname || ""}
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
              />
              {errors.fullname && <ErrorDisplay />}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email ID*
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                defaultValue={customerData?.email || ""}
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
                onChange={(e) => {
                  validateEmail(e, setError, clearErrors, errors);
                }}
              />
              {errors.email && <ErrorDisplay message={errors.email.message} />}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Company (Optional)
              </label>
              <input
                {...register("company", { required: false })}
                type="text"
                name="company"
                defaultValue={customerData?.company || ""}
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone number*
              </label>
              <input
                {...register("phone", { required: true })}
                type="tel"
                defaultValue={customerData?.phone || ""}
                name="phone"
                minLength="10"
                maxLength="10"
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
              />
              {errors.phone && <ErrorDisplay />}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <textarea
              {...register("address", { required: true })}
              rows="3"
              name="address"
              className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
              defaultValue={customerData?.address || ""}
            />

            {errors.address && <ErrorDisplay />}
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded shadow"
          >
            {action === "add" ? `Add Customer` : `Edit Customer`}
          </button>
        </form>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <button className="text-gray-600 px-4 py-2">Cancel</button>
      </div>
    </div>
  );
};

export default Customer;
