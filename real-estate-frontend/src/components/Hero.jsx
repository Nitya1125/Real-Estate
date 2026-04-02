import React from 'react'
import house from '../assets/house.jpeg'
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; 

const Hero = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-32">

      <div className="grid md:grid-cols-2 items-center gap-12">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-[60px] md:text-[70px] font-bold leading-tight text-gray-900">
            FUTURE OF <br />
            <span className="bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent">
              MODERN LIVING
            </span>
          </h1>

          <p className="mt-6 text-gray-500 text-lg max-w-lg leading-relaxed">
            Discover smart real estate solutions powered by AI.
            Explore luxury homes and modern living spaces.
          </p>

          {/* BUTTON */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="mt-8 flex items-center gap-2 bg-black text-white px-7 py-3 
            rounded-full text-sm transition duration-300 
            hover:bg-gray-800 shadow-lg"
          >
            Explore Now 
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative group"
        >

          <img
            src={house}
            alt="house"
            className="w-full h-[500px] object-cover rounded-3xl 
            shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
            transition duration-500 group-hover:scale-[1.03]"
          />

          {/* OVERLAY GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-black/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>

        </motion.div>

      </div>

    </div>
  )
}

export default Hero;