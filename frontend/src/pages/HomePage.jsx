import React from 'react'
import homePageImg from '../assets/image1.jpg'
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
            <p className='mx-auto text-lg text-gray-700 mt-2 mb-2'>

              Welcome to our revolutionary AI Marketplace, where innovation meets accessibility!  <br />
              Our platform empowers users to unleash their creativity by effortlessly crafting personalized AI applications.<br />


            </p>
            {
              currentUser &&
                <Link className='  hover:cursor-pointer text-center text-white '
                 to={'/marketplace'}>
                <button className='text-start rounded-xl bg-blue-600 py-2 px-3'>Get Started</button></Link>
        
            }
            {
              !currentUser && <Link className='  hover:cursor-pointer text-center'
                to={'/sign-in'}>
                <button className='text-start rounded-lg bg-blue-600 py-2 px-3'>Get Started</button></Link>
            }


          </div>

        </div>
        <div className='w-full flex justify-center mt-5 mb-3 max-h-[800px]'>
          <img
            style={{ maxWidth: '800px', width: "90%" }}
            className='rounded-lg shadow-lg shadow-blue-200 max-h-[600px] object-cover'
            loading='lazy'
            src={homePageImg}
            alt='Description'
            height={"400px"}

          />
        </div>


      </div>

      <Features />

      <Testimonials />
      
      <div className=' text-center pt-10'>
        <a href={`/rate/${currentUser?._id}`} className=' px-3 py-3 rounded-xl mb-5 bg-blue-700 text-white cursor-pointer'>Rate us!!</a>
      </div>

      <FAQ />
      <Footer />
    </div>
  )
}

export default HomePage
