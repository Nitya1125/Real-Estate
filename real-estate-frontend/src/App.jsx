import React from 'react'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div >
      <Navbar/>
      <div className='h-screen bg-cover bg-center'
      style = {{backgroundImage: "url('/house.jpeg')"}}>
        <div className='h-full bg-black/50 flex items-center px-10'>
        <div>
          <div className='text-white max-w-xl'>
            <h1 className='text-[70px] leading-[75px] font-bold'>
              FUTURE <br/> OF MODERN<br/> LIVING
            </h1>
            <p className='mt-5 text-gray-300'>
              We design architectural that contributes to lively, human-centered communities.
            </p>
            <button className='mt-8 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition'>Explore Now</button>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default App
