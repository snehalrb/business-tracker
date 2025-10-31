import { useState, useEffect } from "react";
import {
  useForm,
  FormProvider,
  useWatch,
  useFieldArray,
} from "react-hook-form";
import { useParams } from "react-router";
import { AddQuoteItems } from "./AddQuoteItems";
import ErrorDisplay from "../errorDisplay";
import { quoteItems } from "../../utils/utils";
import {
  generateQuoteNumber,
  fetchAllCustomers,
  createQuote,
  editQuote,
  fetchQuote,
} from "../../utils/api";

export const Quote = ({ action }) => {
  const { id } = useParams();
  //const [items, setItems] = useState([quoteItems]);
  const [totalItemAmt, setTotalItemAmt] = useState(0);
  const [customerNames, setCustomerNames] = useState([]);

  const methods = useForm({
    defaultValues: {
      items: [quoteItems],
      taxrate: 10,
      subtotal: 0,
      total: 0,
      notes: "",
    },
    mode: "onSubmit",
  });
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const taxRateData = watch("taxrate");
  // const subTotaldata = watch("subtotal");
  const items = useWatch({
    control: methods.control,
    name: "items", // watch the full array
  });

  const getQuoteNumber = async () => {
    try {
      const res = await generateQuoteNumber();
      if (!id) setValue("quotenumber", res);
    } catch (err) {
      console.error(err);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await fetchAllCustomers();
      setCustomerNames(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getQuoteNumber();
    getCustomers();
  }, []);

  const itemAmounts =
    items?.map((item) => item.amount).filter((item) => item !== 0) || [];
  useEffect(() => {
    const sum = itemAmounts.reduce((acc, el) => acc + Number(el), 0);
    setTotalItemAmt(sum);
  }, [itemAmounts]);

  useEffect(() => {
    const taxrateamt = (Number(taxRateData) / 100) * totalItemAmt;
    setValue("taxrateamt", Number(taxrateamt.toFixed(2)));
    setValue("subtotal", totalItemAmt);
    setValue("total", Number(taxrateamt.toFixed(2)) + Number(totalItemAmt));
  }, [totalItemAmt]);

  const onSubmitCreate = async (data) => {
    const cust = customerNames.find((c) => c.fullname === data.customername);
    const custID = cust ? cust._id : undefined;
    const { notes, taxrate, taxrateamt, subtotal, total, items, ...otherdata } =
      data;
    const fullData = {
      ...otherdata,
      customerId: custID,
      additionalinfo: { notes, taxrate },
      invoicesummary: { taxrateamt, subtotal, total },
      itemdetails: items, // items is child component data
    };

    await createQuote(fullData);
    reset();
    getQuoteNumber();
  };

  useEffect(() => {
    if (action === "edit" && id) {
      (async () => {
        const response = await fetchQuote(id);

        reset({
          ...response,
          issuedate: new Date(response.issuedate).toISOString().split("T")[0],
          duedate: new Date(response.duedate).toISOString().split("T")[0],
          items: response.itemdetails,
          notes: response.additionalinfo.notes,
          taxrate: response.additionalinfo.taxrate,
          taxrateamt: response.invoicesummary.taxrateamt,
          subtotal: response.invoicesummary.subtotal,
          total: response.invoicesummary.total,
        });
      })();
    }
  }, [id, action, reset]);

  const onSubmitEdit = async (data) => {
    const { notes, taxrate, taxrateamt, subtotal, total, items, ...otherdata } =
      data;
    const fullData = {
      ...otherdata,
      additionalinfo: { notes, taxrate },
      invoicesummary: { taxrateamt, subtotal, total },
      itemdetails: items, // items is child component data
    };
    console.log("data for edit", fullData);
    const response = await editQuote(fullData, id);
    // reset({
    //   ...response,
    //   itemsdetails: items, // reapply updated items
    // });
  };

  return (
    <div className="p-6">
      <FormProvider {...methods}>
        <form
          className="space-y-4"
          onSubmit={
            id ? handleSubmit(onSubmitEdit) : handleSubmit(onSubmitCreate)
          }
        >
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              {id ? `Edit Quote` : `Create New Quote`}
            </h1>
            <p className="text-gray-500">
              {id ? `Edit` : `Create`} and manage your invoices
            </p>
          </div>

          {/* --- Quotation Details --- */}
          <div className="mb-6 border p-4 rounded-lg bg-gray-50">
            <h2 className="text-lg font-medium mb-4">Quotation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quote Number
                </label>
                <input
                  {...register("quotenumber")}
                  name="quotenumber"
                  type="text"
                  className="border rounded px-3 py-2 bg-gray-100"
                  readOnly
                  placeholder="Quote Number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Issue Date*
                </label>
                <input
                  {...register("issuedate", { valueAsDate: true })}
                  name="issuedate"
                  type="date"
                  defaultValue="2025-09-29"
                  className="border rounded px-3 py-2 bg-gray-100"
                />
                {errors.issuedate && <ErrorDisplay />}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date*
                </label>
                <input
                  {...register("duedate", {
                    valueAsDate: true,
                    required: true,
                  })}
                  name="duedate"
                  type="date"
                  defaultValue="2025-09-29"
                  className="border rounded px-3 py-2 bg-gray-100"
                />
                {errors.duedate && <ErrorDisplay />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer*
                </label>
                <select
                  {...register("customername", { required: true })}
                  className="border rounded px-3 py-2 w-full"
                  name="customername"
                >
                  <option value="">Select Customer</option>
                  {customerNames.map((c, index) => (
                    <option key={index} value={c.fullname}>
                      {c.fullname}
                    </option>
                  ))}
                </select>
                {errors.customername && <ErrorDisplay />}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Status*
                </label>
                <select
                  {...register("status", { required: true })}
                  className="border rounded px-3 py-2 w-1/4"
                >
                  <option value="">Select Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                </select>
                {errors.status && <ErrorDisplay />}
              </div>
            </div>
          </div>

          {/* --- Item Details --- */}
          <AddQuoteItems />

          {/* --- Additional Info + Summary --- */}
          {/* <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Additional Information */}
            <div className="border p-5 rounded-lg bg-gray-50">
              <h2 className="text-sm font-semibold mb-4">
                Additional Information
              </h2>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Tax Rate (%)
                </label>
                <input
                  {...register("taxrate", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  defaultValue={10}
                  readOnly
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-sm mb-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Notes</label>
                <textarea
                  {...register("notes", { required: false })}
                  placeholder="Additional notes or payment terms..."
                  className="w-full border rounded px-3 py-2 bg-gray-100 h-24 text-sm"
                ></textarea>
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="border p-5 rounded-lg bg-gray-50">
              <h2 className="text-sm font-semibold mb-4">Invoice Summary</h2>

              <div className="flex justify-between text-sm mb-3">
                <span>Tax Rate (%)</span>
                <span>
                  $
                  <input {...register("taxrateamt")} type="number" readOnly />
                </span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span>Subtotal</span>
                <span>
                  $
                  <input {...register("subtotal")} type="number" readOnly />
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  $
                  <input {...register("total")} type="number" readOnly />
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded text-sm"
            >
              {action === "add" ? `Create Quote` : `Edit Quote`}
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 text-sm"
            >
              <span className="text-lg">👁</span>
              Preview
            </button>
          </div>
          {/* </div> */}
        </form>
      </FormProvider>
    </div>
  );
};
