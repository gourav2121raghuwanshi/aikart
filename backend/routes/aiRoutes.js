const express = require('express');
const router = express.Router();
const { models, execute  } = require('../controllers/aiControllers.js');

router.post('/execute', execute);

module.exports = router;