import React from 'react'
import homePageImg from '../assets/OIG4.jpg'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux';
const HomePage = () => {

  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='w-full'>
      <div className='w-11/12  pt-24 mx-auto'>

        <div className='w-11/12 mt-5 mx-auto rounded-xl p-8'>
          <div className='mx-auto text-center w-full'>
            <span className='text-blue-500   font-bold sm:text-6xl text-5xl sm:inline block'>Ai-Kart  </span>
            <span className='font-bold  text-gray-600 sm:text-6xl text-5xl  sm:inline block'>App </span>
            <p className='mx-auto text-gray-700 mt-2'>
              Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs.<br />
              Elevate your experience with top-tier features and services.
            </p>
            {
              currentUser && <Link className='text-blue-500 hover:underline hover:cursor-pointer text-center'
                to={'/marketplace'}>
                <span className='text-start'>Get Started...</span></Link>
            }
            {
              !currentUser && <Link className='text-blue-500 hover:underline hover:cursor-pointer text-center'
                to={'/sign-in'}>
                <span className='text-start'>Get Started...</span></Link>
            }


          </div>

        </div>
        <div className='w-full flex justify-center mt-5 mb-3 max-h-[900px]'>
          <img
            style={{ maxWidth: '900px', width: "90%" }}
            className='rounded-lg shadow-lg shadow-blue-200 max-h-[900px]'
            loading='lazy'
            src={homePageImg}
            alt='Description'
            height={"400px"}

          />
        </div>


      </div>

      <Features />

      <Testimonials />
      
      <div className=' text-center pb-10'>
        <a href={`/rate/${currentUser._id}`} className=' px-2 py-4 rounded-xl mb-5 bg-green-400 cursor-pointer'>Rate us!!</a>
      </div>

      <FAQ />
      <Footer />
    </div>
  )
}

export default HomePage