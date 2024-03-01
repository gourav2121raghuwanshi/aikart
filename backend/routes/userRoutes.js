const express = require('express');
const router = express.Router();
const {updateUser,deleteUser ,getUser} = require('../controllers/userControllers.js'); // Import the correct function
const {verifyToken} = require('../utils/verifyUser')
const {ratingAndReview,getAllRatingAndReviews,getCurrentratingAndReview,UpdateratingAndReview}=require("../controllers/RatingAndReviewController.js");

const {initDB, getMarket1} = require("../controllers/MarketController");

router.post('/newmarket', initDB);
router.get('/getmarket1',getMarket1);

router.post("/createReviews",ratingAndReview);
router.get("/getReviews",getAllRatingAndReviews);
router.post("/ReviewOfCurrentUser",getCurrentratingAndReview);
router.post("/updateReview",UpdateratingAndReview);

router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/:id',verifyToken, getUser); 

module.exports = router;