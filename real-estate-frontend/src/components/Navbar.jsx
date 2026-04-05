import Logo from "../assets/logo1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {name: "Home", path: "/"},
    {name: "Properties", path:"/properties"},
    {name: "About", path:"/about"},
    {name: "Contact", path:"/contact"}
  ]
  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-center">

      <div className="w-[90%] max-w-[1600px] mt-5 flex items-center justify-between px-8 py-4 
      bg-white/60 backdrop-blur-xl 
      border border-white/40 
      shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
      rounded-2xl transition-all duration-300">

        <div className="flex items-center gap-3 cursor-pointer">
          <img src={Logo} alt="logo" className="h-14" />
          <span className="text-xl font-semibold tracking-wide text-gray-900">
            HomeVerse
          </span>
        </div>

        <ul className="hidden md:flex gap-10 text-gray-600 font-medium text-[19px]">

          {navItems.map((item, index) =>(
            <li key={index} className="relative cursor-pointer group">
              <Link to ={item.path} className="group-hovertext-black transition duration-300">{item.name}</Link>
            </li>
          ))}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>

        </ul>

        {/* BUTTONS */}
        <div className="flex items-center gap-3">

          <Link to="/login" className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 
          hover:bg-gray-100 transition duration-300">
            Login
          </Link>

          <Link to="/signup" className="px-6 py-2 rounded-full bg-black text-white 
          hover:bg-gray-800 transition duration-300 shadow-md hover:scale-105">
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Navbar;