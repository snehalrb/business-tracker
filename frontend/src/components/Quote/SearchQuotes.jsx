import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { MdDelete, MdShare } from "react-icons/md";
import { fetchQuotes, deleteQuote } from "../../utils/api";
import { SearchBox } from "../SearchBox";
import { filterQuotes } from "../../utils/utils";

export const SearchQuotes = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [queryData, setQueryData] = useState("");

  const getAllQuotes = async () => {
    try {
      const res = await fetchQuotes();
      console.log(res);
      setQuoteData(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllQuotes();
  }, []);

  useEffect(() => {
    const results = quoteData && filterQuotes(quoteData, queryData);
    setQuoteData(results);
    if (queryData === "") {
      getAllQuotes();
    }
  }, [queryData]);

  const handleDelete = async (id) => {
    await deleteQuote(id);
    getAllQuotes();
  };

  return (
    <div className="p-6">
      {/* <!-- Header --> */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Quotes</h1>
          <p className="text-sm text-gray-500">
            Create and manage your quotations and proposals
          </p>
        </div>
        <NavLink
          to="/quote/create"
          className="mt-3 md:mt-0 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <span className="text-lg font-bold">+</span> Add Quote
        </NavLink>
      </div>

      {/* <!-- Search & Filter --> */}

      <SearchBox
        placeholder={
          "Search quotes by quote number, customer name, email, phone number or total amount"
        }
        searchquery={(query) => {
          setQueryData(query);
        }}
      />

      {/* <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none">
          <option>All Statuses</option>
          <option>Accepted</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select> */}

      {/* <!-- Table --> */}
      <div className="border border-gray-100 rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-8 bg-gray-50 text-gray-600 text-sm font-medium">
          <div className="py-2 px-4">Quote No.</div>
          <div className="py-2 px-4">Customer Name</div>
          <div className="py-2 px-4 md:col-span-2">Email ID</div>
          <div className="py-2 px-4">Phone number</div>
          <div className="py-2 px-4">Total Amount</div>
          <div className="py-2 px-4 text-center">Actions</div>
        </div>

        {quoteData &&
          quoteData.map((q, index) => {
            return (
              <div
                className="grid grid-cols-1 md:grid-cols-8 border-t hover:bg-gray-50 text-sm text-gray-700"
                key={index}
              >
                <div className="flex md:block justify-between items-center py-2 px-4">
                  <span className="md:hidden font-semibold text-gray-500">
                    Quote No.:
                  </span>
                  {q.quotenumber}
                </div>
                <div className="flex md:block justify-between items-center py-2 px-4">
                  <span className="md:hidden font-semibold text-gray-500">
                    Customer name:
                  </span>
                  {q.customername}
                </div>

                <div className="flex md:block justify-between items-center py-2 px-4 md:col-span-2">
                  <span className="md:hidden font-semibold text-gray-500">
                    Email:
                  </span>
                  {q.customerId.email}
                </div>

                <div className="flex md:block justify-between items-center py-2 px-4">
                  <span className="md:hidden font-semibold text-gray-500">
                    Phone:
                  </span>
                  {q.customerId.phone}
                </div>

                <div className="flex md:block justify-between items-center py-2 px-4">
                  <span className="md:hidden font-semibold text-gray-500">
                    Total Amount:
                  </span>
                  {q.invoicesummary.total}
                </div>

                <div className="flex md:block justify-between items-center py-2 px-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      ACCEPTED
                    </span>
                    <div className="flex items-center gap-3">
                      {/* Share Button */}
                      <button className="text-gray-500 hover:text-green-600">
                        <MdShare />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(q._id)}
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
  );
};
