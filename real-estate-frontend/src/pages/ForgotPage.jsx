import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";
import { useToast } from "../context/ToastContext";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { success, error } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/auth/forgot-password`,
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
        success("Reset link sent to your email.");
      } else {
        setMessage(data.message);
        error(data.message || "Could not send reset link.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Server error");
      error("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-5" style={{ background: "#f0f4ff" }}>
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

      {/* Floating glass card */}
      <div className="relative w-full max-w-[460px]">
        <div
          className="relative rounded-3xl p-8 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow: "0 24px 80px rgba(15,23,42,0.15), 0 4px 16px rgba(15,23,42,0.08)",
          }}
        >
          {/* Decorative orb inside card */}
          <div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(199,214,255,0.6) 0%, transparent 70%)" }}
          />

          {/* Close / back button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-all"
            aria-label="Back to sign in"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}
          >
            <svg className="w-[22px] h-[22px] text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="15" r="4" />
              <path d="M10.5 12.5L20 3M20 3h-4M20 3v4" />
            </svg>
          </div>

          <h3
            className="text-[22px] font-bold text-slate-900 mb-1.5 tracking-tight"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Forgot your password?
          </h3>
          <p className="text-slate-400 text-[13px] leading-relaxed mb-7">
            Enter your registered email address and we'll send you a secure link to reset it in seconds.
          </p>

          {/* Message banner (kept as inline conditional, same as original logic) */}
          {message && (
            <div
              className={`px-4 py-3 rounded-xl mb-5 text-[13px] border ${
                message.toLowerCase().includes("sent")
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-[14px] text-slate-800 placeholder-slate-300 outline-none"
                  style={{ caretColor: "#2563eb" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3.5 rounded-[14px] text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.985] transition-transform disabled:opacity-70 disabled:hover:scale-100"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              {loading ? (
                <span className="w-[18px] h-[18px] rounded-full border-2 border-white/40 border-t-white block animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  Send Reset Link
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full mt-3 py-2.5 text-[13px] text-slate-400 hover:text-slate-700 font-medium transition-colors"
            >
              ← Back to Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;