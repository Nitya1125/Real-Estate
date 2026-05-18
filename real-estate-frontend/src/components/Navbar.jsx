import { useEffect, useState } from "react";
import Logo from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);


  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const token = localStorage.getItem("token");
        const res = await axios.get("https://real-estate-dhap.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      }catch(err){
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
    { name: "Contact", path: "/contact" }
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-center">
      <div className="w-[90%] max-w-[1600px] mt-5 flex items-center justify-between px-8 py-4 
      bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl">

        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src={Logo} alt="logo" className="h-14" />
          <span className="text-xl font-semibold tracking-wide text-gray-900">
            HomeVerse
          </span>
        </div>

        {/* NAV LINKS */}
        <ul className="hidden md:flex gap-10 text-gray-600 font-medium text-[19px]">
          {navItems.map((item, index) => (
            <li key={index} className="relative cursor-pointer group">
              <Link to={item.path} className="group-hover:text-black transition duration-300">
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* PROFILE SECTION */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg border-2 border-transparent group-hover:border-black/10 transition-all">
              {firstLetter}
            </div>
            <span className="hidden sm:block font-medium text-gray-800">Profile</span>
          </button>

          {/* DROPDOWN */}
          {isDropdownOpen && (
            <>
              {/* Invisible backdrop to close dropdown when clicking outside */}
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-3 z-20 overflow-hidden transform origin-top-right transition-all">
                <div className="px-4 py-2 border-b border-gray-50 mb-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Account</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                </div>
                
                <Link 
                  name = "profile"
                  to="/profile" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-red-500 hover:bg-red-50 font-medium transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;