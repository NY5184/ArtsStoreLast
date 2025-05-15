const Art=require("../models/Art")
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const getAllArts=async(req,res)=>{
const arts=await Art.find().lean()
if(!arts){
    return res.status(400).json({message:"No arts"})
}
return res.json(arts)
}

const getArtByID=async(req,res)=>{
    const {id}=req.params
    const art=await Art.findById(id)
    if(!art){
        return res.status(400).json({message:"Art didn't found"})}
    
    res.json(art)
}

const createNewArt=async(req,res)=>{
const{title,description,category,artist,price,createdAt,quantity,imagePath}=req.body
if(!title||!description||!price||!category||!artist||!imagePath){
    return res.status(400).json({message:"all fileds is required"})
}


const newArt={title,description,category,artist,price,createdAt,quantity,imagePath,ratingArray:[],mean:0}

try {
    const art = await Art.create(newArt);
    const arts = await Art.find();
    return res.json(arts);
  } catch (error) {
    console.error("Error creating art:", error);
    return res.status(500).json({ message: "Failed to create art" });
  }


}

const updateArt=async (req,res)=>{
    const {id}=req.params
    const{title,description,category,artist,price,createdAt,quantity}=req.body
    if(!id){
        return res.status(400).json({message:"not found id"})
    }
    const art=await Art.findById(id)
    if(!art){
        return res.status(400).json({message:"art didn't found"})
    }
   
    if(title)
        art.title=title
    if(description)
        art.description=description
    if(category)
        art.category=category
    if(artist)
        art.artist=artist
    if(price)
        art.price=price
    if(createdAt)
        art.createdAt=createdAt
    if(quantity)
        art.quantity=quantity
const updateArt=await art.save()

const arts=await Art.find().lean()
return res.json(arts)
}

const deleteArt=async(req,res)=>{
    const {id}=req.params
    const art = await Art.findById(id).exec()
    if (!art) {
        return res.status(400).json({ message: 'Art not found' })
        }
        console.log("Art found:", art.imagePath);
        const imagePath = path.join(__dirname, "../public", art.imagePath);
        console.log("Trying to delete:", imagePath);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
                // You can choose to return an error here if needed
            }
        });
    const result = await art.deleteOne()
    const arts=await Art.find().lean()
    const reply=`Art '${result.title}' ID ${result._id} deleted`
res.json({reply:reply,arts:arts})

}


const updateRating=async(req,res)=>{
    console.log("arrrived")
    const {rate,_id}=req.body
    console.log("rate:",rate)
    if(!rate){
        console.log("not found")
        return res.status(400).json({message:"insert correct details"})
    }
    const userID=req.user._id
    
    console.log(userID)
    if(!userID||rate<0||rate>5){
        console.log("not found")    
        console.log(userID)
        return res.status(400).json({message:"insert correct details"})
    }
    console.log("arrrived2")
    const art=await Art.findById(_id)
    let prevrate=0
    
    if(art.ratingArray){
        art. ratingArray.map(lastRate=>{
            console.log("user: ",userID)
            console.log(lastRate)
            if(lastRate.userId===userID){
                console.log("found")
                prevrate=lastRate.rate
                lastRate.rate=rate}
          
        })
    }
    if(prevrate!=0){
        art. ratingArray.map(lastRate=>{
            console.log("user: ",userID)
            console.log(lastRate)
        })
        art.mean=(art.mean*art.ratingArray.length-(prevrate-rate))/art.ratingArray.length
        await art.save()
    }else{
    const newRate={userId:userID,rate:rate}
    
    art.mean=(art.mean*art.ratingArray.length+rate)/(art.ratingArray.length+1)
    art.ratingArray=[...art.ratingArray,newRate]
console.log("nnn",art)
console.log("newrate",newRate)
    await art.save()
    console.log("nnn",art)
    }
    
    return res.json({rates:art.ratingArray})
    
    }
const getAverageRating=async(req,res)=>{
    const {id}=req.params
    const art=await Art.findById(id)
    if(!art){
        return res.status(400).json({message:"Art didn't found"})}
    
    let sum=0
    art.ratingArray.map(n=>{
        sum+=n.rate
    })
    art.mean=sum/art.ratingArray.length
    await art.save()
    return res.json(art.mean)
}



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images")); // Save files to public/images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to avoid duplicate names
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only JPG files
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Only JPG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded or invalid file type" });
  }
  res.status(200).json({ message: "File uploaded successfully", filePath: `/images/${req.file.filename}` });
};




module.exports={getAllArts,getArtByID,updateRating,deleteArt,updateArt,createNewArt,getAverageRating,upload,uploadImage}

