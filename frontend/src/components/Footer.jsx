import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrGithub } from "react-icons/gr";
import { Link } from 'react-router-dom';
import About from './About';
const Footer = () => {
  return (
    <div className='w-full bg-gray-700 absolute '>
    <div className='w-11/12 mx-auto text-white p-8 flex flex-row justify-evenly items-center'>
    <span className='text-xl '> © Ai-Kart 2024 .<br/> All rights reserved.</span>
    <div className='flex flex-col gap-3'>
    <div className='flex flex-row gap-2'>
    <FaFacebook className='h-[30px] w-[30px]'/>
    <FaXTwitter className='h-[30px] w-[30px]'/>
    <GrGithub className='h-[30px] w-[30px]'/>
    </div>
    <Link to={'/about'}> <span className='text-xl font-semibold'>About</span></Link>
     
    </div>
   
    </div>
    
     
     </div>
  )
}

export default Footer
