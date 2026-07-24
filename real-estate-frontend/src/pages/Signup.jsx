import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const VILLA_URL =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=1400&fit=crop&auto=format";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://real-estate-dhap.onrender.com/api/auth/signup",
        formData
      );

      if (res.data.message === "User Already Exists") {
        alert("User Already Exists");
        return;
      } else {
        alert("Signup Successful");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Signup error");
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
              Join HOMEVERSE.
            </h1>
            <p className="text-slate-400 text-[14px]">Start exploring premium properties today.</p>
          </div>

          {/* Tab switcher */}
          <div className="flex p-1 rounded-2xl mb-6" style={{ background: "rgba(15,23,42,0.06)" }}>
            <Link
              to="/"
              className="flex-1 py-2.5 text-[13px] font-semibold rounded-xl text-slate-400 text-center hover:text-slate-600 transition-colors"
            >
              Sign In
            </Link>
            <button
              type="button"
              className="flex-1 py-2.5 text-[13px] font-semibold rounded-xl bg-white text-slate-900"
              style={{ boxShadow: "0 2px 12px rgba(15,23,42,0.1)" }}
            >
              Create Account
            </button>
          </div>

          {/* Auth card */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl p-7"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 40px rgba(15,23,42,0.1), 0 2px 8px rgba(15,23,42,0.06)",
            }}
          >
            {/* Full Name Field */}
            <div className="relative mb-3.5">
              <div className="relative flex items-center rounded-[14px] border border-slate-900/10 bg-slate-900/[0.03] focus-within:border-blue-600/45 focus-within:bg-blue-50/60 transition-all duration-200">
                <span className="absolute left-4 text-slate-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Full name"
                  required
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-[14px] text-slate-800 placeholder-slate-300 outline-none"
                  style={{ caretColor: "#2563eb" }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative mb-3.5">
              <div className="relative flex items-center rounded-[14px] border border-slate-900/10 bg-slate-900/[0.03] focus-within:border-blue-600/45 focus-within:bg-blue-50/60 transition-all duration-200">
                <span className="absolute left-4 text-slate-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email address"
                  required
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Password"
                  required
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

            {/* Confirm Password Field (UI only — not sent to backend) */}
            <div className="relative mb-3.5">
              <div className="relative flex items-center rounded-[14px] border border-slate-900/10 bg-slate-900/[0.03] focus-within:border-blue-600/45 focus-within:bg-blue-50/60 transition-all duration-200">
                <span className="absolute left-4 text-slate-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full bg-transparent pl-11 pr-11 py-3.5 text-[14px] text-slate-800 placeholder-slate-300 outline-none"
                  style={{ caretColor: "#2563eb" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showConfirm ? (
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

            {/* Create Account button */}
            <button
              type="submit"
              className="relative w-full py-3.5 rounded-[14px] text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.985] transition-transform"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              Create Account
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

            {/* Google signup (visual only, no real handler in original file) */}
            <button
              type="button"
              className="w-full py-3.5 rounded-[14px] text-[13px] font-medium flex items-center justify-center gap-2.5 border border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:text-slate-800 transition-all"
              style={{ boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            <p className="text-center text-slate-400 text-[13px] mt-5">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </form>
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

export default Signup;