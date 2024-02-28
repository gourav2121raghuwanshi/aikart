import React from 'react'
import dashboard from "../assets/dashboard.svg"
import hoemPageImg from "../assets/homePageImg.jpg"

const Features = () => {
    
    return (
        <section id="features" className='w-11/12 pt-24 mx-auto'>
            <div className='flex md:flex-row flex-col  justify-between p-2 gap-3'>
                <div className='flex flex-1 flex-col gap-3'>
                    <div
                        
                        className='text-3xl font-bold text-gray-700'>
                        Product features
                    </div>
                    <p className='text-gray-600'>Here you can provide a brief overview of the key features of the product. For example, you could
                        list the number of features, the types of features, add-ons, or the benefits of the features.
                    </p>
                    <div
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}
                     
                    >
                        {/* dashboard */}
                        <img
                            className='text-blue-500'
                            src={dashboard}
                            height="20px"
                            width="20px" />
                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >Dashboard
                        </span>
                        <p className='text-gray-600'>
                            This item could provide a snapshot of the most important metrics or data points related to the product.
                        </p>

                    </div>
                    {/*  */}
                    <div
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
                        >Mobile integration
                        </span>
                        <p className='text-gray-600'>
                            This item could provide information about the mobile app version of the product.
                        </p>

                    </div>
                    <div
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
                        >Available on all Platforms
                        </span>
                        <p className='text-gray-600'>
                            This item could let users know the product is avialable on all platforms, such as web mobile,and desktop. </p>

                    </div>

                </div>
                {/* Part 2 */}
                <div
                 className='flex-1 py-16 flex flex-row items-center justify-center bg-gray-100 rounded-2xl '>
                 <img
                 className='max-w-[70%] rounded-xl'
                  src={hoemPageImg}></img>
                 </div>
            </div>
        </section>
    )
}

export default Features