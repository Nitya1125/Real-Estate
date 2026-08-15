import React from 'react'
import { Mail,Phone,MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
  const navigate = useNavigate(); 
  return (
    <footer className="w-full bg-gray-900 text-white py-16 px-6 md:px-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* LEFT - BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">HomeVerse</h2>
          <p className="text-gray-400">
            Smart real estate platform powered by AI to help you make better property decisions.
          </p>
        </div>

        {/* CENTER - LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li onClick={() => navigate('/dashboard')} className="hover:text-white cursor-pointer">Home</li>
            <li onClick={() => navigate("/properties")} className="hover:text-white cursor-pointer">Properties</li>
            <li onClick={() => navigate("/about")} className="hover:text-white cursor-pointer">About</li>
            <li onClick = {() => navigate("/contact")} className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* RIGHT - CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-gray-400">
            
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span className="break-all">nityagandhi1125@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>+91 9173297005</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Manjalpur, Vadodara, Gujarat</span>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © 2026 HomeVerse. Built by Nitya Gandhi.
      </div>

    </footer>

  )
}

export default Footer
