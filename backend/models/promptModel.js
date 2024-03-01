const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: true,
        },
        model : String,
        prompt : String,
        texts : {
            type: Array,
        },
        title : String,
        description : String,
        howtouse : String,
        inputs : Array,
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/djrzg20q4/image/upload/v1709305246/aikart/lcjpkwasjfnavq0ahtno.png"
        },
    }
    , { timestamps: true }
);

module.exports = mongoose.model("Prompt", promptSchema);