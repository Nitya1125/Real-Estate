import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Brain, Building2, TrendingUp } from "lucide-react";
import house from "../assets/house.jpeg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const features = [
  "AI-powered property price prediction",
  "Real-time market trend analysis",
  "Smart property recommendations",
  "Verified property listings",
];

const stats = [
  {
    icon: <Building2 size={28} />,
    number: "300+",
    label: "Properties Listed",
  },
  {
    icon: <Brain size={28} />,
    number: "95%",
    label: "AI Prediction Accuracy",
  },
  {
    icon: <TrendingUp size={28} />,
    number: "24/7",
    label: "Market Insights",
  },
];

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="bg-[#f6f7fb] min-h-screen overflow-hidden">
      <Navbar />

      <section className="max-w-[1500px] mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={house}
              alt="About HomeVerse"
              className="w-full h-[650px] object-cover rounded-[36px] shadow-2xl"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[36px]" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-5 rounded-3xl shadow-xl"
            >
              <h3 className="text-3xl font-black text-[#111827]">
                HomeVerse
              </h3>

              <p className="text-gray-600 mt-1">
                Smart Real Estate Platform
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[6px] text-sm font-semibold text-gray-400">
              About HomeVerse
            </p>

            <h1 className="text-5xl md:text-6xl font-black text-[#111827] leading-[1.1] mt-6">
              AI-Powered Real Estate
              <span className="block text-gray-400 mt-2">
                Designed for Modern Buyers
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-9 max-w-2xl">
              HomeVerse is a modern AI-driven real estate platform
              built to simplify property discovery and pricing.
              Our intelligent system analyzes property trends,
              location data, and market insights to help users
              make smarter and faster real estate decisions.
            </p>

            <div className="mt-10 space-y-5">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#111827] flex items-center justify-center text-white">
                    <CheckCircle size={20} />
                  </div>

                  <span className="text-gray-700 font-medium text-[16px]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-5 mt-12 flex-wrap">
              <button onClick={() => navigate("/properties")} className="bg-[#111827] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg">
                Explore Properties
              </button>

              <button className="bg-white border border-gray-200 text-[#111827] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-28"
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#111827] text-white flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h2 className="text-5xl font-black text-[#111827]">
                {item.number}
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-28 bg-[#111827] rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-6xl font-black leading-tight relative z-10">
            The Future of Real Estate
            <span className="block mt-3 text-gray-300">
              Starts with AI
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-300 leading-9 relative z-10">
            HomeVerse combines modern design, intelligent
            analytics, and machine learning to transform
            the way people buy, sell, and discover homes.
          </p>

          <button onClick={() => navigate("/Properties")} className="relative z-10 mt-10 bg-white text-[#111827] px-10 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300">
            Get Started
          </button>
        </motion.div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;