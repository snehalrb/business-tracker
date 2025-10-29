import { useEffect } from "react";
import { fetchQuotes } from "../utils/api";

const SearchQuotes = () => {
  const getAllQuotes = async () => {
    try {
      const res = await fetchQuotes();
      console.log("all quotes", res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllQuotes();
  }, []);

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
        <button className="mt-3 md:mt-0 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
          <span className="text-lg font-bold">+</span> Create Quote
        </button>
      </div>

      {/* <!-- Search & Filter --> */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search customers by name, email, phone number or company"
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
        </div>

        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none">
          <option>All Statuses</option>
          <option>Accepted</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* <!-- Table --> */}
      <div className="border border-gray-100 rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-7 bg-gray-50 text-gray-600 text-sm font-medium">
          <div className="py-2 px-4">Quote No.</div>
          <div className="py-2 px-4">Expiry date</div>
          <div className="py-2 px-4">Customer Name</div>
          <div className="py-2 px-4">Email ID</div>
          <div className="py-2 px-4">Phone number</div>
          <div className="py-2 px-4">Amount</div>
          <div className="py-2 px-4 text-center">Actions</div>
        </div>

        {/* Data Row */}
        <div className="grid grid-cols-1 md:grid-cols-7 border-t hover:bg-gray-50 text-sm text-gray-700">
          <div className="flex md:block justify-between items-center py-2 px-4 font-medium text-gray-800">
            <span className="md:hidden font-semibold text-gray-500">
              Quote No:
            </span>
            QUO-001
          </div>

          <div className="flex md:block justify-between items-center py-2 px-4">
            <span className="md:hidden font-semibold text-gray-500">
              Expiry date:
            </span>
            29/10/2025
          </div>

          <div className="flex md:block justify-between items-center py-2 px-4">
            <span className="md:hidden font-semibold text-gray-500">
              Customer:
            </span>
            John Smith
          </div>

          <div className="flex md:block justify-between items-center py-2 px-4">
            <span className="md:hidden font-semibold text-gray-500">
              Email:
            </span>
            john.smith@tech.com
          </div>

          <div className="flex md:block justify-between items-center py-2 px-4">
            <span className="md:hidden font-semibold text-gray-500">
              Phone:
            </span>
            +61-442343667
          </div>

          <div className="flex md:block justify-between items-center py-2 px-4 font-medium">
            <span className="md:hidden font-semibold text-gray-500">
              Amount:
            </span>
            $5450
          </div>

          <div className="flex md:block justify-between items-center py-2 px-4 text-center">
            <div className="flex justify-center items-center gap-3">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                ACCEPTED
              </span>
              <div className="flex items-center gap-3">
                {/* Share Button */}
                <button className="text-gray-500 hover:text-green-600">
                  Share
                </button>

                {/* Delete Button */}
                <button className="text-red-500 hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchQuotes;
