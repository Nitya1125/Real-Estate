import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const RequestPropertyView = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    message: "",
  });

  // Fetch Property by ID
useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`https://real-estate-dhap.onrender.com/api/properties/${id}`);
        const data = await res.json();

        setProperty(data.property);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperty();
  }, [id]);

  // Handle Form Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Request
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://real-estate-dhap.onrender.com/api/properties/visit/request",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...formData,
            propertyId: property?._id,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      setSuccess(
        "Visit request submitted successfully!"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        visitDate: "",
        message: "",
      });

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Top Back Button */}
      <div className="max-w-7xl mx-auto mb-6">

        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          ← Back to Property
        </button>

      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* LEFT SIDE PROPERTY DETAILS */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <img
            src={
              property?.image
                ? `https://real-estate-dhap.onrender.com/uploads/${property.image}`
                : "https://placehold.co/600x400"
            }
            alt="property"
            className="w-full h-[350px] object-cover"
          />

          <div className="p-8">

            <h1 className="text-3xl font-black text-gray-900 mb-3">
              {property?.title}
            </h1>

            <p className="text-4xl font-black text-black mb-6">
              ₹{" "}
              {Number(
                property?.price
              ).toLocaleString("en-IN")}
            </p>

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-gray-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <h3 className="font-bold text-lg">
                  {property?.location}
                </h3>
              </div>

              <div className="bg-gray-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">
                  Property Type
                </p>

                <h3 className="font-bold text-lg">
                  {property?.type}
                </h3>
              </div>

              <div className="bg-gray-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">
                  Bedrooms
                </p>

                <h3 className="font-bold text-lg">
                  {property?.bedrooms}
                </h3>
              </div>

              <div className="bg-gray-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">
                  Bathrooms
                </p>

                <h3 className="font-bold text-lg">
                  {property?.bathrooms}
                </h3>
              </div>

              <div className="bg-gray-100 rounded-2xl p-4 col-span-2">
                <p className="text-sm text-gray-500">
                  Area
                </p>

                <h3 className="font-bold text-lg">
                  {property?.area} sq.ft
                </h3>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Request Property Visit
          </h1>

          <p className="text-gray-500 mb-8">
            Fill your details and our team
            will contact you shortly.
          </p>

          {/* Success Message */}
          {success && (

            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 font-medium">
              {success}
            </div>

          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              rows="5"
              placeholder="Enter your message or preferred visiting time"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-black resize-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition"
            >
              Send Request
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full border border-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </form>

        </div>

      </div>

    </div>
    <Footer />
    </>
  );
};

export default RequestPropertyView;