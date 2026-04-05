import { motion } from "framer-motion";
import house from "../assets/house.jpeg";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <section className="max-w-[1500px] mx-auto px-6 md:px-10 py-24">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src={house}
            className="w-full h-[450px] object-cover rounded-3xl shadow-lg"
          />
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 blur-2xl opacity-40 -z-10"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            AI That Helps You <br /> Buy Better Homes
          </h2>

          <p className="mt-5 text-gray-500 leading-relaxed">
            Our platform uses machine learning to analyze property data and 
            predict accurate prices based on location, size, and features.
          </p>

          <div className="mt-6 space-y-4">

            {[
              "Accurate AI predictions",
              "Real-time market insights",
              "Smart decision making",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-gray-700"
              >
                <CheckCircle size={20} className="text-black" />
                {item}
              </motion.div>
            ))}

          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="mt-8 bg-black text-white px-7 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Learn More
          </motion.button>

        </motion.div>

      </div>

    </section>
  );
};

export default About;