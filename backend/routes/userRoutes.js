const express = require('express');
const router = express.Router();
const {updateUser,deleteUser ,getUser} = require('../controllers/userControllers.js'); // Import the correct function
const {verifyToken} = require('../utils/verifyUser')
const {ratingAndReview,getAllRatingAndReviews,getCurrentratingAndReview,UpdateratingAndReview}=require("../controllers/RatingAndReviewController.js");
const {initDB, getMarket1, getCurrMarket, getCurrUserMarket} = require("../controllers/MarketController");

router.post('/newmarket', initDB);
router.get('/getCurrMarket/:id',getCurrMarket);
router.get('/getCurrUserMarket/:id',getCurrUserMarket);
router.get('/getmarket1',getMarket1);

router.post("/createReviews",ratingAndReview);
router.get("/getReviews",getAllRatingAndReviews);
router.get("/ReviewOfCurrentUser/:id",getCurrentratingAndReview);
router.post("/updateReview/:id",UpdateratingAndReview);

router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/:id',verifyToken, getUser); 

module.exports = router;