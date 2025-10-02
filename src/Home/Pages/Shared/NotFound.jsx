import React from "react";
import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-50 to-pink-50">
            <img
                src="https://i.ibb.co.com/mFqrs0jh/images.jpg"
                alt="404 Not Found"
                className="w-80 md:w-96 mb-6 animate-bounce"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
                404
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-6 text-center">
                Oops! The page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
