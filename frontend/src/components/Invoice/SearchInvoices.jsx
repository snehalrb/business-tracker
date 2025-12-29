import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { MdDelete, MdShare } from "react-icons/md";
import { fetchInvoices, deleteInvoice, editInvoice } from "../../utils/api";
import { SearchBox } from "../SearchBox";
import { filterInvoices, PillStatus, PillColor } from "../../utils/utils";
import { DeleteModal } from "../../utils/DeleteModal";

export const SearchInvoices = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [queryData, setQueryData] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, watch, reset, setValue } = useForm({
    defaultValues: { status: {} },
  });

  /* FETCH ALL INVOICES */
  const getAllInvoices = async () => {
    try {
      const res = await fetchInvoices();
      setInvoiceData(res);

      reset({
        status: Object.fromEntries(
          res.map((q) => [q._id, q.status.toLowerCase()])
        ),
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllInvoices();
  }, []);

  /*FILTER Invoice */
  const displayedInvoices = useMemo(() => {
    if (!queryData) return invoiceData;
    return filterInvoices(invoiceData, queryData);
  }, [queryData, invoiceData]);

  /*UPDATE STATUS */
  const updateStatus = useCallback(
    async (newStatus, invoiceId) => {
      setValue(`status.${invoiceId}`, newStatus);

      setInvoiceData((prev) =>
        prev.map((q) => (q._id === invoiceId ? { ...q, status: newStatus } : q))
      );
      const fullData = invoiceData.find((q) => q._id === invoiceId);
      if (!fullData) return;

      const updatedData = {
        ...fullData,
        status: newStatus,
      };

      try {
        await editInvoice(updatedData, invoiceId);
        console.log("Status updated on server");
      } catch (e) {
        console.log("Error updating status", e);
      }
    },
    [setValue, invoiceData]
  );

  /*DELETE Invoice */
  const handleDelete = async (id) => {
    await deleteInvoice(id);
    getAllInvoices();
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <>
      <div className="p-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Invoices</h1>
            <p className="text-sm text-gray-500">
              Create and manage your invoices and proposals
            </p>
          </div>

          <Link
            to="/invoice/create"
            className="mt-3 md:mt-0 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
          >
            <span className="text-lg font-bold">+</span> Create Invoice
          </Link>
        </div>

        {/* SEARCH */}
        <SearchBox
          placeholder="Search invoices by invoice number, customer name, email, phone number or total amount"
          searchquery={(query) => setQueryData(query)}
        />

        {/* TABLE */}
        <div className="border border-gray-100 rounded-lg overflow-hidden mt-4">
          {/* HEADER */}
          <div className="hidden md:grid grid-cols-9 bg-gray-50 text-gray-600 text-sm font-medium">
            <div className="py-2 px-4">Invoice No.</div>
            <div className="py-2 px-4">Expiry Date</div>
            <div className="py-2 px-4">Customer Name</div>
            <div className="py-2 px-4 md:col-span-2">Email ID</div>
            <div className="py-2 px-4">Phone number</div>
            <div className="py-2 px-4">Total Amount</div>
            <div className="py-2 px-4 text-center">&nbsp;</div>
          </div>

          {/* ROWS */}
          {displayedInvoices.map((q) => {
            const watchedValue = watch(`status.${q._id}`);

            return (
              <div
                className="grid grid-cols-1 md:grid-cols-9 border-t hover:bg-gray-50 text-sm text-gray-700"
                key={q._id}
              >
                <Link to={`/invoice/edit/${q._id}`} className="contents">
                  <div className="py-2 px-4">{q.invoicenumber}</div>
                  <div className="py-2 px-4">{formatDate(q.duedate)}</div>
                  <div className="py-2 px-4">{q.customername}</div>
                  <div className="py-2 px-4 md:col-span-2">
                    {q.customerId.email}
                  </div>
                  <div className="py-2 px-4">{q.customerId.phone}</div>
                  <div className="py-2 px-4">{q.invoicesummary.total}</div>
                </Link>

                {/* ACTIONS */}
                <div className="flex md:block justify-between items-center py-2 px-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    {/* STATUS SELECT */}
                    <select
                      {...register(`status.${q._id}`)}
                      value={watchedValue}
                      onChange={(e) => updateStatus(e.target.value, q._id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${PillColor(
                        watchedValue
                      )}`}
                    >
                      {PillStatus.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>

                    {/* SHARE & DELETE */}
                    <div className="flex items-center gap-3">
                      {/* <button className="text-gray-500 hover:text-green-600">
                        <MdShare />
                      </button> */}

                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(q._id);
                          setIsModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DeleteModal
        open={isModalOpen}
        onConfirm={() => {
          handleDelete(deleteId);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};
