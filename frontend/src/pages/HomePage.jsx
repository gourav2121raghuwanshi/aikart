import React from 'react'
import homePageImg from "../assets/homePageImg.jpg"
const HomePage = () => {
  return (
    <div className='w-full'>
      <div className='w-11/12 mt-5 mx-auto'>

        <div className='w-11/12 mt-5 mx-auto bg-gray-100 rounded-xl p-8'>
          <div className='mx-auto text-center w-full'>
            <span className='font-bold  text-gray-600 sm:text-6xl text-5xl  sm:inline block'>Our latest </span>
            <span className='text-blue-400  font-bold sm:text-6xl text-5xl sm:inline block'>products</span>
            <p className='mx-auto text-gray-700 mt-2'>
              Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs.
              Elevate your experience with top-tier features and services.
            </p>
          </div>


        </div>
        <div className='w-full mt-5 mb-3'>
          <img
            className='rounded-lg shadow-lg shadow-blue-200'
            loading='lazy'
            src={homePageImg}
            alt='Description'
          />
        </div>

{/* Features page */}
      </div>
    </div>
  )
}

export default HomePage