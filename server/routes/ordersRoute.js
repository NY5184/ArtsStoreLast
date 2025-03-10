//bs"d
const express=require("express")
const router=express.Router()
const orderController=require("../controllers/orderController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.post("/",orderController.createNewOrder)
router.get("/",orderController.getAllOrders)
router.get("/:id",orderController.getOrderByID)
//router.get("/",verifyJWT,orderController.getAllOrders)
//router.get("/:id",verifyJWT,orderController.getOrderByID)


module.exports=router


