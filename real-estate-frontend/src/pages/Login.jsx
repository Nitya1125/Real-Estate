import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button className="w-full bg-black text-white py-3 rounded-lg">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account? Sign up
        </p>

      </div>

    </div>
  );
};

export default Login;