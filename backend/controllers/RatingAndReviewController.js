const RatingAndReview = require('../models/RatingAndReview.js');
const User=require("../models/UserModel.js");

exports.ratingAndReview = async (req, res) => {
    try {

        const { rating, review,id } = req.body;
        
        // console.log(id);
        const newReviewAndRating = await RatingAndReview.create({
            rating: rating,
            review: review,
            user: id
        });

        res.status(201).json({ 
            newReviewAndRating
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

exports.getAllRatingAndReviews = async (req, res) => {
    try {
        const ratAndRev =await RatingAndReview.find({}).sort({ rating: "desc" })
            .populate("user");
            

        res.status(200).json({
            success: true,
            message: "Fetched all rating and Review Successfully",
            AllRatingAndReviews: ratAndRev,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}