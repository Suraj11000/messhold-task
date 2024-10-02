import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      setSuccess(response.data.message);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "User registration failed");
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center content-center items-start mt-24">
        <div className="border-2 border-black rounded-lg h-auto p-8 w-[25rem]">
          <h2 className="flex justify-center pb-4 text-xl font-bold">Register</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col pb-2">
              <label htmlFor="name" className="font-semibold">Username:</label>
              <input
                type="text"
                placeholder="Username"
                className="border border-black px-5 py-2 rounded-lg"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col pb-2">
              <label htmlFor="email" className="font-semibold">Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="border border-black px-5 py-2 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col pb-2">
              <label htmlFor="password" className="font-semibold">Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="border border-black px-5 py-2 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center items-center pt-4">
              <button className="bg-sky-500 w-full rounded-lg py-2 text-white font-bold hover:bg-sky-600">
                Register
              </button>
            </div>
          </form>
          <div className="text-center pt-4">
            <p>Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-500 w-full rounded-lg py-2 text-white font-bold mt-2 hover:bg-gray-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
