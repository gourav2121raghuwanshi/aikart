// import React from 'react'
// import axios from 'axios'
// import { useEffect } from 'react';
// import { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// const Testimonials = () => {
//     const [reviewData, setReviewData] = useState([]);
//     let [visibleReviews, setVisibleReviews] = useState(9);
    
// const ReviewsSlider = ({ reviewData }) => {
//     const [activeSlide, setActiveSlide] = useState(0);
  
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       afterChange: (current) => setActiveSlide(current),
//     };
  
//     useEffect(() => {
//         try {
//             const getReviews = async () => {
//                 const res = await axios.get(`/api/user/getReviews`);
//                 const data = await res.data;
//                 console.log(data.AllRatingAndReviews);
//                 setReviewData(data.AllRatingAndReviews);

//             }
//             getReviews();


//         } catch (err) {
//             console.log("cannot get reviews ");
//         }
//     }, []);

//     const handleShowMore = () => {
//         setVisibleReviews(visibleReviews + 11); // Show 11 more reviews on each click
//     };

//     if (reviewData)
//         visibleReviews = Math.min(visibleReviews, reviewData.length);


//     return (
//         <div id="testimonials" className='pt-24 w-11/12 mx-auto mb-10'>
//             <div
//                 className='text-3xl sm:text-center font-bold text-gray-700'>
//                 Testimonials
//             </div>
//             <p className='text-gray-600 mt-1 sm:text-center'>Here you can provide a brief overview of the key features of the product. For example, you could
//                 list the number of features, the types of features, add-ons, or the benefits of the features.
//             </p>
//             <div className='grid mt-8 gap-5  grid-cols-1   sm:grid-cols-2 md:grid-cols-3'>
//             <Slider {...settings}>
//       {reviewData &&
//         reviewData.map((review) => (
//           <div key={review._id} className='mb-3'>
//             <div className='flex flex-col gap-3 px-4 py-6 bg-gray-300 rounded-2xl '>
//               <div className='flex flex-col items-center justify-evenly gap-3'>
//                 <img
//                   src={review.user.avatar}
//                   className='h-[40px] w-[40px] rounded-full object-cover'
//                   alt={review.user.username}
//                 />
//                 <span className='text-gray-800'>{review.user.username}</span>
//               </div>
//               <p className='text-gray-600'>
//                 {review.review.length > 100
//                   ? `${review.review.substring(0, 200)}...`
//                   : review.review}
//               </p>
//             </div>
//           </div>
//         ))}
//     </Slider>

//                 {/* {
//                     reviewData &&
//                     reviewData.map((review) => (
//                         <div key={review._id} className='mb-3'>
//                             <div className='flex flex-col gap-3 px-4 py-6 bg-gray-300 rounded-2xl '>
//                                 <div className='flex flex-col items-center justify-evenly gap-3'>
//                                     <img
//                                         src={review.user.avatar}
//                                         className='h-[40px] w-[40px] rounded-full object-cover'
//                                         alt={review.user.username}

//                                     />
//                                     <span className='text-gray-800'>{review.user.username}</span>
//                                 </div>
//                                 <p className='text-gray-600'>
//                                     {review.review.length > 100
//                                         ? `${review.review.substring(0, 200)}...`
//                                         : review.review}
//                                 </p>
//                             </div>
//                         </div>
//                     ))} */}

                    
                    
//             </div>

//         </div>
//     )
// }

// export default Testimonials;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Testimonials = () => {
//   const [reviewData, setReviewData] = useState([]);
//   let [visibleReviews, setVisibleReviews] = useState(9);

//   useEffect(() => {
//     const getReviews = async () => {
//       try {
//         const res = await axios.get(`/api/user/getReviews`);
//         const data = await res.data;
//         console.log(data.AllRatingAndReviews);
//         setReviewData(data.AllRatingAndReviews);
//       } catch (err) {
//         console.log("cannot get reviews ");
//       }
//     };
//     getReviews();
//   }, []);

//   const handleShowMore = () => {
//     setVisibleReviews(visibleReviews + 11); // Show 11 more reviews on each click
//   };

//   if (reviewData) {
//     visibleReviews = Math.min(visibleReviews, reviewData.length);
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div id='testimonials' className='pt-24 w-11/12 mx-auto mb-10'>
//       <div className='text-3xl sm:text-center font-bold text-gray-700'>Testimonials</div>
//       <p className='text-gray-600 mt-1 sm:text-center'>
//         Here you can provide a brief overview of the key features of the product. For example, you could list the number of features, the types of features, add-ons, or the benefits of the features.
//       </p>
//       <Slider {...settings}>
//         {reviewData &&
//           reviewData.slice(0, visibleReviews).map((review) => (
//             <div key={review._id} className='mb-3 z-[-10] flex items-center justify-center  w-full'>
//               <div className='flex flex-col gap-3 max-w-[440px] mx-auto mt-3 px-4 py-6 bg-gray-300 rounded-2xl '>
//                 <div className='flex flex-col items-center justify-evenly gap-3'>
//                   <img
//                     src={review.user.avatar}
//                     className='h-[40px] w-[40px] rounded-full object-cover'
//                     alt={review.user.username}
//                   />
//                   <span className='text-gray-800'>{review.user.username}</span>
//                 </div>
//                 <p className='text-gray-600'>
//                   {review.review.length > 100
//                     ? `${review.review.substring(0, 200)}...`
//                     : review.review}
//                 </p>
//               </div>
//             </div>
//           ))}
//       </Slider>
//       <button onClick={handleShowMore} className='mt-6 pt-2 mx-auto w-full'>
//         Show More
//       </button>
//     </div>
//   );
// };

// export default Testimonials;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Testimonials = () => {
//   const [reviewData, setReviewData] = useState([]);

//   useEffect(() => {
//     const getReviews = async () => {
//       try {
//         const res = await axios.get(`/api/user/getReviews`);
//         const data = await res.data;
//         console.log(data.AllRatingAndReviews);
//         setReviewData(data.AllRatingAndReviews);
//       } catch (err) {
//         console.log("cannot get reviews ");
//       }
//     };
//     getReviews();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 2000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,  // Enable autoplay
//     autoplaySpeed: 5000,  // Set autoplay speed in milliseconds (adjust as needed)
//   };

//   return (
//     <div id='testimonials' className='pt-24 w-11/12 mx-auto  mb-10'>
//       <div className='text-3xl sm:text-center font-bold text-gray-700 mt-6'>Testimonials</div>
//       <p className='text-gray-600 my-2 sm:text-center'>
//         Here you can provide a brief overview of the key features of the product. For example, you could list the number of features, the types of features, add-ons, or the benefits of the features.
//       </p>
//       <Slider {...settings}>
//         {reviewData &&
//           reviewData.map((review) => (
//             <div key={review._id} className='mb-3'>
//               <div className='flex flex-col gap-3 max-w-[440px]  mx-auto px-4 py-6 bg-gray-300 rounded-2xl '>
//                 <div className='flex flex-col items-center justify-evenly gap-3'>
//                   <img
//                     src={review.user.avatar}
//                     className='h-[40px] w-[40px] rounded-full object-cover'
//                     alt={review.user.username}
//                   />
//                   <span className='text-gray-800'>{review.user.username}</span>
//                 </div>
//                 <p className='text-gray-600'>
//                   {review.review.length > 100
//                     ? `${review.review.substring(0, 200)}...`
//                     : review.review}
//                 </p>
//               </div>
//             </div>
//           ))}
//       </Slider>
//     </div>
//   );
// };

// export default Testimonials;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Testimonials = () => {
//   const [reviewData, setReviewData] = useState([]);

//   useEffect(() => {
//     const getReviews = async () => {
//       try {
//         const res = await axios.get(`/api/user/getReviews`);
//         const data = await res.data;
//         console.log(data.AllRatingAndReviews);
//         setReviewData(data.AllRatingAndReviews);
//       } catch (err) {
//         console.log("cannot get reviews ");
//       }
//     };
//     getReviews();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 2000,
//     slidesToScroll: 1,
//     autoplay: true,  // Enable autoplay
//     autoplaySpeed: 5000,  // Set autoplay speed in milliseconds (adjust as needed)
//     responsive: [
//       {
//         breakpoint: 640,  // Define breakpoint for screen size 'sm'
//         settings: {
//           slidesToShow: 1,  // Show 1 slide at a time for small screens
//         },
//       },
//       {
//         breakpoint: 768,  // Define breakpoint for screen size 'md'
//         settings: {
//           slidesToShow: 2,  // Show 2 slides at a time for medium screens
//         },
//       },
//       {
//         breakpoint: 1024,  // Define breakpoint for screen size 'lg'
//         settings: {
//           slidesToShow: 3,  // Show 3 slides at a time for large screens and above
//         },
//       },
//     ],
//   };

//   return (
//     <div id='testimonials' className='pt-24 w-11/12 mx-auto  mb-10'>
//       <div className='text-3xl sm:text-center font-bold text-gray-700 mt-6'>Testimonials</div>
//       <p className='text-gray-600 my-2 sm:text-center'>
//         Here you can provide a brief overview of the key features of the product. For example, you could list the number of features, the types of features, add-ons, or the benefits of the features.
//       </p>
//       <Slider {...settings}>
//         {reviewData &&
//           reviewData.map((review) => (
//             <div key={review._id} className='mb-3'>
//               <div className='flex flex-col gap-3 max-w-[440px]  mx-auto px-4 py-6 bg-gray-300 rounded-2xl '>
//                 <div className='flex flex-col items-center justify-evenly gap-3'>
//                   <img
//                     src={review.user.avatar}
//                     className='h-[40px] w-[40px] rounded-full object-cover'
//                     alt={review.user.username}
//                   />
//                   <span className='text-gray-800'>{review.user.username}</span>
//                 </div>
//                 <p className='text-gray-600'>
//                   {review.review.length > 100
//                     ? `${review.review.substring(0, 200)}...`
//                     : review.review}
//                 </p>
//               </div>
//             </div>
//           ))}
//       </Slider>
//     </div>
//   );
// };

// export default Testimonials;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(`/api/user/getReviews`);
        const data = await res.data;
        console.log(data.AllRatingAndReviews);
        setReviewData(data.AllRatingAndReviews);
      } catch (err) {
        console.log("cannot get reviews ");
      }
    };
    getReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Adjust the number of slides based on screen size
  if (window.innerWidth >= 1024) {
    settings.slidesToShow = 3;
  } else if (window.innerWidth >= 768) {
    settings.slidesToShow = 2;
  } else {
    settings.slidesToShow = 1;
  }

  return (
    <div id='testimonials' className='pt-24 w-11/12 mx-auto mb-10'>
      <div className='text-3xl sm:text-center font-bold text-gray-700 mt-6'>Testimonials</div>
      <p className='text-gray-600 my-2 sm:text-center'>
        Here you can provide a brief overview of the key features of the product. For example, you could list the number of features, the types of features, add-ons, or the benefits of the features.
      </p>
      <Slider {...settings}>
        {reviewData &&
          reviewData.map((review) => (
            <div key={review._id} className='mb-3'>
              <div className='flex flex-col gap-3 max-w-[440px]  mx-auto px-4 py-6 bg-gray-300 rounded-2xl '>
                <div className='flex flex-col items-center justify-evenly gap-3'>
                  <img
                    src={review.user.avatar}
                    className='h-[40px] w-[40px] rounded-full object-cover'
                    alt={review.user.username}
                  />
                  <span className='text-gray-800'>{review.user.username}</span>
                </div>
                <p className='text-gray-600'>
                  {review.review.length > 100
                    ? `${review.review.substring(0, 200)}...`
                    : review.review}
                </p>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
