//bs"d
const express=require("express")
const router=express.Router()

const isManager=require("../middleware/isManager")
const userController=require("../controllers/userController")


router.post("/",isManager,userController.createNewManager)
module.exports=router