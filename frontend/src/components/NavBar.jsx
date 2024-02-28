import React from 'react'
import wesiteLogo from "../assets/wesiteLogo.svg"

import { Link } from 'react-router-dom'
import { useState } from 'react'

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className='w-full mx-auto mt-5'>
      <div className='flex flex-row justify-between w-10/12 mx-auto bg-gray-800 rounded-2xl p-3 sm:p-4 shadow-lg'>
        <div className='flex flex-row gap-3 items-center'>
          <Link to="/">
            <div className='flex flex-row gap-2'>
              <img src={wesiteLogo} alt="Website Logo" height="25px" width="25px" />
              <span className='text-blue-400 font-bold text-xl '>AIKart</span>
            </div>
          </Link>

          <div className='hidden text-white sm:block'>
            Features
          </div>
          <div className='hidden text-white sm:block'>
            Testimonials
          </div>
          <div className='hidden text-white sm:block'>
            FAQ
          </div>

        </div>
        {/* part 2 */}
        <div className='flex flex-row gap-3    items-center'>
          <div className='hidden sm:flex flex-row'>
            <Link to={'sign-in'} >
              <div className='font-semibold text-blue-300' >   Sign in</div>
            </Link>
          </div>
          <div className='hidden sm:block'>
            <Link to={'sign-up'} >
              <div className=' px-3 py-1  rounded-xl bg-blue-300 text-white font-semibold'> Sign up</div>
            </Link>
          </div>
          {/* dropdown */}
          <div className="relative inline-block  sm:hidden text-left">
            <button
              onClick={toggleDropdown}
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400 border-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right flex flex-col gap-3 p-4 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className='flex flex-col gap-3'>
                  <span>
                    Features
                  </span>
                  <span>
                    Testimonials
                  </span>
                  <span>
                    FAQ
                  </span>
                </div>
                <div
                  className="py-1 flex flex-col justify-center gap-3"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >

                  <Link
                    onClick={closeDropdown}
                    to="/sign-up"
                    className="block px-4 text-center  py-2 text-sm text-white rounded-2xl  bg-blue-400  hover:bg-blue-500" role="menuitem">
                    Sign up
                  </Link>
                  <Link
                    onClick={closeDropdown}
                    to="/sign-in"
                    className="block px-4 text-center py-2 text-sm text-white  hover:bg-gray-700 rounded-2xl  bg-gray-600" role="menuitem">
                    Sign in
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </nav>
  )
}

export default NavBar