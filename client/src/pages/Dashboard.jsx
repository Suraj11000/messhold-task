import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [shopifyData, setShopifyData] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/auth/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/shopify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setShopifyData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-container flex flex-col items-center">
      {userData ? (
        <div className="card user-card p-6 bg-white shadow-lg rounded-lg mb-6 w-[25rem] md:w-[30rem] lg:w-[35rem]">
          <h2 className="text-xl font-bold text-center">Welcome, {userData.name}</h2>
          <p className="text-center">Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {shopifyData ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-16">
          <div className="card bg-blue-300 shadow-md xl:p-20 lg:p-16 md:p-12 sm:p-8 p-5 rounded-lg text-center w-full">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">{shopifyData.totalOrders}</p>
            <button
            onClick={() => Navigate('/orders')}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              
            >
              Check Orders
            </button>
          </div>
          <div className="card bg-green-300 shadow-md xl:p-20 lg:p-16 md:p-12 sm:p-8 p-5 rounded-lg text-center w-full">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-3xl font-bold mt-2">${shopifyData.totalSales.toFixed(2)}</p>
          </div>
          <div className="card bg-yellow-300 shadow-md xl:p-20 lg:p-16 md:p-12 sm:p-8 p-5 rounded-lg text-center w-full">
            <h3 className="text-lg font-semibold">Conversion Rate</h3>
            <p className="text-3xl font-bold mt-2">{shopifyData.conversionRate.toFixed(2)}%</p>
          </div>
        </div>
      ) : (
        <p>Loading Shopify data...</p>
      )}
    </div>
  );
};

export default Dashboard;
