import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-black text-white p-6"
      >
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <ul className="space-y-6 text-gray-300">
          <li className="hover:text-white cursor-pointer">Dashboard</li>
          <li className="hover:text-white cursor-pointer">Add Property</li>
          <li className="hover:text-white cursor-pointer">All Properties</li>
          <li className="hover:text-white cursor-pointer">Users</li>
        </ul>
      </motion.div>

      <div className="flex-1 p-8 overflow-y-auto">

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <button onClick={handleLogout} className="bg-black text-white px-5 py-2 rounded-lg hover:scale-105 transition">
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-8">

          {[ "Properties", "Users", "Revenue" ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow cursor-pointer"
            >
              <h3 className="text-gray-500">Total {item}</h3>
              <p className="text-2xl font-bold mt-2">
                {item === "Revenue" ? "₹2,50,000" : "120"}
              </p>
            </motion.div>
          ))}

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-xl shadow max-w-3xl"
        >
          <h2 className="text-xl font-bold mb-6">Add Property</h2>

          <div className="grid grid-cols-2 gap-4">

            <input className="p-3 border rounded-lg" placeholder="Title" />
            <input className="p-3 border rounded-lg" placeholder="Location" />

            <input className="p-3 border rounded-lg" placeholder="Price" />
            <input className="p-3 border rounded-lg" placeholder="Area (sqft)" />

            <input className="p-3 border rounded-lg" placeholder="Bedrooms" />
            <input className="p-3 border rounded-lg" placeholder="Bathrooms" />

            <select className="p-3 border rounded-lg">
              <option>Type</option>
              <option>Villa</option>
              <option>Apartment</option>
              <option>House</option>
            </select>

          </div>

          <div className="mt-6">

            <label className="block mb-2 font-semibold">Upload Image</label>

            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition">

              <input
                type="file"
                onChange={handleImage}
                className="hidden"
                id="fileUpload"
              />

              <label htmlFor="fileUpload" className="cursor-pointer">

                {!image ? (
                  <p className="text-gray-500">
                    Drag & Drop or Click to Upload
                  </p>
                ) : (
                  <img
                    src={image}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}

              </label>

            </div>

          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full"
          >
            Add Property
          </motion.button>

        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;