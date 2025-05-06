const express = require('express');
const { createOrder, addItemToOrder, payOrder } = require('../controllers/OrderGpt');
const { getOrderByUserId } = require('../controllers/OrderGpt');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();
// router.use(verifyJWT)
router.get('/',verifyJWT,getOrderByUserId)
router.post('/', createOrder);
router.put('/add-item', addItemToOrder); // Endpoint to add items to an order
router.post('/pay', payOrder); // Endpoint to pay for an order

module.exports = router;