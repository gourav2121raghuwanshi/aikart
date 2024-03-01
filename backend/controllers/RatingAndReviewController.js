const RatingAndReview = require('../models/RatingAndReview.js');
const User = require("../models/UserModel.js");
const mongoose=require('mongoose')
exports.ratingAndReview = async (req, res) => {
    try {
        const { rating, review, id } = req.body;

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

exports.getCurrentratingAndReview = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const newReviewAndRating = await RatingAndReview.findOne({ user:new mongoose.Types.ObjectId(id) });

      
        if (!newReviewAndRating) {
            return res.status(500).json("Please first make a reivew to see it.")
        }

        return res.status(201).json({
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


exports.UpdateratingAndReview = async (req, res) => {
    try {
        const { id, review } =  req.body;
         console.log(review);

        const existingReview = await RatingAndReview.findOne({ user: new mongoose.Types.ObjectId(id) });
        if (!existingReview) {
            return res.status(404).json({
                success: false,
                message: "Review not found. Please first make a review to update it."
            });
        }
        await RatingAndReview.findByIdAndDelete(existingReview._id);

        
        const newReviewAndRating = await RatingAndReview.create({
            review: review,
            user: id
        });
        console.log(newReviewAndRating);

        return res.status(200).json({
            success: true,
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
        const ratAndRev = await RatingAndReview.find({}).sort({ rating: "desc" })
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