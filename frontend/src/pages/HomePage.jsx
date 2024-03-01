import React from 'react'
import homePageImg from "../assets/homePageImg.jpg"
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
const HomePage = () => {

  
  return (
    <div className='w-full'>
      <div className='w-11/12  pt-24 mx-auto'>

        <div className='w-11/12 mt-5 mx-auto bg-gray-100 rounded-xl p-8'>
          <div className='mx-auto text-center w-full'>
            <span className='font-bold  text-gray-600 sm:text-6xl text-5xl  sm:inline block'>Our latest </span>
          
            <span className='text-blue-400   font-bold sm:text-6xl text-5xl sm:inline block'>products</span>
            <p className='mx-auto text-gray-700 mt-2'>
              Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs.<br/>
              Elevate your experience with top-tier features and services.
            </p>
            <Link className='text-blue-500 hover:underline hover:cursor-pointer text-center' 
          to={'/sign-up'}>
          <span className='text-start'>Get Started...</span></Link>

          </div>
         
        </div>
        <div className='w-full mt-5 mb-3 max-h-[900px]'>
          <img
            style={{ maxHeight: '900px' }}
            className='rounded-lg shadow-lg shadow-gray-600 max-h-[900px]'
            loading='lazy'
            src={homePageImg}
            alt='Description'
            height={"400px"}
            
          />
        </div>
      

      </div>
      {/* Features page */}
      <Features />
      {/* Testimonials page */}
      <Testimonials/>
      {/* FAQ page */}
      <FAQ/>

    </div>
  )
}

export default HomePage