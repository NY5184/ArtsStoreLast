//bs"d
const express=require("express")
const router=express.Router()
const orderController=require("../controllers/OrderController")
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT);
router.get('/',orderController.getOrderByUserId)
router.post('/', orderController.createOrder);
router.put('/add-item', orderController.addItemToOrder); // Endpoint to add items to an order
router.post('/pay', orderController.payOrder); // Endpoint to pay for an order

module.exports = router;


