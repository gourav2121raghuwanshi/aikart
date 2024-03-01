const express = require('express');
const router = express.Router();
const { execute, testRun  } = require('../controllers/aiControllers.js');
const {storage} = require('../utils/cloudinary.js');
const multer = require('multer');
const upload = multer({storage});

const Prompt = require('../models/promptModel.js')

//const upload = require('../utils/fileupload.js')

router.post('/execute', execute);
router.post('/testrun', testRun);

router.post('/publish', upload.single('avatar'), async(req, res) => {
    const avatar = req.file.path;
    const { userid, model, prompt, texts, title, description, howtouse } = req.body;

    const result = await Prompt.create({
        userid, model, prompt, texts, title, description, howtouse, avatar:avatar
    })
    console.log(result);
    return res.json({message : "file successfully uploaded", id: result.id})
});




module.exports = router;