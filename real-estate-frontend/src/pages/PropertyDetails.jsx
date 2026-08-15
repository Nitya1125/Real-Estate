import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { API_BASE, uploadsUrl } from '../config/api';
import { useToast } from '../context/ToastContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/properties/${id}`);
        const data = await res.json();

        setProperty(data.property);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSaveWishList = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE}/api/users/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: property._id })
      });

      const data = await res.json();

      setSaved(true);
      success(data.message || "Added to wishlist.");
    } catch (err) {
      console.log(err);
      error("Could not save this property.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f4ff' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#111827] border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400 font-medium">
            Loading property...
          </p>
        </div>
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f4ff' }}>
        <p className="text-gray-500 text-lg font-semibold">
          Property not found
        </p>
      </div>
    );

  const stats = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: 'Bedrooms',
      value: property.bedrooms,
      color: 'bg-gray-100 text-[#64748b]'
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h3M20 12a2 2 0 002-2V6a2 2 0 00-2-2h-3M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
        </svg>
      ),
      label: 'Bathrooms',
      value: property.bathrooms,
      color: 'bg-gray-100 text-[#64748b]'
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      label: 'Area',
      value: `${property.area} sqft`,
      color: 'bg-gray-100 text-[#64748b]'
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      label: 'Location',
      value: property.location,
      color: 'bg-gray-100 text-[#64748b]'
    }
  ];

  return (
    <>
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10" style={{ background: '#f0f4ff' }}>
        {/* ── Same ambient orb background used on Login / Signup / Forgot Password ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full"
            style={{
              width: 700,
              height: 700,
              left: '-10%',
              top: '-15%',
              background: 'radial-gradient(circle, rgba(199,214,255,0.65) 0%, transparent 70%)',
              animation: 'drift-a 18s ease-in-out infinite'
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 550,
              height: 550,
              right: '30%',
              bottom: '-10%',
              background: 'radial-gradient(circle, rgba(186,230,255,0.55) 0%, transparent 70%)',
              animation: 'drift-b 22s ease-in-out infinite'
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              right: '-5%',
              top: '20%',
              background: 'radial-gradient(circle, rgba(224,231,255,0.7) 0%, transparent 70%)',
              animation: 'drift-c 15s ease-in-out infinite'
            }}
          />
        </div>

        {/* ── The pop card itself ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 w-full max-w-4xl rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 md:p-8 my-4 sm:my-6"
          style={{
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.95)',
            boxShadow: '0 24px 80px rgba(15,23,42,0.15), 0 4px 16px rgba(15,23,42,0.08)'
          }}
        >
          {/* Close button — solid white circle so it stays visible over the photo underneath it, at every screen size */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Close and go back to listings"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-slate-600 bg-white hover:bg-slate-50 hover:scale-105 active:scale-95 border border-slate-100 shadow-lg transition-all duration-200 z-30"
          >
            <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Hero image */}
          <div className="relative w-full h-[220px] sm:h-[340px] md:h-[420px] rounded-[20px] sm:rounded-[26px] overflow-hidden mb-5 sm:mb-7">
            <img
              src={uploadsUrl(property.image)}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-7 pb-4 sm:pb-6 md:pb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 sm:py-1.5 rounded-full border border-white/30 mb-2 sm:mb-3">
                  {property.property_type || 'Property'}
                </span>

                <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-lg break-words">
                  {property.title}
                </h1>

                <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-white/80 text-xs sm:text-sm">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span className="truncate">{property.location}</span>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-xl border border-white/20 text-white px-4 sm:px-5 py-3 rounded-[18px] sm:rounded-[22px] shadow-2xl shadow-black/20 text-left sm:text-right flex-shrink-0 self-start sm:self-auto">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase text-white/70 mb-0.5 sm:mb-1">
                  Asking Price
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-black leading-none">
                  ₹{Number(property.price).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Listed date */}
          <p className="text-[11px] font-semibold text-slate-400 mb-5 sm:mb-6">
            Listed{' '}
            {new Date(property.createdAt).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-7">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-[18px] sm:rounded-[24px] p-4 sm:p-5 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 ${s.color}`}>
                  {s.icon}
                </div>

                <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] sm:tracking-[0.18em] mb-1">
                  {s.label}
                </p>

                <p className="text-base sm:text-lg font-black text-[#111827] truncate">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-7">
            {/* Left: description + specs */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              <div className="bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg sm:text-xl font-black text-[#111827] mb-4 sm:mb-5 flex items-center gap-3">
                  <span className="w-1 h-5 sm:h-6 bg-[#111827] rounded-full inline-block" />
                  About this Property
                </h2>

                <p className="text-gray-500 text-sm sm:text-[15px] leading-7 sm:leading-8">
                  {property.description ||
                    `This stunning ${
                      property.property_type || 'property'
                    } is located in the heart of ${
                      property.location
                    }, offering ${
                      property.bedrooms
                    } spacious bedrooms and ${
                      property.bathrooms
                    } modern bathrooms across ${
                      property.area
                    } sqft of premium living space.`}
                </p>
              </div>

              <div className="bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg sm:text-xl font-black text-[#111827] mb-4 sm:mb-5 flex items-center gap-3">
                  <span className="w-1 h-5 sm:h-6 bg-[#111827] rounded-full inline-block" />
                  Property Specifications
                </h2>

                <div className="divide-y divide-gray-100">
                  {[
                    {
                      label: 'Property Type',
                      value: property.property_type || '—'
                    },
                    {
                      label: 'Total Area',
                      value: `${property.area} sqft`
                    },
                    {
                      label: 'Bedrooms',
                      value: property.bedrooms
                    },
                    {
                      label: 'Bathrooms',
                      value: property.bathrooms
                    },
                    {
                      label: 'Location',
                      value: property.location
                    },
                    {
                      label: 'Listed On',
                      value: new Date(property.createdAt).toLocaleDateString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }
                      )
                    }
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 sm:py-4 gap-3"
                    >
                      <span className="text-xs sm:text-sm text-gray-400 font-medium flex-shrink-0">
                        {row.label}
                      </span>

                      <span className="text-xs sm:text-sm font-bold text-[#111827] text-right truncate">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: price + actions */}
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <p className="text-gray-300 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  Asking Price
                </p>

                <p className="text-2xl sm:text-3xl font-black mb-4">
                  ₹{Number(property.price).toLocaleString('en-IN')}
                </p>

                <div className="h-px bg-white/10 mb-4" />

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-300">
                  <span>{property.area} sqft</span>
                  <span>·</span>
                  <span>{property.bedrooms} Beds</span>
                  <span>·</span>
                  <span>{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="bg-white rounded-[22px] sm:rounded-[28px] p-5 sm:p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#111827] mb-1">
                    Interested in this property?
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400">
                    Take action before it's gone.
                  </p>
                </div>

                <button onClick={ () => navigate(`/request/visit/${property._id}`)} className="w-full bg-gradient-to-r from-[#111827] to-[#1f2937] hover:opacity-95 active:scale-95 text-white text-xs sm:text-sm font-bold py-3 sm:py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>

                  Request a Viewing
                </button>

                <button
                  onClick={handleSaveWishList}
                  className={`w-full active:scale-95 text-xs sm:text-sm font-bold py-3 sm:py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border ${
                    saved
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${
                      saved
                        ? 'fill-rose-500 stroke-rose-500'
                        : 'fill-none stroke-current'
                    }`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>

                  {saved ? 'Saved to Wishlist' : 'Save to Wishlist'}
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-[18px] sm:rounded-[24px] p-4 flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>

                <p className="text-xs sm:text-[13px] text-amber-700 font-medium leading-relaxed">
                  Prices and availability are subject to change. Contact the
                  agent for the latest information.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetails;