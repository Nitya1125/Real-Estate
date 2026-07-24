import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

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
        const res = await fetch(`https://real-estate-dhap.onrender.com/api/properties?page=${page}`);
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
        `https://real-estate-dhap.onrender.com/api/properties/search?location=${searchlocation}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&property_type=${propertyType}`
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
    "w-full bg-slate-50/60 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 px-4 py-3 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-200";

  return (
    <>
      <div className="relative min-h-screen overflow-hidden" style={{ background: "#f4f6fc" }}>
        {/* ── Soft brand orbs (background only, sits behind everything) ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: 650,
              height: 650,
              left: "-12%",
              top: "-18%",
              background: "radial-gradient(circle, rgba(199,214,255,0.45) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              right: "-8%",
              top: "10%",
              background: "radial-gradient(circle, rgba(186,230,255,0.35) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10">
          <Navbar />

          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-28 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-1.5 bg-white text-blue-700 text-[10px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm mb-4">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
                Curated Listings
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                Explore Properties
              </h1>

              <p className="text-slate-500 mt-3 text-sm md:text-base">
                Find your perfect home from our curated listings
              </p>
            </motion.div>

            {/* ── Filter card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[32px] p-6 mb-12"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 10px 50px rgba(15,23,42,0.06)",
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-4">
                <div className="lg:col-span-2 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
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
                  className="flex items-center gap-2 text-white text-sm font-semibold px-7 py-3 rounded-2xl transition-all duration-300 active:scale-95 hover:scale-[1.01]"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 6px 24px rgba(37,99,235,0.28)",
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  Search
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 text-sm font-semibold px-5 py-3 rounded-2xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Reset
                </button>

                {properties.length > 0 && (
                  <span className="ml-auto text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl">
                    {properties.length} results found
                  </span>
                )}
              </div>
            </motion.div>

            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}
                >
                  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>

                <p className="text-lg font-bold text-slate-700 mb-1">No properties found</p>
                <p className="text-sm text-slate-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((p, i) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="bg-white rounded-[30px] overflow-hidden border border-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.05)] hover:border-blue-100 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(`/properties/${p._id}`)}
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={
                          p.image
                            ? `https://real-estate-dhap.onrender.com/uploads/${p.image}`
                            : "https://images.unsplash.com/photo-1518791841217-8f162f1e3631?auto=format&fit=crop&w=800&q=60"
                        }
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                      <span
                        className="absolute top-4 left-4 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-sm"
                        style={{
                          background: "rgba(37,99,235,0.35)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        {p.property_type || "Property"}
                      </span>

                      <span
                        className="absolute bottom-4 right-4 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg tracking-wide"
                        style={{
                          background: "rgba(15,23,42,0.5)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        ₹{Number(p.price).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="font-bold text-slate-900 text-[22px] leading-snug mb-2 line-clamp-1" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
                        {p.title}
                      </h2>

                      <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        <span className="truncate">{p.location}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <span className="flex items-center gap-1.5 bg-blue-50/70 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl flex-1 justify-center">
                          <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          {p.bedrooms} Beds
                        </span>

                        <span className="flex items-center gap-1.5 bg-blue-50/70 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl flex-1 justify-center">
                          <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h3M20 12a2 2 0 002-2V6a2 2 0 00-2-2h-3M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
                          </svg>
                          {p.bathrooms} Baths
                        </span>

                        <span className="flex items-center gap-1.5 bg-blue-50/70 text-slate-600 text-xs font-semibold px-3 py-2 rounded-xl flex-1 justify-center">
                          <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                        className="w-full text-white text-sm font-bold py-3.5 rounded-2xl transition-all duration-300 active:scale-95 hover:scale-[1.01]"
                        style={{
                          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                          boxShadow: "0 6px 20px rgba(37,99,235,0.25)",
                        }}
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
                  className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-11 h-11 rounded-2xl text-sm font-bold transition-all duration-200 ${
                      page === i + 1
                        ? "text-white shadow-lg"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                    }`}
                    style={
                      page === i + 1
                        ? { background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", boxShadow: "0 6px 20px rgba(37,99,235,0.3)" }
                        : undefined
                    }
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertiesPage;