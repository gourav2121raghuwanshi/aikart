import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoMdStar } from "react-icons/io";
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


  if (window.innerWidth >= 1300) {
    settings.slidesToShow = 3;
  } else if (window.innerWidth >= 768) {
    settings.slidesToShow = 2;
  } else {
    settings.slidesToShow = 1;
  }

  if (!reviewData) return "";
  console.log(reviewData);
  return (
    <div id='testimonials' className='pt-10 w-11/12 mx-auto mb-10'>
      <div className='text-3xl sm:text-center font-bold text-gray-700 mt-6'>Testimonials</div>
      <p className='text-gray-600 my-2 sm:text-center'>
        Testimonials from our esteemed users.
      </p>
      <Slider {...settings}>
        {
          reviewData && reviewData.map((review) => (
            <div key={review?._id} className='mb-3'>
              <div className='flex flex-col gap-3 max-w-[400px] h-[260px]  mx-auto px-4 py-6 bg-cyan-100 bg-indigo-300 rounded-2xl '>

                {/* <div className='flex flex-row justify-around'> */}

                  <div className='flex flex-col items-center justify-evenly gap-3'>
                    <img
                      src={review?.user?.avatar}
                      className='h-[40px] w-[40px] rounded-full object-cover'
                      alt={review?.user?.username}
                    />
                <div className='flex gap-2 items-center'> <span className='text-gray-800 text-xl'>{review?.user?.username}</span>  <div className='flex items-center gap-[1px]'><span className='text-black'> ( {review?.rating}</span><IoMdStar className=' text-yellow-300 h-[28px] w-[28px] '/> )</div></div>    
                  </div>
                 
                {/* </div> */}
                <p className='text-gray-600'>
                  {review?.review?.length > 100
                    ? `${review?.review.substring(0, 200)}...`
                    : review?.review}
                </p>

              </div>
            </div>

          ))
        }
      </Slider>
    </div>
  );
};

export default Testimonials;
