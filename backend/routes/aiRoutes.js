const express = require('express');
const router = express.Router();
const { execute, testRun, testRunImg  } = require('../controllers/aiControllers.js');
const {storage} = require('../utils/cloudinary.js');
const multer = require('multer');
const upload = multer({storage});
const User = require('../models/UserModel.js')

const Prompt = require('../models/promptModel.js')

//const upload = require('../utils/fileupload.js')

router.post('/execute', execute);
router.post('/testrun', testRun);
router.post('/testrunimg', testRunImg)

router.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file)return {};

    return res.json(req.file);
})

router.get('/getprompts', async (req, res) => {
    const data = await Prompt.find({});
    if(!data){
        return res.status(405).json({message:"No prompts found"});
    }
    return res.status(200).json(data)
})

router.get('/getprompt/:id', async (req, res) => {
    const {id} = req.params;
    const data = await Prompt.findById(id);
    if(!data){
        return res.status(405).json({message:"No prompts found"});
    }
    return res.status(200).json(data)
})

router.get('/getuserprompts/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const prompts = [];
    const promptids = user.apps
    for(var i = 0; i < promptids.length; i++) {
        const prompt = await Prompt.findById(promptids[i]);
        prompts.push(prompt);
    }
    return res.json(prompts);
})

router.post('/publish', async(req, res) => {
    try{
        const { userid, model, prompt, texts,images, title,inputs, description, howtouse,avatar } = req.body;
        const result = await Prompt.create({
            userid, model, prompt, texts , title,inputs, description, howtouse, avatar,images
        })
        if(userid){
            const user = await User.findById(userid);
            if(!user.apps){
                user.apps = [result.id];
            }else{
                user.apps.push(result.id);
            }
            await user.save();
        }
        console.log(result);
        return res.json({message : "file successfully uploaded", id: result.id});
    } catch (e) {
        return res.json({message : "Interal Server Error", id: e});
    }
});




module.exports = router;