import { useForm } from "react-hook-form";
import { editCustomer, addCustomer, fetchCustomer } from "../../utils/api.js";
import { useParams } from "react-router";
import { validateEmail } from "../../utils/utils.js";
import ErrorDisplay from "../errorDisplay.jsx";
import { useEffect, useState } from "react";
import { useRefreshContext } from "../../utils/RefreshContext.jsx";

export const Customer = ({ action }) => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const { triggerRefresh } = useRefreshContext();
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
    triggerRefresh();
    reset();
  };

  const onSubmitEdit = async (data) => {
    const response = await editCustomer(data, id);
    setCustomerData(response);
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {action === "add" ? "Add New Customer" : "Edit Customer"}
        </h1>
        <p className="text-gray-500 text-sm">
          Create and manage your customers
        </p>
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
                defaultValue={customerData?.company || ""}
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone number*
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                })}
                type="tel"
                defaultValue={customerData?.phone || ""}
                className="w-full bg-gray-100 border border-gray-200 rounded-md p-2.5 text-sm"
              />
              {errors.phone && <ErrorDisplay message={errors.phone.message} />}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <textarea
              {...register("address", { required: true })}
              rows="3"
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
    </div>
  );
};
