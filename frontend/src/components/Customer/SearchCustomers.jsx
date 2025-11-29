import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { fetchAllCustomers, deleteCustomer } from "../../utils/api";
import { useState } from "react";
import { NavLink, Link } from "react-router";
import { SearchBox } from "../SearchBox";
import { filterCustomers } from "../../utils/utils";

export const SearchCustomers = () => {
  const [customerData, setCustomerData] = useState([]);
  const [queryData, setQueryData] = useState("");
  const getAllCustomers = async () => {
    try {
      const res = await fetchAllCustomers();
      setCustomerData(res);
    } catch (e) {
      console.log("Error in search customer:", e);
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    const results = customerData && filterCustomers(customerData, queryData);
    setCustomerData(results);
    if (queryData === "") {
      getAllCustomers();
    }
  }, [queryData]);

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    getAllCustomers();
  };

  return (
    <div className="p-6">
      {/* <!-- Header --> */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500">
            Create and manage your customers
          </p>
        </div>
        <NavLink
          to="/customer/add"
          className="mt-3 md:mt-0 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <span className="text-lg font-bold">+</span> Add Customer
        </NavLink>
      </div>

      {/* <!-- Search & Filter --> */}
      <SearchBox
        placeholder={"Search customers by name, email, phone number or company"}
        searchquery={(query) => {
          setQueryData(query);
        }}
      />
      <div className="border border-gray-100 rounded-lg overflow-hidden">
        <div className="hidden md:grid grid-cols-7 bg-gray-50 text-gray-600 text-sm font-medium">
          <div className="py-2 px-4">Customer Name</div>
          <div className="py-2 px-4">Company</div>
          <div className="py-2 px-4">Address</div>
          <div className="py-2 px-4 md:col-span-2">Email ID</div>
          <div className="py-2 px-4">Phone number</div>
        </div>

        {customerData &&
          customerData.map((c, index) => {
            return (
              <div
                className="grid grid-cols-1 md:grid-cols-7 border-t hover:bg-gray-50 text-sm text-gray-700"
                key={index}
              >
                <Link to={`/customer/edit/${c._id}`} className="contents">
                  <div className="flex md:block justify-between items-center py-2 px-4">
                    <span className="md:hidden font-semibold text-gray-500">
                      Customer Name:
                    </span>
                    {c.fullname}
                  </div>
                  <div className="flex md:block justify-between items-center py-2 px-4">
                    <span className="md:hidden font-semibold text-gray-500">
                      Company:
                    </span>
                    {c.company}
                  </div>

                  <div className="flex md:block justify-between items-center py-2 px-4">
                    <span className="md:hidden font-semibold text-gray-500">
                      Address:
                    </span>
                    {c.address}
                  </div>

                  <div className="flex md:block justify-between items-center py-2 px-4 md:col-span-2">
                    <span className="md:hidden font-semibold text-gray-500">
                      Email:
                    </span>
                    {c.email}
                  </div>

                  <div className="flex md:block justify-between items-center py-2 px-4">
                    <span className="md:hidden font-semibold text-gray-500">
                      Phone:
                    </span>
                    {c.phone}
                  </div>
                </Link>
                <div className="flex md:block justify-between items-center py-2 px-4">
                  <button
                    type="button"
                    onClick={() => handleDelete(c._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
