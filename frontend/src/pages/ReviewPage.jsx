import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'; 

const ReviewPage = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({rating:0, review:""});
    const { currentUser } = useSelector(state => state.user);
    const Navigate = useNavigate();

    useEffect(() => {
        const getReview = async () => {
          try {
            const res = await axios.get(`https://aikart-backend-eight.vercel.app/api/user/ReviewOfCurrentUser/${currentUser?._id}`);
            const data = await res.data;
            console.log(data);
            const review = data.newReviewAndRating[0].review; const rating = data.newReviewAndRating[0].rating;
            console.log(review, " ", rating);
            setFormData((prevData) => ({
                ...prevData,
                rating : rating, review : review
              }));

          } catch (err) {
            console.log(err);
          }
        };
        getReview();
    }, []);
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
        try {
            console.log('Form data:', formData);
            await axios.post(`https://aikart-backend-eight.vercel.app/api/user/updateReview/${currentUser?._id}`, formData);
            setFormData((prevData) => ({
                ...prevData,
                rating : 0, review : ""
              }));

            Navigate("/marketplace");
            
        } catch (e) {
            console.log(e);
        }
        
        };

    return (
        <div className=' flex justify-center items-center' style={{height:"100vh"}}>
            <div className='mainForm gradientbg'>
                <p style={{fontWeight:"bolder", fontSize:22, margin:"1rem"}}>Rate us : <Rating defaultValue={formData.rating} name="rating" value={formData.rating} size="large" onChange={handleChange}/></p>
                <p style={{fontWeight:"bolder", fontSize:22, margin:"1rem"}}>Review Form :</p>

                    <form onSubmit={handleSubmit}>
                        <textarea name="review" value={formData.review} cols="90" rows="10" placeholder='  Enter Your Review Please..' onChange={handleChange} style={{margin:"1rem"}}></textarea><br />
                        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{left:"48vh"}}> Update </Button>
                    </form>
                
                
            </div>
        </div>
    )
}

export default ReviewPage