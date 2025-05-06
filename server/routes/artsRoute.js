//bs"d
const express=require("express")
const router=express.Router()
const artController=require("../controllers/artController")
const isManager=require("../middleware/isManager")
const verifyJWT=require("../middleware/verifyJWT")

router.get("/",artController.getAllArts)
router.get("/:id",artController.getArtByID)
router.post("/",isManager,artController.createNewArt)
router.put("/update/:id",isManager,artController.updateArt)
router.delete("/:id",isManager,artController.deleteArt)
router.put("/updateRate",verifyJWT,artController.updateRating)
router.get("/getAverAgeRate/:id",artController.getAverageRating)
router.post("/upload",isManager, artController.upload.single("image"), artController.uploadImage);


module.exports=router


