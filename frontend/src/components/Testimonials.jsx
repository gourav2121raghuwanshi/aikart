import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL;
const FALLBACK_AVATAR =
  'https://res.cloudinary.com/domheydkx/image/upload/v1705905528/gourav/uyb6ntwjcrxacztiw4iv.jpg';

const Testimonials = () => {
  const [reviewData, setReviewData] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1300) setSlidesToShow(3);
      else if (window.innerWidth >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/getReviews`, {
          withCredentials: true,
        });
        setReviewData(res.data.AllRatingAndReviews || []);
      } catch (err) {
        console.log("cannot get reviews ", err);
      }
    };

    getReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    slidesToShow,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div id="testimonials" className="pt-12 w-11/12 max-w-6xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-50">Loved by builders</h2>
          <p className="text-sm text-slate-400 mt-1">
            Hear from teams shipping AI apps on AI-Kart.
          </p>
        </div>
        {currentUser ? (
          <Link
            to={`/rate/${currentUser._id}`}
            className="inline-flex items-center justify-center rounded-full border border-indigo-400/50 bg-indigo-500/15 px-4 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/25"
          >
            Write a review
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="inline-flex items-center justify-center rounded-full border border-indigo-400/50 bg-indigo-500/15 px-4 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/25"
          >
            Sign in to review
          </Link>
        )}
      </div>

      <Slider {...settings}>
        {reviewData.map((review) => (
          <div key={review?._id} className="px-2 pb-6">
            <div className="glass-panel h-64 flex flex-col gap-3 px-5 py-5 border border-slate-700/60">
              <div className="flex flex-col items-center gap-3">
                <img
                  src={review?.user?.avatar || FALLBACK_AVATAR}
                  className="h-12 w-12 rounded-full object-cover border border-slate-700"
                  alt={review?.user?.username || 'user avatar'}
                />

                <div className="flex items-center gap-2">
                  <span className="text-slate-50 text-lg font-semibold">
                    {review?.user?.username || 'Anonymous User'}
                  </span>
                  <div className="flex items-center gap-1 text-amber-300">
                    <span className="text-sm">( {review?.rating}</span>
                    <IoMdStar className="h-5 w-5" />
                    <span className="text-sm">)</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-200/90 text-center leading-relaxed">
                {review?.review?.length > 140
                  ? `${review.review.substring(0, 140)}...`
                  : review?.review}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;