import { useEffect, useState } from "react";
import Logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { API_BASE } from "../config/api";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Properties", path: "/properties" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full justify-center px-2 sm:px-0">
      <div className="mt-3 flex w-[96%] max-w-[1600px] items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-3 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:mt-4 md:w-[90%] md:px-8 md:py-4">
        <div
          className="flex min-w-0 cursor-pointer items-center gap-2 md:gap-3"
          onClick={() => navigate("/dashboard")}
        >
          <img src={Logo} alt="HOMEVERSE" className="h-10 shrink-0 md:h-14" />
          <span className="truncate text-base font-semibold tracking-wide text-gray-900 sm:text-xl">
            HomeVerse
          </span>
        </div>

        <ul className="hidden gap-8 text-[17px] font-medium text-gray-600 lg:flex xl:gap-10 xl:text-[19px]">
          {navItems.map((item) => (
            <li key={item.path} className="group relative cursor-pointer">
              <Link to={item.path} className="transition duration-300 group-hover:text-black">
                {item.name}
              </Link>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group flex items-center gap-2 focus:outline-none sm:gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-base font-bold text-white md:h-11 md:w-11 md:text-lg">
                {firstLetter}
              </div>
              <span className="hidden font-medium text-gray-800 sm:block">Profile</span>
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute right-0 z-20 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white py-3 shadow-2xl">
                  <div className="mb-2 border-b border-gray-50 px-4 py-2">
                    <p className="text-xs uppercase tracking-wider text-gray-400">Account</p>
                    <p className="truncate text-sm font-semibold text-gray-900">{user?.name}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 transition hover:bg-gray-50 hover:text-black"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-gray-700 transition hover:bg-gray-50 hover:text-black"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-[4.75rem] w-[96%] rounded-2xl bg-white p-5 shadow-xl md:top-24 lg:hidden">
          <ul className="flex flex-col gap-4 text-base font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
