//bs"d
const express=require("express")
const router=express.Router()
const orderItemsController=require("../controllers/orderItemController")
const isManager=require("../middleware/isManager")
const verifyJWT=require("../middleware/verifyJWT")
const createNewOrder=require("../controllers/orderController")

router.use(verifyJWT)

router.get("/",orderItemsController.getAllOrderItems)
router.get("/:id",orderItemsController.getOrderItemByID)
router.post("/",orderItemsController.createNewOrderItem)
router.put("/",orderItemsController.updateOrderItem)
router.delete("/:id",orderItemsController.deleteOrderItem)

module.exports=router


