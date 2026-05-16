import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (res.data.message === "User Not Found") {
        alert("User Not Found");
        return;
      }

      if (res.data.message === "Invalid Credential") {
        alert("Wrong Password");
        return;
      }

      if (res.data.message === "Login Successfully") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Login error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-[-150px] left-[-120px] w-[420px] h-[420px] bg-gray-200/40 blur-3xl rounded-full" />

      <div className="absolute bottom-[-180px] right-[-100px] w-[420px] h-[420px] bg-gray-300/20 blur-3xl rounded-full" />

      <div className="relative w-full max-w-2xl bg-white border border-gray-100 rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] px-10 md:px-14 py-10">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-[11px] font-bold tracking-[0.22em] uppercase px-5 py-2 rounded-full border border-gray-200">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>

            Secure Login
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-6xl font-black text-[#111827] tracking-tight leading-none">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-base mt-3">
            Sign in to continue to your account
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[15px] font-bold text-gray-700 mb-3">
              Email Address
            </label>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>

              <input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full pl-14 pr-5 py-4 text-[15px] text-[#111827] bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 focus:bg-white transition-all duration-200 placeholder:text-gray-300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[15px] font-bold text-gray-700">
                Password
              </label>

              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-[#111827] transition-colors duration-200 cursor-pointer font-semibold">
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>

              <input
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-14 pr-14 py-4 text-[15px] text-[#111827] bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 focus:bg-white transition-all duration-200 placeholder:text-gray-300"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827] transition-colors duration-200"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-8 bg-gradient-to-r from-[#111827] to-[#1f2937] hover:opacity-95 active:scale-[0.98] text-white text-[15px] font-bold tracking-wide py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(17,24,39,0.18)]"
        >
          Sign In →
        </button>

        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-gray-100" />

          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            or continue with
          </span>

          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(
                    "http://localhost:5000/api/auth/google",
                    { token: credentialResponse.credential }
                  );

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.user));

                  if (res.data.user.role === "admin") {
                    navigate("/admin");
                  } else {
                    navigate("/dashboard");
                  }
                } catch (err) {
                  console.log(err);
                  alert("Google Login error");
                }
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>
        </div>

        <p className="text-[15px] text-gray-400 text-center mt-7">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#111827] font-bold hover:opacity-70 transition-opacity duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;