const Art=require("../models/Art")

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
const{title,description,category,artist,price,createdAt,quantity}=req.body
if(!title||!description||!price||!category||!artist){
    return res.status(400).json({message:"all fileds is required"})
}
      
const newArt={title,description,category,artist,price,createdAt,quantity}
const art=await Art.create(newArt)
const arts=await Art.find()
if(!art){
    return res.status(400).json({message:"art didn't created"})
}

return res.json(arts)
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
    const result = await art.deleteOne()
    const arts=await Art.find().lean()
    const reply=`Art '${result.title}' ID ${result._id} deleted`
res.json({reply:reply,arts:arts})

}

const updateRating=async(req,res)=>{
const {_id,rate,userID}=req.body
if(!_id||!userID||rate<1||rate>5){
    return res.status(400).json({message:"insert correct details"})
}
const art=await Art.findById(_id)
let prevrate=0
console.log(art)
if(art.ratingArray){
art. ratingArray.map(n=>{
    if(n.userID===userID){
        prevrate=n.rate
    n.rate=rate}
  
})}
if(prevrate!=0){
    art.mean=(art.mean*art.ratingArray.length-(prevrate-rate))/art.ratingArray.length
    await art.save()
}else{
const newRate={userID:userID,rate:rate}

art.mean=(art.mean*art.ratingArray.length+rate)/(art.ratingArray.length+1)
art.ratingArray=[...art.ratingArray,newRate]

await art.save()
}
const arts=await Art.find().lean()
return res.json(arts)

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

module.exports={getAllArts,getArtByID,updateRating,deleteArt,updateArt,createNewArt,getAverageRating}

