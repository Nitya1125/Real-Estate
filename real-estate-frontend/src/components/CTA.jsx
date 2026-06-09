import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-[1600px] mx-auto px-6 md:px-10 py-20"
    >
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-12 md:p-16 text-center shadow-xl relative overflow-hidden">

        {/* Glow Background */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        {/* TEXT */}
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Find Your Dream Home with AI
        </h2>

        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Experience smarter property search with AI-powered insights,
          accurate pricing, and personalized recommendations.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">

          <motion.button
          onClick={() => navigate("/properties")}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
          >
            Get Started
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.05 }}
            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Contact Us
          </motion.button>

        </div>

      </div>
    </motion.section>
  );
};

export default CTA;