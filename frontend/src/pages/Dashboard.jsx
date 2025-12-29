import { Link } from "react-router";

const Dashboard = () => {
  return (
    <>
      <div className="p-6">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
          {/* Title */}
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-gray-500 text-sm">
              Welcome back! Here's an overview of your business
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            <Link
              to="/customer/add"
              className="w-full sm:w-auto text-center px-4 py-2 bg-white shadow rounded border"
            >
              + Add Customer
            </Link>

            <Link
              to="/quote/create"
              className="w-full sm:w-auto text-center px-4 py-2 bg-white shadow rounded border"
            >
              + Create Quote
            </Link>

            <Link
              to="/invoice/create"
              className="w-full sm:w-auto text-center px-4 py-2 bg-white shadow rounded border"
            >
              + Create Invoice
            </Link>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl border p-4 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Total Revenue</p>
              <p class="text-2xl font-semibold mt-1">$1,930</p>
              <p class="text-xs text-gray-400 mt-1">From 3 paid invoices</p>
            </div>
            <span class="text-gray-400 text-lg">$</span>
          </div>

          <div class="bg-white rounded-xl border p-4 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Pending Amount</p>
              <p class="text-2xl font-semibold mt-1">$4,650</p>
              <p class="text-xs text-gray-400 mt-1">2 outstanding invoices</p>
            </div>
            <span class="text-gray-400 text-lg">⏱️</span>
          </div>

          <div class="bg-white rounded-xl border p-4 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Total Customers</p>
              <p class="text-2xl font-semibold mt-1">10</p>
              <p class="text-xs text-gray-400 mt-1">5 active customers</p>
            </div>
            <span class="text-gray-400 text-lg">👥</span>
          </div>

          <div class="bg-white rounded-xl border p-4 flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Quote Value</p>
              <p class="text-2xl font-semibold mt-1">3</p>
              <p class="text-xs text-gray-400 mt-1">2 accepted quotes</p>
            </div>
            <span class="text-gray-400 text-lg">📄</span>
          </div>

          <div class="bg-white rounded-xl border p-4">
            <p class="text-sm text-gray-500">Total Invoices</p>
            <p class="text-2xl font-semibold mt-1">12</p>
            <p class="text-xs text-gray-400 mt-1">1 paid, 2 sent, 0 drafts</p>
          </div>

          <div class="bg-white rounded-xl border p-4">
            <p class="text-sm text-gray-500">Overdue Invoices</p>
            <p class="text-2xl font-semibold mt-1">0</p>
            <p class="text-xs text-gray-400 mt-1">
              Requires immediate attention
            </p>
          </div>

          <div class="bg-white rounded-xl border p-4">
            <p class="text-sm text-gray-500">Total Quotes</p>
            <p class="text-2xl font-semibold mt-1">10</p>
            <p class="text-xs text-gray-400 mt-1">1 paid, 2 sent, 0 drafts</p>
          </div>

          <div class="bg-white rounded-xl border p-4">
            <p class="text-sm text-gray-500">Accepted Quotes</p>
            <p class="text-2xl font-semibold mt-1">3</p>
            <p class="text-xs text-gray-400 mt-1">
              Ready to convert to invoices
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
