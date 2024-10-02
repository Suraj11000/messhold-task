import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrderDetails from "./pages/totalOrders";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrderDetails/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
