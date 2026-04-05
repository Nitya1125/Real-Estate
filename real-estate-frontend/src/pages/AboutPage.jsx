import React from "react";
import { motion } from "framer-motion";
import house from "../assets/house.jpeg";
import Navbar from "../components/Navbar";
import { CheckCircle } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-[#f8f9fb] min-h-screen">

      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-32 pb-20">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={house}
              alt="about"
              className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
            />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-black/5 rounded-3xl"></div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <p className="text-sm text-gray-400 uppercase tracking-widest">
              About Us
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
              AI-Powered Real Estate <br />
              <span className="text-gray-500">Built for the Future</span>
            </h1>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-lg">
              HomeVerse uses cutting-edge AI to help users find the perfect property.
              From smart price predictions to real-time market insights,
              we make real estate faster, smarter, and more reliable.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">

              {[
                "Accurate AI price prediction",
                "Real-time market insights",
                "Smart property recommendations",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle size={20} className="text-black" />
                  <span>{item}</span>
                </div>
              ))}

            </div>

            {/* BUTTON */}
            <button className="mt-10 bg-black text-white px-7 py-3 rounded-full text-sm hover:bg-gray-800 transition">
              Learn More
            </button>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;