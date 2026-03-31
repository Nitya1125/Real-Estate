import React from 'react'
import Logo from '../assets/REAL_ESTATE_LOGO.png';


const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 px-10 py-4'>
        <div className='flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-4 shadow-lg'>
        <div className='flex items-center gap-2'>
            <img src={Logo} alt="logo" className='h-20'/>
        </div>
        <ul className='hidden md:flex gap-10 text-white font-medium'>
            <li className='relative cursor-pointer group'>HOME
                <span className='absolute left-0 bottom-[-5px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full'></span>
            </li>
            <li className='relative cursor-pointer group'>PROPERTIES
                <span className='absolute left-0 bottom-[-5px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full'></span>
            </li>
            <li className='relative cursor-pointer group'>ABOUT
                <span className='absolute left-0 bottom-[-5px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full'></span>
            </li>
            <li className='relative cursor-pointer group'>CONTACT
                <span className='absolute left-0 bottom-[-5px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full'></span>
            </li>
        </ul>
        <div className='flex items-center gap-4'>
            <button className='text-white border border-white px-5 py-2 rounded-full hover:bg-white/20 hover:text-black transition duration-300'>Login</button>
            <button className='text-white border border-white px-5 py-2 rounded-full hover:bg-white/20 hover:text-black transition duration-300'>Sign Up</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
