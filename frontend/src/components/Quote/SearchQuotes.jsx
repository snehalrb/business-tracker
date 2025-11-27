import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { MdDelete, MdShare } from "react-icons/md";
import { fetchQuotes, deleteQuote, editQuote } from "../../utils/api";
import { SearchBox } from "../SearchBox";
import { filterQuotes, QuotePillStatus, PillColor } from "../../utils/utils";
import { DeleteModal } from "../../utils/DeleteModal";

export const SearchQuotes = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [queryData, setQueryData] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, watch, reset, setValue } = useForm({
    defaultValues: { status: {} },
  });

  const watchStatus = watch("status");

  /* FETCH ALL QUOTES */
  const getAllQuotes = async () => {
    try {
      const res = await fetchQuotes();
      setQuoteData(res);

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
    getAllQuotes();
  }, []);

  /*FILTER QUOTE */
  const displayedQuotes = useMemo(() => {
    if (!queryData) return quoteData;
    return filterQuotes(quoteData, queryData);
  }, [queryData, quoteData]);

  /*UPDATE STATUS */
  const updateStatus = useCallback(
    async (newStatus, quoteId) => {
      setValue(`status.${quoteId}`, newStatus);

      setQuoteData((prev) =>
        prev.map((q) => (q._id === quoteId ? { ...q, status: newStatus } : q))
      );
      const fullData = quoteData.find((q) => q._id === quoteId);
      if (!fullData) return;

      const updatedData = {
        ...fullData,
        status: newStatus,
      };

      try {
        await editQuote(updatedData, quoteId);
        console.log("Status updated on server");
      } catch (e) {
        console.log("Error updating status", e);
      }
    },
    [setValue, quoteData]
  );

  /*DELETE QUOTE */
  const handleDelete = async (id) => {
    await deleteQuote(id);
    getAllQuotes();
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
            <h1 className="text-2xl font-semibold text-gray-800">Quotes</h1>
            <p className="text-sm text-gray-500">
              Create and manage your quotations and proposals
            </p>
          </div>

          <Link
            to="/quote/create"
            className="mt-3 md:mt-0 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
          >
            <span className="text-lg font-bold">+</span> Create Quote
          </Link>
        </div>

        {/* SEARCH */}
        <SearchBox
          placeholder="Search quotes by quote number, customer name, email, phone number or total amount"
          searchquery={(query) => setQueryData(query)}
        />

        {/* TABLE */}
        <div className="border border-gray-100 rounded-lg overflow-hidden mt-4">
          {/* HEADER */}
          <div className="hidden md:grid grid-cols-9 bg-gray-50 text-gray-600 text-sm font-medium">
            <div className="py-2 px-4">Quote No.</div>
            <div className="py-2 px-4">Expiry Date</div>
            <div className="py-2 px-4">Customer Name</div>
            <div className="py-2 px-4 md:col-span-2">Email ID</div>
            <div className="py-2 px-4">Phone number</div>
            <div className="py-2 px-4">Total Amount</div>
            <div className="py-2 px-4 text-center">&nbsp;</div>
          </div>

          {/* ROWS */}
          {displayedQuotes.map((q) => {
            const watchedValue = watch(`status.${q._id}`);

            return (
              <div
                className="grid grid-cols-1 md:grid-cols-9 border-t hover:bg-gray-50 text-sm text-gray-700"
                key={q._id}
              >
                <Link to={`/quote/edit/${q._id}`} className="contents">
                  <div className="py-2 px-4">{q.quotenumber}</div>
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
                      {QuotePillStatus.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>

                    {/* SHARE & DELETE */}
                    <div className="flex items-center gap-3">
                      <button className="text-gray-500 hover:text-green-600">
                        <MdShare />
                      </button>

                      <button
                        type="button"
                        //onClick={() => handleDelete(q._id)}
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
