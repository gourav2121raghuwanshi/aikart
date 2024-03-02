const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    howToUse : {
        type: String
    }
});

module.exports = mongoose.model("Market", marketSchema);