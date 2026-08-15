import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LogOut,
  Heart,
  ChevronLeft,
  Mail,
  User,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE } from "../config/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_BASE}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const firstLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <>
      <div className="relative min-h-screen overflow-hidden text-slate-900 font-sans antialiased" style={{ background: "#f4f6fc" }}>
        {/* ── Soft brand orbs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: 650,
              height: 650,
              left: "-12%",
              top: "-18%",
              background: "radial-gradient(circle, rgba(199,214,255,0.45) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              right: "-8%",
              top: "10%",
              background: "radial-gradient(circle, rgba(186,230,255,0.35) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10">
          <Navbar />

          <main className="max-w-6xl mx-auto px-6 pb-16 mt-48">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ── Profile card ── */}
              <div className="lg:col-span-1">
                <div
                  className="rounded-[32px] p-8 flex flex-col items-center text-center"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 10px 50px rgba(15,23,42,0.06)",
                  }}
                >
                  <div className="relative">
                    <div
                      className="w-36 h-36 rounded-full text-white flex items-center justify-center text-5xl font-bold shadow-[0_15px_40px_rgba(37,99,235,0.3)]"
                      style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
                    >
                      {firstLetter}
                    </div>

                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full" />
                  </div>

                  <h1
                    className="text-3xl font-bold mt-7 text-slate-900"
                    style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    {user?.name}
                  </h1>

                  <p className="text-slate-400 text-sm mt-1">{user?.email}</p>

                  <div className="mt-5 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold tracking-wide text-blue-700 uppercase">
                    Premium Member
                  </div>

                  <div className="w-full h-px bg-slate-100 my-8" />

                  <button
                    onClick={handleLogout}
                    className="w-full group flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all border border-slate-100 hover:border-red-100"
                  >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Logout Account
                  </button>
                </div>
              </div>

              {/* ── Right column ── */}
              <div className="lg:col-span-2 space-y-6">
                <div
                  className="rounded-[32px] overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 10px 50px rgba(15,23,42,0.06)",
                  }}
                >
                  <div className="px-8 py-6 border-b border-slate-100">
                    <h3 className="font-bold text-2xl text-slate-900" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                      Personal Information
                    </h3>
                  </div>

                  <div className="p-8 grid gap-8">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                        <User size={22} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                          Full Name
                        </p>
                        <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                        <Mail size={22} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                          Email Address
                        </p>
                        <h2 className="text-xl font-bold text-slate-900 break-all">{user?.email}</h2>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-5">
                        <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                          <ShieldCheck size={22} />
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                            Account Security
                          </p>
                          <h2 className="text-xl font-bold font-mono text-slate-900">
                            {showPassword ? user?.password || "Protected" : "••••••••"}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => navigate("/wishlist")}
                  className="rounded-[32px] p-8 flex items-center justify-between cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 10px 50px rgba(15,23,42,0.06)",
                  }}
                >
                  <div className="flex items-center gap-5">
                    <div className="p-5 bg-blue-50 rounded-2xl text-blue-600">
                      <Heart size={28} fill={user?.wishlist?.length > 0 ? "currentColor" : "none"} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                        Your Wishlist
                      </h3>
                      <p className="text-slate-500 mt-1">
                        {user?.wishlist?.length || 0} properties saved to your collection
                      </p>
                    </div>
                  </div>

                  <div
                    className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl text-blue-600 group-hover:text-white transition-all duration-300"
                    style={{ background: "rgba(37,99,235,0.08)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(37,99,235,0.08)")}
                  >
                    <ChevronLeft size={24} className="rotate-180" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;