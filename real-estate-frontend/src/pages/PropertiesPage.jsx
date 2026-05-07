import React, { useEffect, useState } from "react";
import  {motion}  from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/properties?page=${page}`
        );

        const data = await res.json();
        console.log("API DATA:", data);

        setProperties(data.properties || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
  }, [page]);



  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-32 pb-20">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10"
        >
          Explore Properties
        </motion.h1>

        {/* SHOW IF NO DATA */}
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <img
                  src={
                    p.image
                      ? `http://localhost:5000/uploads/${p.image}`
                      : "https://via.placeholder.com/400"
                  }
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-semibold">{p.title}</h2>
                  <p className="text-gray-500 text-sm">{p.location}</p>

                  <div className="flex justify-between text-sm mt-2">
                    <span>{p.bedrooms} Beds</span>
                    <span>{p.bathrooms} Baths</span>
                    <span>{p.area} sqft</span>
                  </div>

                  <p className="text-green-600 font-bold mt-2">
                    ₹{p.price}
                  </p>

                  <button
                    onClick={() => navigate(`/properties/${p._id}`)}
                    className="mt-2 bg-black text-white py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PropertiesPage;