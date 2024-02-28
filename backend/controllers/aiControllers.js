require('dotenv').config();
const { errorHandler } = require('../utils/error.js');


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function text_to_text(arg) {
    var prompt =  arg
    console.log("prompt",prompt);
    const model =  genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const text = response.text();
    console.log(text);
    return text;
  }


let context = {
    "text_to_text": text_to_text
}

async function Evaluate(fn, arg){

    if(fn==="text"){
        console.log("text",  arg);
        return arg;
    }

    var arr = [];
    for(var i=0; i<arg.length; i++){
        let result = await Evaluate(arg[i].fn , arg[i].args);
        arr.push(result);
    }
    arg=arr;

    var result = await context[fn].apply(context, arg);
    return result;
}

exports.execute = async (req, res, next) => {
    const obj = req.body;

    console.log(JSON.stringify(obj));

    let out = {}

    for(key in obj){
        let input = obj[key];
        out[key] = await Evaluate(input.fn, input.args);
    }
    console.log("\nOutput : ", out);

    return res.json(out);
}