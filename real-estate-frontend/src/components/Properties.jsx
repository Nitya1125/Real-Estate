import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE, uploadsUrl } from "../config/api";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/properties`
        );

        const data = await res.json();

        const list = Array.isArray(data.properties)
          ? data.properties
          : Array.isArray(data)
            ? data
            : [];

        const latestProperties = list.slice(-3).reverse();

        setProperties(latestProperties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const card = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-[1500px] mx-auto px-6 py-24"
    >
      <div className="text-center mb-14">
        <h2 className="text-4xl font-black text-[#111827]">
          Featured Properties
        </h2>

        <p className="text-gray-500 mt-3">
          Explore our latest premium listings
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {properties.map((property) => (
          <motion.div
            key={property._id}
            variants={card}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="group bg-white rounded-[28px] border border-gray-100 shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={
                  property.image
                    ? uploadsUrl(property.image)
                    : "https://placehold.co/600x400"
                }
                alt={property.title}
                className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-[#111827] shadow-sm">
                {property.type}
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-5 py-2 rounded-2xl font-bold shadow-lg">
                ₹
                {Number(property.price).toLocaleString(
                  "en-IN"
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#111827] line-clamp-1">
                {property.title}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                {property.location}
              </p>

              <div className="flex justify-between mt-6 bg-[#f9fafb] rounded-2xl px-5 py-4 text-sm text-gray-700">
                <span>
                  {property.bedrooms} Beds
                </span>

                <span>
                  {property.bathrooms} Baths
                </span>

                <span>
                  {property.area} sqft
                </span>
              </div>

              <Link
                to={`/properties/${property._id}`}
              >
                <button className="mt-6 w-full bg-[#111827] text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Properties;