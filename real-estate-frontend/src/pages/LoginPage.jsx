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
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white antialiased selection:bg-slate-900 selection:text-white">
      
      {/* SECTION 1: LUXURY VISUAL SIDE (Top banner on mobile, Left side on desktop) */}
      <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-slate-950 overflow-hidden h-60 sm:h-80 lg:h-full">
        {/* High-res Luxury Glass Mansion */}
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
          alt="HomeVerse Luxury Real Estate"
          className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-1000 hover:scale-105"
        />
        {/* Sleek cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-t" />
        
        {/* Top Branding Element */}
        <div className="relative z-10 flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <span className="font-black tracking-tighter text-sm">H</span>
          </div>
          <span className="font-bold text-sm tracking-widest uppercase">HomeVerse</span>
        </div>

        {/* Bottom Editorial Content (Hidden on small mobile headers to keep it clean, visible on desktop) */}
        <div className="relative z-10 text-white max-w-md hidden sm:block lg:block">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-slate-300 block mb-2 lg:mb-3">
            Elite Access Portal
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-2 lg:mb-4">
            Experience real estate refined to its absolute finest.
          </h1>
          <p className="text-slate-300 text-xs lg:text-sm leading-relaxed font-medium opacity-90 hidden lg:block">
            Welcome to your administrative dashboard. Manage properties, review exclusive listings, and connect with global clientele effortlessly.
          </p>
        </div>
      </div>

      {/* SECTION 2: FULL SCREEN AUTH FORM */}
      <div className="w-full h-full flex flex-col justify-center px-6 py-10 sm:py-14 sm:px-16 md:px-24 lg:px-20 xl:px-32 bg-white relative">
        
        {/* Container for absolute centering without structural constraints */}
        <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Segment */}
          <div className="space-y-2 sm:space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-700 text-[10px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full border border-slate-200">
              <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure Cloud Access
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Please enter your credentials to access your HomeVerse account.
            </p>
          </div>

          {/* Form Interactive Block */}
          <div className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </span>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-slate-400 hover:text-slate-900 transition-colors duration-150 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-12 py-3 text-sm text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-900 transition-colors duration-150"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 text-slate-400" />
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

            {/* Main Action Call */}
            <button
              onClick={handleLogin}
              className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md mt-2"
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Integration Frame */}
          <div className="space-y-4">
            <div className="w-full flex justify-center">
              <div className="w-full rounded-xl overflow-hidden border border-slate-200 transition-opacity hover:opacity-95">
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
            </div>

            <p className="text-sm text-slate-500 font-medium text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-slate-900 font-bold hover:underline underline-offset-2 transition-all duration-150"
              >
                Sign up free
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;