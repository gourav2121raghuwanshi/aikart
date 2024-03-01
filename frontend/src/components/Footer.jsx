import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrGithub } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='w-full bg-gray-800  '>
    <div className='w-11/12 mx-auto text-white sm:p-8  p-4 flex flex-row justify-between items-center'>
    <span className='sm:text-xl text-lg'> © Ai-Kart 2024.<br/> All rights reserved.</span>
    <div className='flex flex-col sm:gap-3 gap-1'>
    <div className='flex flex-row gap-2'>
    <FaFacebook className='sm:h-[30px] sm:w-[30px] '/>
    <FaXTwitter className='sm:h-[30px] sm:w-[30px]'/>
    <GrGithub className='sm:h-[30px] sm:w-[30px]'/>
    </div>
    <Link to={'/about'}> <span className='sm:text-xl text-lg  sm:font-semibold'>About</span></Link>
     
    </div>
   
    </div>
    
     
     </div>
  )
}

export default Footer
