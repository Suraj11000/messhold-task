import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white sticky top-0 z-50">
      <div className="text-2xl">MessHold</div>
      <div className="gap-5 flex">
        {token ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 hover:font-semibold">
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="px-6 py-2 bg-green-500 rounded-xl hover:bg-green-600 hover:font-semibold">
              Login
            </button>
            <button onClick={() => navigate("/register")} className="px-4 py-2 bg-sky-500 rounded-xl hover:bg-sky-600 hover:font-semibold">
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
