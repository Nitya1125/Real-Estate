import React, { useEffect, useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900">

      {/* Header */}
      <div className="px-6 md:px-16 pt-10 pb-7 border-b border-stone-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>

          {/* Back to Profile Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-stone-400 hover:text-neutral-800 transition-colors duration-200 mb-5 group"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </button>

          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone-400 mb-1.5">
            My Collection
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 leading-none">
            Wishlist
          </h1>
        </div>

        <p className="text-sm text-stone-400 font-normal sm:mb-1">
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "property" : "properties"} saved
        </p>
      </div>

      {/* Body */}
      <div className="px-6 md:px-16 py-12">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg
              className="w-16 h-16 text-stone-300 mb-6"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 54S8 38 8 22a12 12 0 0124 0 12 12 0 0124 0c0 16-24 32-24 32z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <p className="text-2xl font-semibold text-neutral-700 mb-2">
              No saved properties yet
            </p>
            
            <p className="text-sm text-stone-400">
              Properties you save will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {wishlist.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-stone-200 rounded overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${property.image}`}
                    alt={property.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Saved Badge */}
                  <span className="absolute top-3 left-3 bg-stone-50/90 backdrop-blur-sm border border-stone-200 text-[10px] font-medium tracking-[0.12em] uppercase text-stone-500 px-2.5 py-1 rounded-sm">
                    Saved
                  </span>

                  {/* Heart Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-stone-50/90 backdrop-blur-sm border border-stone-200 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                    <svg
                      className="w-3.5 h-3.5 fill-red-500 stroke-red-500"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path d="M12 21S3 14 3 8a5 5 0 0110 0 5 5 0 0110 0c0 6-9 13-9 13z" />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 border-t border-stone-100">

                  {/* Location */}
                  <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-stone-400 mb-1.5">
                    <svg
                      className="w-2.5 h-2.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    {property.location}
                  </p>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-neutral-800 leading-snug mb-3 tracking-tight">
                    {property.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-7 h-px bg-stone-300 mb-3" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-medium text-stone-500">₹</span>
                      <span className="text-2xl font-bold text-neutral-900 tracking-tight leading-none">
                        {Number(property.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] uppercase text-stone-400 group-hover:text-neutral-800 transition-colors duration-200">
                      View
                      <svg
                        className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;