import { motion } from "framer-motion";
import { Brain, ShieldCheck, TrendingUp, Home } from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI Price Prediction",
    desc: "Smart pricing powered by ML models.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Transactions",
    desc: "Safe and trusted property deals.",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Market Insights",
    desc: "Real-time trends and analytics.",
  },
  {
    icon: <Home size={28} />,
    title: "Smart Listings",
    desc: "Find properties tailored to you.",
  },
];

const Features = () => {

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
      className="w-full py-24 px-6 bg-white"
    >

      {/* Heading */}
      <motion.div className="text-center mb-16 ">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Choose HomeVerse
        </h2>
        <p className="text-gray-500 mt-3">
          Smart real estate powered by AI
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={card}
            whileHover={{ y: -10, scale: 1.05 }}
            className="group p-6 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition"
          >

            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.2 }}
            >
              {item.icon}
            </motion.div>

            <h3 className="font-semibold text-lg mb-2">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {item.desc}
            </p>

          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  );
};

export default Features;