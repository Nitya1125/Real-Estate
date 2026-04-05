import React from "react";
import { motion } from "framer-motion";
import house from "../assets/house.jpeg";
import Navbar from "../components/Navbar";

const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Ahmedabad, Gujarat",
    beds: 3,
    baths: 2,
    area: "2200 sqft",
    image: house,
  },
  {
    id: 2,
    title: "Premium Smart Home",
    location: "Surat, Gujarat",
    beds: 4,
    baths: 3,
    area: "3000 sqft",
    image: house,
  },
  {
    id: 3,
    title: "Minimal Glass House",
    location: "Vadodara, Gujarat",
    beds: 2,
    baths: 2,
    area: "1800 sqft",
    image: house,
  },
];

const PropertiesPage = () => {
  return (
    <div className="bg-[#f8f9fb] min-h-screen">

      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-32 pb-20">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
        >
          Explore Properties
        </motion.h1>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {properties.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt="property"
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {item.location}
                </p>

                {/* DETAILS */}
                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <span>{item.beds} Beds</span>
                  <span>{item.baths} Baths</span>
                  <span>{item.area}</span>
                </div>

                {/* BUTTON */}
                <button className="mt-5 w-full bg-black text-white py-2 rounded-full text-sm hover:bg-gray-800 transition">
                  View Details
                </button>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default PropertiesPage;