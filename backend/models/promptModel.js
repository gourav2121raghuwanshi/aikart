const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: true,
        },
        model : {
            type : String,
            required: true,
        },
        prompt : String,
        texts : [
            {
                prefix : String,
                placeholder : String
            }
        ],
        images : [
            {placeholder : String}
        ],
        title :{
            type :String,
            required: true,
        },
        description : {
            type : String,
            required: true,
        },
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