import { motion } from "framer-motion";
import house from "../assets/house.jpeg";

const Properties = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-[1500px] mx-auto px-6 py-20"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Featured Properties
      </h2>

      {/* Cards Container */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            variants={card}
            whileHover={{ y: -10, scale: 1.03 }} // 🔥 hover lift
            className="group bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={house}
                className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Modern Luxury Villa
              </h3>

              <p className="text-gray-500 text-sm">
                Surat, Gujarat
              </p>

              <div className="flex justify-between mt-4 text-sm text-gray-600">
                <span>3 Beds</span>
                <span>2 Baths</span>
                <span>2200 sqft</span>
              </div>

              <button className="mt-5 w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Properties;