import { useFormContext, useFieldArray } from "react-hook-form";
import ErrorDisplay from "../errorDisplay";
import { quoteItems } from "../../utils/utils";

export const AddQuoteItems = () => {
  const {
    control,
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  //const items = useWatch({ name: "items" });
  const items = watch("items");

  const calculateAmount = (index, field, value) => {
    const rate =
      field === "rate" ? parseFloat(value) : parseFloat(items[index].rate);
    const quantity =
      field === "quantity"
        ? parseFloat(value)
        : parseFloat(items[index].quantity);

    const amount = rate * quantity;

    setValue(`items.${index}.${field}`, value);
    setValue(`items.${index}.amount`, amount);

    // clear error when valid
    if (value) clearErrors(`items.${index}.${field}`);
  };

  return (
    <div className="mb-6 border p-4 rounded-lg bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Item Details</h2>
        <button
          type="button"
          onClick={() => append(quoteItems)}
          className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg"
        >
          <span className="text-lg font-bold">+</span> Add Item
        </button>
      </div>
      {fields.map((i, index) => {
        return (
          <div className="space-y-3" key={i.id}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end my-4 bg-gray-50 p-3 rounded-lg">
              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Description
                </label>
                <input
                  {...register(`items.${index}.description`, {
                    required: true,
                  })}
                  type="text"
                  onChange={(e) =>
                    calculateAmount(index, "description", e.target.value)
                  }
                  className="w-full bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200 px-2 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Rate
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    {...register(`items.${index}.rate`, {
                      required: true,
                      min: 1,
                    })}
                    type="number"
                    onChange={(e) =>
                      calculateAmount(index, "rate", e.target.value)
                    }
                    className="w-full bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200 px-2 py-2"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    {...register(`items.${index}.quantity`, {
                      required: true,
                      min: 1,
                    })}
                    type="number"
                    onChange={(e) =>
                      calculateAmount(index, "quantity", e.target.value)
                    }
                    className="w-full bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200 px-2 py-2"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Amount
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    {...register(`items.${index}.amount`)}
                    type="number"
                    readOnly
                    className="w-full bg-gray-50 text-gray-700 text-sm px-2 py-2"
                  />
                </div>
              </div>
              <div className="md:col-span-1 flex justify-end md:justify-center">
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 text-lg mt-2 md:mt-6"
                  onClick={() => remove(index)}
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 items-center my-4 bg-gray-50">
              <div className="col-span-5">
                {errors.items?.[index]?.description && (
                  <ErrorDisplay
                    message={errors.items[index].description.message}
                  />
                )}
              </div>
              <div className="col-span-2">
                {" "}
                {errors.items?.[index]?.rate && (
                  <ErrorDisplay message={errors.items[index].rate.message} />
                )}
              </div>
              <div className="col-span-2">
                {" "}
                {errors.items?.[index]?.quantity && (
                  <ErrorDisplay
                    message={errors.items[index].quantity.message}
                  />
                )}
              </div>
              <div className="col-span-2">&nbsp;</div>
              <div className="col-span-1 flex justify-center">&nbsp;</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
