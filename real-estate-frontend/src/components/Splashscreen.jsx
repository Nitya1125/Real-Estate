import {motion} from "framer-motion";
import Logo from "../assets/logo1.png";

const Splashscreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f8f9fb]">
      <div className="flex flex-col items-center">

        <motion.img
          src={Logo}
          alt="logo"
          className="h-25"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="mt-4 text-xl font-medium text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          HomeVerse
        </motion.h1>

        <div className="w-40 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </div>

      </div>
    </div>
  );
};

export default Splashscreen