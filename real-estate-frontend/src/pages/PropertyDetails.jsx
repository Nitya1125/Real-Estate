import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`https://real-estate-dhap.onrender.com/api/properties/${id}`);
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

      const res = await fetch(`https://real-estate-dhap.onrender.com/api/users/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: property._id })
      });

      const data = await res.json();

      setSaved(true);
      alert(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center">
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
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center">
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
    <div className="min-h-screen bg-[#f6f7fb]">
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-2xl text-[15px] font-bold text-[#111827] transition-all duration-300 group shadow-sm"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>

            Back to Listings
          </button>

          <span className="hidden md:block text-xs font-bold tracking-[0.25em] uppercase text-gray-400">
            Property Details
          </span>

          <span className="hidden md:block text-sm text-gray-400 font-medium">
            Listed:{' '}
            {new Date(property.createdAt).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[460px] md:h-[560px] rounded-[36px] overflow-hidden mb-10 shadow-[0_20px_70px_rgba(0,0,0,0.12)]"
        >
          <img
            src={`https://real-estate-dhap.onrender.com/uploads/${property.image}`}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 flex items-end justify-between">
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/30 mb-4">
                {property.property_type || 'Property'}
              </span>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 mt-3 text-white/80 text-sm">
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

                {property.location}
              </div>
            </div>

            <div className="bg-black/25 backdrop-blur-xl border border-white/20 text-white px-6 py-4 rounded-[28px] shadow-2xl shadow-black/20 text-right flex-shrink-0">
              <p className="text-xs font-semibold tracking-wide uppercase text-white/70 mb-1">
                Asking Price
              </p>

              <p className="text-3xl font-black leading-none">
                ₹{Number(property.price).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${s.color}`}
                  >
                    {s.icon}
                  </div>

                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-1">
                    {s.label}
                  </p>

                  <p className="text-lg font-black text-[#111827] truncate">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[32px] p-7 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-black text-[#111827] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#111827] rounded-full inline-block" />
                About this Property
              </h2>

              <p className="text-gray-500 text-[15px] leading-8">
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

            <div className="bg-white rounded-[32px] p-7 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-black text-[#111827] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#111827] rounded-full inline-block" />
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
                    className="flex items-center justify-between py-4"
                  >
                    <span className="text-sm text-gray-400 font-medium">
                      {row.label}
                    </span>

                    <span className="text-sm font-bold text-[#111827]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-5"
          >
            <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-[32px] p-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <p className="text-gray-300 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                Asking Price
              </p>

              <p className="text-4xl font-black mb-5">
                ₹{Number(property.price).toLocaleString('en-IN')}
              </p>

              <div className="h-px bg-white/10 mb-5" />

              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>{property.area} sqft</span>
                <span>·</span>
                <span>{property.bedrooms} Beds</span>
                <span>·</span>
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] space-y-4">
              <div>
                <h3 className="text-lg font-black text-[#111827] mb-1">
                  Interested in this property?
                </h3>

                <p className="text-sm text-gray-400">
                  Take action before it's gone.
                </p>
              </div>

              <button onClick={ () => navigate(`/request/visit/${property._id}`)} className="w-full bg-gradient-to-r from-[#111827] to-[#1f2937] hover:opacity-95 active:scale-95 text-white text-sm font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
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
                className={`w-full active:scale-95 text-sm font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border ${
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

            <div className="bg-amber-50 border border-amber-100 rounded-[28px] p-5 flex items-start gap-3">
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

              <p className="text-sm text-amber-700 font-medium leading-relaxed">
                Prices and availability are subject to change. Contact the
                agent for the latest information.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
};

export default PropertyDetails;