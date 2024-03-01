const marketPlace = require("../models/MarketPlace.js");
const dotenv = require('dotenv'); 
dotenv.config();

exports.initDB = async (req,res) => {
    try{
       const  newmarket=  await marketPlace.create(req.body)
        console.log("Data initialized");
        res.status(200).json(newmarket);
    }
    catch(err) {
        console.log(err);
    }
}

exports.getMarket1 = async(req, res) => {
    try {
        const market = await marketPlace.find({});
        res.status(200).json(market);
    }
    catch(err) {
        console.log(err);
        res.status(400).json("Error Occured");
    }
}
exports.getMarket2 = async(req, res) => {
    try {
        const {id} = req.params.id;
        const market = await marketPlace.findById({id});
        res.status(200).json(market);
    }
    catch(err) {
        console.log(err);
        res.status(400).json("Error Occured");
    }
}