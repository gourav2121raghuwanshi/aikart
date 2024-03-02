const marketPlace = require("../models/MarketPlace.js");
const dotenv = require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
exports.initDB = async (req, res) => {
    try {
        const newmarket = await marketPlace.create(req.body)
        console.log("Data initialized");
        res.status(200).json(newmarket);
    }
    catch (err) {
        console.log(err);
    }
}

exports.getCurrMarket = async (req, res) => {
    try {
        const { id } = req.params;
        const market = await marketPlace.findById(id);
        console.log(market);
        res.status(200).json(market);
    }
    catch (err) {
        console.log(err);
        res.status(400).json("Error Occured");
    }
}
exports.getCurrUserMarket = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const market = await marketPlace.find({ user : id });
        console.log(market);
        return res.status(200).json(market);

    }
    catch (err) {
        console.log(err);
        res.status(401).json("Error Occured");
    }
}
exports.getMarket1 = async (req, res) => {
    try {
        const market = await marketPlace.find({});
        res.status(200).json(market);
    }
    catch (err) {
        console.log(err);
        res.status(400).json("Error Occured");
    }
}
exports.getMarket2 = async (req, res) => {
    try {
        const { id } = req.params.id;
        const market = await marketPlace.findById({ id });
        res.status(200).json(market);
    }
    catch (err) {
        console.log(err);
        res.status(400).json("Error Occured");
    }
}