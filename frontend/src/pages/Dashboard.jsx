import { NavigationPanel } from "../components/Navigation";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 font-sans">
      <div className="flex min-h-screen">
        {/* <!-- Sidebar --> */}
        <NavigationPanel />

        {/* <!-- Main content --> */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Dashboard</h2>
              <p className="text-gray-500 text-sm">
                Welcome back! Here's an overview of your business
              </p>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-white shadow rounded border">
                + Add Customer
              </button>
              <button className="px-4 py-2 bg-white shadow rounded border">
                + Create Quote
              </button>
              <button className="px-4 py-2 bg-white shadow rounded border">
                + Create Invoice
              </button>
            </div>
          </div>

          {/* <!-- Stats Cards --> */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-green-600 font-bold text-lg mt-1">$1,930</p>
              <p className="text-gray-400 text-xs mt-1">From 3 paid invoices</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Pending Amount</p>
              <p className="text-red-600 font-bold text-lg mt-1">$4,650</p>
              <p className="text-gray-400 text-xs mt-1">
                2 outstanding invoices
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Total Customers</p>
              <p className="text-gray-800 font-bold text-lg mt-1">10</p>
              <p className="text-gray-400 text-xs mt-1">5 active customers</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Quote Value</p>
              <p className="text-gray-800 font-bold text-lg mt-1">3</p>
              <p className="text-gray-400 text-xs mt-1">2 accepted quotes</p>
            </div>
          </div>

          {/* <!-- Recent Invoices & Quotes --> */}
          <div className="grid grid-cols-2 gap-4">
            {/* <!-- Recent Invoices --> */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Recent Invoices</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">INV-001</p>
                    <p className="text-xs text-gray-500">
                      Due 29/10/2025 - John Smith
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
                      PAID
                    </span>
                    <span className="font-semibold">$500</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">INV-002</p>
                    <p className="text-xs text-gray-500">
                      Due 29/10/2025 - John Smith
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded-full">
                      SENT
                    </span>
                    <span className="font-semibold">$500</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">INV-003</p>
                    <p className="text-xs text-gray-500">
                      Due 29/10/2025 - John Smith
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 text-xs bg-red-100 px-2 py-1 rounded-full">
                      OVERDUE
                    </span>
                    <span className="font-semibold">$500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Recent Quotes --> */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Recent Quotes</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">QUO-001</p>
                    <p className="text-xs text-gray-500">
                      Due 29/10/2025 - John Smith
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
                      PAID
                    </span>
                    <span className="font-semibold">$500</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">QUO-002</p>
                    <p className="text-xs text-gray-500">
                      Due 29/10/2025 - John Smith
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 text-xs bg-red-100 px-2 py-1 rounded-full">
                      OVERDUE
                    </span>
                    <span className="font-semibold">$500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
