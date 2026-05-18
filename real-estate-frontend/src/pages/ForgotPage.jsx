import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "https://real-estate-dhap.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Reset link sent to your email");
      } else {
        setMessage(data.message);
      }

    } catch (err) {
      console.log(err);
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-white shadow-md border border-gray-200 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition"
      >
        ← Back to Login
      </button>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

        {/* Heading */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            🔒
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Enter your registered email address and
            we’ll send you a password reset link.
          </p>

        </div>

        {/* Success Message */}
        {message && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 transition text-white py-3 rounded-xl font-semibold text-lg shadow-md"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;