const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controllers');
const verifyToken = require('../middlewares/verifyToken');


// 🔒 Protected Routes
router.post('/create', verifyToken, cardController.createCard);          // Create Card
router.get('/', verifyToken, cardController.getUserCards);       // Get All Cards of User
router.get('/single/:id', verifyToken, cardController.getSingleCard);    // Get Single Card
router.put('/update/:id', verifyToken, cardController.updateCard);       // Update Card
router.patch('/edit/:id', verifyToken, cardController.editCard);       // Edit Card
router.delete('/delete/:id', verifyToken, cardController.deleteCard);    // Delete Card

module.exports = router;
