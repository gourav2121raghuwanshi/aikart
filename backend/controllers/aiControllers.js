require('dotenv').config();
const fs = require("fs");
const path = require("path");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function text_to_text(prompt) {
    console.log("prompt", prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

async function fileToGenerativePart(pathOrUrl, mimeType) {
    try {
        if (!pathOrUrl) return null;

        // Cloudinary / remote URL
        if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
            const response = await fetch(pathOrUrl);

            if (!response.ok) {
                console.error("Failed to fetch remote image:", pathOrUrl);
                return null;
            }

            const arrayBuffer = await response.arrayBuffer();

            return {
                inlineData: {
                    data: Buffer.from(arrayBuffer).toString("base64"),
                    mimeType,
                },
            };
        }

        // Local file path
        const resolvedPath = path.resolve(pathOrUrl);

        if (fs.existsSync(resolvedPath)) {
            console.log(resolvedPath);
            return {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(resolvedPath)).toString("base64"),
                    mimeType,
                },
            };
        }

        console.error("File not found:", pathOrUrl);
        return null;
    } catch (err) {
        console.error("fileToGenerativePart error:", err);
        return null;
    }
}

async function image_to_text(prompt, images) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageParts = images.filter(Boolean);

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
};

async function Evaluate(fn, arg) {
    if (fn === "text") {
        console.log("text", arg);
        return arg;
    }

    const arr = [];
    for (let i = 0; i < arg.length; i++) {
        let result = await Evaluate(arg[i].fn, arg[i].args);
        arr.push(result);
    }

    arg = arr;
    const result = await context[fn].apply(context, arg);
    return result;
}

exports.execute = async (req, res, next) => {
    const obj = req.body;
    console.log(JSON.stringify(obj));

    let out = {};
    for (const key in obj) {
        let input = obj[key];
        out[key] = await Evaluate(input.fn, input.args);
    }

    console.log("\nOutput : ", out);
    return res.json(out);
};

exports.testRun = async (req, res, next) => {
    const obj = req.body;
    let arg = obj.prompt + "\n";

    for (let txt of obj.texts) {
        arg += txt["prefix"] + " : " + txt["value"] + "\n";
    }

    console.log(arg);

    try {
        const result = await context[obj.model].apply(context, [arg]);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: String(err),
        });
    }
};

exports.testRunImg = async (req, res, next) => {
    const obj = req.body;
    let arg = obj.prompt + "\n";

    for (let txt of obj.texts) {
        arg += txt["prefix"] + " : " + txt["value"] + "\n";
    }

    const imageParts = [];
    for (let val of obj.images) {
        const img = await fileToGenerativePart(val.image, val.mimetype);
        if (img) imageParts.push(img);
    }

    try {
        const result = await context[obj.model].apply(context, [arg, imageParts]);
        console.log(result);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: String(err),
        });
    }
};