  import React, { useState } from "react";
  import { motion } from "framer-motion";
  import Navbar from "../components/Navbar";
  import { Mail, Phone, MapPin } from "lucide-react";

  const ContactPage = () => {
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleChange =  (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('https://real-estate-dhap.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(data.success){
        alert("Message Sent Successfully");
        setFormData({
          First_name: "",
          Last_name: "",
          phone: "",
          email: "",
          subject: "",
          message: ""
        });
      }else{
        alert(data.message);
      }
    }catch(err){
      console.log(err);
      alert("Something Went Wrong");
    }
  }
    return (
      <div className="bg-[#f8f9fb] min-h-screen">

        <Navbar />

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-32 pb-20">

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* LEFT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-400 uppercase tracking-widest">
                Contact Us
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                Let’s Build Something <br />
                <span className="text-gray-500">Amazing Together</span>
              </h1>

              <p className="mt-6 text-gray-600 max-w-md leading-relaxed">
                Have questions or want to collaborate? Reach out to us and we’ll
                get back to you as soon as possible.
              </p>

              {/* CONTACT DETAILS */}
              <div className="mt-10 space-y-6">

                <div className="flex items-center gap-4">
                  <Mail className="text-black" />
                  <span className="text-gray-700">
                    nityagandhi1125@gmail.com
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-black" />
                  <span className="text-gray-700">
                    +91 9173297005
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-black" />
                  <span className="text-gray-700">
                    Manjalpur, Vadodara, Gujarat
                  </span>
                </div>

              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="text-sm text-gray-600">First Name</label>
                  <input
                    name="First_name"
                    value={formData.First_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter First name"
                    className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Last Name</label>
                  <input
                    type="text"
                    name="Last_name"
                    value={formData.Last_name}
                    onChange={handleChange}
                    placeholder="Enter Last name"
                    className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write your message..."
                    className="w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
                >
                  Send Message
                </button>

              </form>

            </motion.div>

          </div>

        </div>
      </div>
    );
  };

  export default ContactPage;