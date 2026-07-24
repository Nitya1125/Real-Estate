import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const VILLA_URL =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=1400&fit=crop&auto=format";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://real-estate-dhap.onrender.com/api/auth/login",
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
    <div className="relative w-full min-h-screen overflow-hidden flex" style={{ background: "#f0f4ff" }}>
      {/* ── Animated orb background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            left: "-10%",
            top: "-15%",
            background: "radial-gradient(circle, rgba(199,214,255,0.65) 0%, transparent 70%)",
            animation: "drift-a 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 550,
            height: 550,
            right: "30%",
            bottom: "-10%",
            background: "radial-gradient(circle, rgba(186,230,255,0.55) 0%, transparent 70%)",
            animation: "drift-b 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            right: "-5%",
            top: "20%",
            background: "radial-gradient(circle, rgba(224,231,255,0.7) 0%, transparent 70%)",
            animation: "drift-c 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px,transparent 1px),linear-gradient(90deg,#0f172a 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Left: form panel ── */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen px-6 py-12">
        {/* Brand */}
        <div className="absolute top-8 left-0 right-0 flex justify-center lg:justify-start lg:left-10">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
            </div>
            <span className="font-bold text-[15px] text-slate-800" style={{ letterSpacing: "0.14em" }}>
              HOMEVERSE
            </span>
          </div>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Headline */}
          <div className="mb-8 text-center">
            <h1
              className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-2"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Welcome back.
            </h1>
            <p className="text-slate-400 text-[14px]">Sign in to access your property portfolio.</p>
          </div>

          {/* Tab switcher */}
          <div className="flex p-1 rounded-2xl mb-6" style={{ background: "rgba(15,23,42,0.06)" }}>
            <button
              type="button"
              className="flex-1 py-2.5 text-[13px] font-semibold rounded-xl bg-white text-slate-900"
              style={{ boxShadow: "0 2px 12px rgba(15,23,42,0.1)" }}
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="flex-1 py-2.5 text-[13px] font-semibold rounded-xl text-slate-400 text-center hover:text-slate-600 transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Auth card */}
          <div
            className="rounded-3xl p-7"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 40px rgba(15,23,42,0.1), 0 2px 8px rgba(15,23,42,0.06)",
            }}
          >
            {/* Email Field */}
            <div className="relative mb-3.5">
              <div className="relative flex items-center rounded-[14px] border border-slate-900/10 bg-slate-900/[0.03] focus-within:border-blue-600/45 focus-within:bg-blue-50/60 transition-all duration-200">
                <span className="absolute left-4 text-slate-300 peer-focus:text-blue-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </span>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-[14px] text-slate-800 placeholder-slate-300 outline-none"
                  style={{ caretColor: "#2563eb" }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative mb-3.5">
              <div className="relative flex items-center rounded-[14px] border border-slate-900/10 bg-slate-900/[0.03] focus-within:border-blue-600/45 focus-within:bg-blue-50/60 transition-all duration-200">
                <span className="absolute left-4 text-slate-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent pl-11 pr-11 py-3.5 text-[14px] text-slate-800 placeholder-slate-300 outline-none"
                  style={{ caretColor: "#2563eb" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember / Forgot row */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className="flex items-center gap-2 group"
                aria-label="Remember me"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 ${
                    remember ? "bg-blue-600 border-blue-600" : "border-slate-200 group-hover:border-slate-300"
                  }`}
                >
                  {remember && (
                    <svg viewBox="0 0 12 12" width="10" height="10">
                      <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[12px] text-slate-400 group-hover:text-slate-600 transition-colors">Remember me</span>
              </button>
              <Link to="/forgot-password" className="text-[12px] text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Continue button */}
            <button
              onClick={handleLogin}
              className="relative w-full py-3.5 rounded-[14px] text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.985] transition-transform"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              Continue
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3.5 my-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-slate-300 text-[11px] font-medium">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Google login (real component, unchanged logic) */}
            <div className="w-full rounded-xl overflow-hidden border border-slate-100 hover:opacity-95 transition-opacity">
              <GoogleLogin
                width="100%"
                theme="filled_blue"
                shape="rectangular"
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post(
                      "https://real-estate-dhap.onrender.com/api/auth/google",
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

            <p className="text-center text-slate-400 text-[13px] mt-5">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: image panel (desktop only) ── */}
      <div className="hidden lg:block relative w-1/2 min-h-screen overflow-hidden">
        <img
          src={VILLA_URL}
          alt="Premium luxury property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f4ff]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0f4ff]/30 to-transparent" />

        <div className="absolute bottom-10 left-8 right-8">
          <div
            className="rounded-2xl px-6 py-5"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            <p
              className="text-slate-800 text-lg font-bold leading-snug mb-1"
              style={{ fontFamily: "Playfair Display, Georgia, serif" }}
            >
              "Own Extraordinary Spaces."
            </p>
            <p className="text-slate-500 text-[13px]">Discover premium properties around the world.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;