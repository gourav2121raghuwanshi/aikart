import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ReviewPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ rating: 0, review: "" });
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?._id) return;

    const getReview = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/user/ReviewOfCurrentUser/${currentUser._id}`,
          { withCredentials: true }
        );

        const data = res.data;
        console.log(data);

        const existingReview = data?.newReviewAndRating?.[0];

        if (existingReview) {
          setFormData({
            rating: existingReview.rating || 0,
            review: existingReview.review || "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getReview();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newValue || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Form data:', formData);

      await axios.post(
        `${API_URL}/api/user/updateReview/${currentUser._id}`,
        formData,
        { withCredentials: true }
      );

      setFormData({
        rating: 0,
        review: "",
      });

      navigate("/marketplace");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='gradientbg min-h-screen pt-24 pb-10 px-4'>
      <div className='mx-auto max-w-3xl'>
        <div className='relative overflow-hidden glass-panel p-5 sm:p-7'>
          <div className="absolute -top-16 -right-12 h-36 w-36 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-16 left-12 h-32 w-32 rounded-full bg-pink-500/25 blur-3xl" />

          <div className='relative'>
            <p className='text-[11px] uppercase tracking-[0.2em] text-indigo-300'>Feedback</p>
            <h1 className='text-3xl font-bold text-slate-50 mt-1'>Rate Your Experience</h1>
            <p className='text-sm text-slate-300 mt-1 mb-5'>
              Your review helps us improve AI-Kart and helps other builders discover the platform.
            </p>
          </div>

          <div className='relative rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <p className='text-sm font-semibold text-slate-100'>Your rating</p>
            <Rating
              name="rating"
              value={formData.rating}
              size="large"
              onChange={handleRatingChange}
              sx={{ '& .MuiRating-iconFilled': { color: '#f59e0b' } }}
            />
          </div>

          <form onSubmit={handleSubmit} className='relative'>
            <textarea
              name="review"
              value={formData.review}
              rows="8"
              placeholder='Share your honest experience...'
              onChange={handleChange}
              className='w-full rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />

            <div className='mt-4 flex justify-end'>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '999px',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  fontWeight: 700,
                }}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;