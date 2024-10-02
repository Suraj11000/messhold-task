import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const Navigate = useNavigate()
    return (
        <Fragment>
            <div className="flex flex-col items-center justify-center mt-20">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our E-Commerce Platform</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Please log in or register to access your account and view your orders.
                </p>
                <div className="flex space-x-4">
                    <button onClick={() => Navigate('/login')} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Login
                    </button>
                    <button onClick={()=>Navigate('register')} className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                        Register
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
