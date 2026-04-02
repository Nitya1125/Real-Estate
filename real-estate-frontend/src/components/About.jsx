import React from 'react'
import house from "../assets/house.jpeg"
import { CheckCircle } from 'lucide-react'

const About = () => {
  return (
         <section className="w-full py-28 px-6 md:px-20 bg-gradient-to-b from-white to-gray-100">
      
      <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <p className="text-sm text-gray-500 mb-3 uppercase tracking-widest">
            AI Powered Platform
          </p>

          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Smart Decisions <br />
            With AI Insights
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Predict property prices using advanced machine learning models.
            Make smarter investments with real-time insights and analytics.
          </p>

          {/* FEATURES */}
          <div className="space-y-4 mb-8">
            {[
              "Accurate price prediction",
              "Live market trends",
              "Data-driven insights",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="text-black" size={20} />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          <button className="bg-black text-white px-7 py-3 rounded-full hover:bg-gray-800 transition">
            Explore More →
          </button>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <img
            src={house}
            alt="house"
            className="rounded-3xl shadow-2xl"
          />

          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-300 blur-2xl opacity-40 -z-10"></div>

          {/* Floating Card */}
          <div className="absolute bottom-6 right-6 bg-white shadow-xl px-6 py-4 rounded-xl">
            <p className="text-sm text-gray-500">AI Prediction</p>
            <h4 className="font-bold text-lg">₹1.25 Cr</h4>
          </div>
        </div>

      </div>
    </section>

  )
}

export default About
