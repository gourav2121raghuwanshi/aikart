import React from 'react'
import hoemPageImg from "../assets/homePageImg.jpg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import { useState } from 'react';

const Features = () => {
    const [image, setImage] = useState('one');
    return (
        <section id="features" className='w-11/12 pt-24 mx-auto hover:cursor-pointer'>
            <div className='hidden sm:flex md:flex-row flex-col  justify-between p-2 gap-3'>
                <div className='flex flex-1 flex-col gap-3'>
                    <div

                        className='text-3xl font-bold text-gray-700 mb-3'>
                        Product features
                    </div>
                   
                    <div
                        onClick={() => setImage('one')}
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}
                    >
                        {/* dashboard */}
                        <svg
                            className='h-[20px] w-[20px] ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="dashboard"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path></svg>

                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >MarketPlace
                        </span>
                        <p className='text-gray-600'>
                            Welcome to our revolutionary AI Marketplace, where innovation meets accessibility! 
                            Discover a world of limitless possibilities with our MERN stack-powered application enriched with cutting-edge AI/ML capabilities.
                        </p>

                    </div>
                    {/*  */}
                    <div
                        onClick={() => { setImage('two') }}
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}
                    >
                        {/* mobile integration */}
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                                <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
                            </svg>

                        </div>
                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >  Seamless Integration
                        </span>
                        <p className='text-gray-600'>
                        Our app ensures compatibility and interoperability, allowing you to extend the reach and impact of your creations.
                        </p>

                    </div>
                    <div
                        onClick={() => setImage('three')}
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}


                    >
                        {/* Available on all Platforms */}
                        <div>

                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv h-[20px] w-[20px]"
                                focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DevicesRoundedIcon">
                                <path d="M4 7c0-.55.45-1 1-1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-1.1 0-2 .9-2 2v11h-.5c-.83 0-1.5.67-1.5 1.5S.67 20 1.5 20H14v-3H4zm19 1h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1m-1 9h-4v-7h4z"></path>
                            </svg>

                        </div>
                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >Create Your own Apps
                        </span>
                        <p className='text-gray-600'>
                        Craft your own AI applications effortlessly! Whether it's diagnosing diseases from images or transforming text into insightful narratives,
                         our platform puts the creative control in your hands. Shape the future of technology by bringing your ideas to life. </p>
                    </div>

                </div>
                {/* Part 2 */}
                <div
      
                    className='flex-1 py-16 flex flex-row items-center justify-center  rounded-2xl '>
                    <img
                        className='max-w-[60%] rounded-xl'

                        src={image === 'one' ? hoemPageImg : (image === 'two' ? image1 : image2)}></img>
                </div>
            </div>
            <div className=' sm:hidden my-3'>
                <div>
                    <div

                        className='text-3xl font-bold text-gray-700 mb-3'>
                        Product features
                    </div>
                    
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-3'>
                        <div
                            onClick={() => setImage('one')}
                            className='bg-blue-900  opacity-85 hover:opacity-100 text-white px-3 py-2  rounded-full'>
                            MarketPlace
                        </div>
                        <div
                            onClick={() => setImage('two')}
                            className='bg-blue-900 opacity-85 hover:opacity-100 text-white px-3 py-2  rounded-full'>
                            Seamless Integration
                        </div>
                        <div
                            onClick={() => setImage('three')}
                            className='bg-blue-900 opacity-85 hover:opacity-100 text-white px-3 py-2  rounded-full'>
                            Create Your own Apps
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg-gray-200 rounded-xl p-3 shadow-lg shadow-gray-600'>
                        <div className='max-w-[80%] mx-auto'  >

                            <img
                                className=' rounded-xl'
                                src={image === 'one' ? hoemPageImg : (image === 'two' ? image1 : image2)}
                            >
                            </img>
                        </div>
                        <div className='flex flex-col justify-center gap-1 max-w-[85%] mx-auto'>
                            <span
                                className='text-lg font-semibold text-gray-700'>
                                {image === 'one' ?
                                    "MarketPlace" : (image === 'two' ?
                                        "Seamless Integration" : "Create your own Apps")}
                            </span>
                            <span
                                className='text-gray-600'>
                                {image === 'one' ?
                                    "Welcome to our revolutionary AI Marketplace, where innovation meets accessibility! Discover a world of limitless possibilities with our MERN stack-powered application enriched with cutting-edge AI/ML capabilities." :
                                    (image === 'two' ? "Craft your own AI applications effortlessly! Whether it's diagnosing diseases from images or transforming text into insightful narratives, our platform puts the creative control in your hands. Shape the future of technology by bringing your ideas to life.     " :
                                        " Our app ensures compatibility and interoperability, allowing you to extend the reach and impact of your creations.                      ")}
                            </span>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Features

