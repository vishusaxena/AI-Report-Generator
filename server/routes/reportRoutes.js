const express = require('express');
const { generateReport } = require('../controllers/reprotController');
const router = express.Router();

router.post('/generate', generateReport);

module.exports = router;
