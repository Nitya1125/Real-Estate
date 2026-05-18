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

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://real-estate-dhap.onrender.com/api/users/me",
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
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900 font-sans antialiased">
      <nav className="max-w-6xl mx-auto px-6 py-8 flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md px-6 py-4 rounded-2xl text-base font-bold text-[#111827] transition-all duration-300"
        >
          <ChevronLeft size={22} />
          Back to Dashboard
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#111827] to-[#1f2937] text-white flex items-center justify-center text-5xl font-black shadow-[0_15px_40px_rgba(0,0,0,0.18)]">
                  {firstLetter}
                </div>

                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <h1 className="text-3xl font-black mt-7 text-[#111827]">
                {user?.name}
              </h1>

              <p className="text-gray-400 text-sm mt-1">
                {user?.email}
              </p>

              <div className="mt-5 px-4 py-2 bg-gray-100 rounded-full text-xs font-bold tracking-wide text-gray-500 uppercase">
                Premium Member
              </div>

              <div className="w-full h-[1px] bg-gray-100 my-8"></div>

              <button
                onClick={handleLogout}
                className="w-full group flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-100 hover:border-red-100"
              >
                <LogOut
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />

                Logout Account
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100">
                <h3 className="font-black text-2xl text-[#111827]">
                  Personal Information
                </h3>
              </div>

              <div className="p-8 grid gap-8">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-gray-100 rounded-2xl text-[#111827]">
                    <User size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                      Full Name
                    </p>

                    <h2 className="text-xl font-bold text-[#111827]">
                      {user?.name}
                    </h2>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-4 bg-gray-100 rounded-2xl text-[#111827]">
                    <Mail size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                      Email Address
                    </p>

                    <h2 className="text-xl font-bold text-[#111827] break-all">
                      {user?.email}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-gray-100 rounded-2xl text-[#111827]">
                      <ShieldCheck size={22} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                        Account Security
                      </p>

                      <h2 className="text-xl font-bold font-mono text-[#111827]">
                        {showPassword
                          ? user?.password || "Protected"
                          : "••••••••"}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("/wishlist")}
              className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex items-center justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 group"
            >
              <div className="flex items-center gap-5">
                <div className="p-5 bg-gray-100 rounded-2xl text-[#111827]">
                  <Heart
                    size={28}
                    fill={
                      user?.wishlist?.length > 0
                        ? "currentColor"
                        : "none"
                    }
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#111827]">
                    Your Wishlist
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {user?.wishlist?.length || 0} properties
                    saved to your collection
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 text-gray-500 group-hover:bg-[#111827] group-hover:text-white transition-all duration-300">
                <ChevronLeft
                  size={24}
                  className="rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;