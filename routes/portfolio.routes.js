const express = require('express');
const router = express.Router();
const { submitForm, getForms } = require('../controllers/portfolio.controller');

// Route to handle form submission
router.post('/submit', submitForm);
router.get('/all', getForms);

module.exports = router;
