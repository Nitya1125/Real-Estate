import React from 'react'

const CTA = () => {
  return (
     <section className="w-full py-24 px-6 md:px-20 bg-white">
      
      <div className="max-w-[1500px] mx-auto bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl px-10 py-16 text-center shadow-xl">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Find Your Dream Home Today
        </h2>

        <p className="text-gray-300 mb-10 text-lg">
          Discover smart real estate solutions powered by AI.  
          Start exploring properties that match your lifestyle.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          <button className="bg-white text-black px-7 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Get Started
          </button>

          <button className="border border-white px-7 py-3 rounded-full hover:bg-white hover:text-black transition">
            Browse Properties
          </button>

        </div>

      </div>

    </section>
  )
}

export default CTA
