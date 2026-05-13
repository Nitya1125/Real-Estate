import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchlocation, setSearchLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [propertyType, setPropertyType] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties?page=${page}`);
        const data = await res.json();

        setProperties(data.properties || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
  }, [page]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/properties/search?location=${searchlocation}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&property_type=${propertyType}`
      );

      const data = await res.json();
      setProperties(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setSearchLocation("");
    setBedrooms("");
    setBathrooms("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setPropertyType("");
    window.location.reload();
  };

  const inputClass =
    "w-full bg-white border border-gray-200 text-sm text-gray-600 placeholder-gray-400 px-4 py-2.5 rounded-2xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200";

  return (
    <div className="bg-[#f6f7fb] min-h-screen">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
            Explore Properties
          </h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Find your perfect home from our curated listings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-gray-100 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-4">
            <div className="lg:col-span-2 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Location"
                className={`${inputClass} pl-11`}
                value={searchlocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>

              <input
                type="number"
                placeholder="Beds"
                className={`${inputClass} pl-11`}
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h3M20 12a2 2 0 002-2V6a2 2 0 00-2-2h-3M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
                </svg>
              </span>

              <input
                type="number"
                placeholder="Baths"
                className={`${inputClass} pl-11`}
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                ₹
              </span>

              <input
                type="number"
                placeholder="Min Price"
                className={`${inputClass} pl-9`}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                ₹
              </span>

              <input
                type="number"
                placeholder="Max Price"
                className={`${inputClass} pl-9`}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type="number"
                placeholder="Min Area (sqft)"
                className={inputClass}
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className={`${inputClass} w-auto min-w-[180px]`}
            >
              <option value="">All Property Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>

            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-gradient-to-r from-[#111827] to-[#1e293b] hover:opacity-95 active:scale-95 text-white text-sm font-semibold px-7 py-2.5 rounded-2xl transition-all duration-300 shadow-lg shadow-gray-300/40"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>

              Search
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>

              Reset
            </button>

            {properties.length > 0 && (
              <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-4 py-2 rounded-xl">
                {properties.length} results found
              </span>
            )}
          </div>
        </motion.div>

        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>

            <p className="text-lg font-bold text-gray-700 mb-1">
              No properties found
            </p>

            <p className="text-sm text-gray-400">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-[30px] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:border-gray-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/properties/${p._id}`)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={
                      p.image
                        ? `http://localhost:5000/uploads/${p.image}`
                        : "https://images.unsplash.com/photo-1518791841217-8f162f1e3631?auto=format&fit=crop&w=800&q=60"
                    }
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-sm">
                    {p.property_type || "Property"}
                  </span>

                  <span className="absolute bottom-4 right-4 bg-gradient-to-r from-black/35 to-black/20 backdrop-blur-md border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg shadow-black/10 tracking-wide">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="font-black text-[#111827] text-[22px] leading-snug mb-2 line-clamp-1">
                    {p.title}
                  </h2>

                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-5">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>

                    <span className="truncate">{p.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl flex-1 justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-[#64748b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>

                      {p.bedrooms} Beds
                    </span>

                    <span className="flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl flex-1 justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-[#64748b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h3M20 12a2 2 0 002-2V6a2 2 0 00-2-2h-3M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
                      </svg>

                      {p.bathrooms} Baths
                    </span>

                    <span className="flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl flex-1 justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-[#64748b]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>

                      {p.area} sqft
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/properties/${p._id}`);
                    }}
                    className="w-full bg-gradient-to-r from-[#111827] to-[#1e293b] hover:opacity-95 text-white text-sm font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95"
                  >
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-11 h-11 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  page === i + 1
                    ? "bg-[#111827] text-white shadow-lg shadow-gray-300"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;