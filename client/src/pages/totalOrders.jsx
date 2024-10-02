import React, { Fragment, useEffect, useState } from "react";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const ordersPerPage = 9;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/shopify/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "border-green-500 text-green-500";
      case "pending":
        return "border-orange-500 text-yellow-500";
      default:
        return "border-red-500 text-red-500";
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setMinAmount("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
    setCurrentPage(1);
  };

  const handleMaxAmountChange = (e) => {
    setMaxAmount(e.target.value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) => {
    const orderAmount = parseFloat(order.current_total_price);
    const orderDate = new Date(order.created_at).getTime();
    const startDateMillis = startDate ? new Date(startDate).getTime() : null;
    const endDateMillis = endDate ? new Date(endDate).getTime() : null;

    const statusMatch = selectedStatus ? order.financial_status === selectedStatus : true;
    const amountMatch = (!minAmount || orderAmount >= parseFloat(minAmount)) &&
                        (!maxAmount || orderAmount <= parseFloat(maxAmount));
    const dateMatch = (!startDateMillis || orderDate >= startDateMillis) &&
                      (!endDateMillis || orderDate <= endDateMillis);

    return statusMatch && (filterType === "amount" ? amountMatch : dateMatch);
  });

  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div className="text-center flex justify-center p-20">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Fragment>
      <div className="flex justify-center text-center p-5">
        <h1 className="text-2xl font-semibold">Track Orders and Their Status</h1>
      </div>

      <div className="flex justify-center mb-5 space-x-4">
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border-2 p-2 rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="voided">Unpaid</option>
        </select>

        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="border p-2 rounded-lg"
        >
          <option value="">Select Filter</option>
          <option value="amount">By Sale Amount</option>
          <option value="date">By Order Date</option>
        </select>

        {filterType === "amount" && (
          <>
            <input
              type="number"
              placeholder="Min Amount"
              value={minAmount}
              onChange={handleMinAmountChange}
              className="border p-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Max Amount"
              value={maxAmount}
              onChange={handleMaxAmountChange}
              className="border p-2 rounded-lg"
            />
          </>
        )}

        {filterType === "date" && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border p-2 rounded-lg"
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border p-2 rounded-lg"
            />
          </>
        )}
              <div className="flex justify-center mb-5">
        <button
          onClick={fetchOrders}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Refresh Orders
        </button>
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-20 py-4">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className={`border-2 rounded-lg p-4 w-full shadow-lg transition-transform duration-200 hover:scale-105 h-72 overflow-hidden ${getStatusColor(
              order.financial_status
            )}`}
          >
            <h2 className="text-xl font-bold">Order Number: {order.name}</h2>
            <p>
              Status:{" "}
              <span className={`${getStatusColor(order.financial_status)}`}>
                {order.financial_status}
              </span>
            </p>
            <h3 className="font-semibold mt-2">Items:</h3>
            <ul className="list-disc pl-5 h-36 overflow-y-scroll hide-scrollbar">
              {order.line_items.map((item) => (
                <li key={item.id} className="flex items-center mb-2">
                  <div className="flex-grow">
                    <p>Name: {item.name}</p>
                    <p>Price: €{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Total Price: €
                      {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold">
              Total Price for Order: €{order.current_total_price}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 my-6">
        <button
          onClick={prevPage}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
