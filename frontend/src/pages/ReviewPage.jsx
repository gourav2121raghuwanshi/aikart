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
    <div className='flex justify-center items-center' style={{ height: "100vh" }}>
      <div className='mainForm gradientbg'>
        <p style={{ fontWeight: "bolder", fontSize: 22, margin: "1rem" }}>
          Rate us :{" "}
          <Rating
            name="rating"
            value={formData.rating}
            size="large"
            onChange={handleRatingChange}
          />
        </p>

        <p style={{ fontWeight: "bolder", fontSize: 22, margin: "1rem" }}>
          Review Form :
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            name="review"
            value={formData.review}
            cols="90"
            rows="10"
            placeholder='  Enter Your Review Please..'
            onChange={handleChange}
            style={{ margin: "1rem" }}
          />
          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ left: "48vh" }}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;