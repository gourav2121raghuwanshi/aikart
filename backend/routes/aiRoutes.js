const express = require('express');
const router = express.Router();
const { execute  } = require('../controllers/aiControllers.js');
  

router.post('/execute', execute);


module.exports = router;