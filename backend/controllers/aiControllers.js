require('dotenv').config();
const { errorHandler } = require('../utils/error.js');
const fs = require("fs");
const path = require("path");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function text_to_text(prompt) {
    console.log("prompt",prompt);
    const model =  genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const text = response.text();
    console.log(text);
    return text;
}

function fileToGenerativePart(pathvar, mimeType) {
    pathvar = path.resolve(pathvar);
    if (fs.existsSync(pathvar)) {
        console.log(pathvar);
        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(pathvar)).toString("base64"),
                mimeType
            },
        };
    } else {
        console.error('File not found:', pathvar);
        // Handle error appropriately, e.g., return null or throw an error
        return null;
    }
}
  
async function image_to_text(prompt, images) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
    const imageParts = [...images];
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }


let context = {
    "text-to-text": text_to_text,
    "image-to-text": image_to_text,
    "text-image-to-text": image_to_text
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

exports.testRun = async (req, res, next) =>{
    const obj = req.body;
    var arg = obj.prompt + "\n";
    for(var txt of obj.texts){
        arg += txt["prefix"] + " : " + txt["value"] + "\n";
    }
    console.log(arg);
    try{
    var result = await context[obj.model].apply(context, [arg]);
        return res.json(result)
    } catch(err){
        return res.json("Internal Server Error : \n"+ err);
    }
}

exports.testRunImg = async(req,res,next) => {
    const obj = req.body;
    var arg = obj.prompt + "\n";
    for(var txt of obj.texts){
        arg += txt["prefix"] + " : " + txt["value"] + "\n";
    }
    const imageParts = [];
    for(var val of obj.images){
        var img = fileToGenerativePart(val.image, val.mimetype)
        imageParts.push(img);
    }

    try {
        var result = await context[obj.model].apply(context, [arg, imageParts]);
        console.log(result);
        return res.json(result);
    } catch(err){
        return res.json("Internal Server Error : \n"+ err);
    }
}