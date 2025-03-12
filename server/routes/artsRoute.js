//bs"d
const express=require("express")
const router=express.Router()
const artController=require("../controllers/artController")
const isManager=require("../middleware/isManager")
const verifyJWT=require("../middleware/verifyJWT")
const createNewOrder=require("../controllers/orderController")
router.get("/",artController.getAllArts)
router.get("/:id",artController.getArtByID)
router.post("/",artController.createNewArt)
router.put("/",artController.updateArt)
router.delete("/:id",artController.deleteArt)
router.put("/updateRate",artController.updateRating)

module.exports=router


