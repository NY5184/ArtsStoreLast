//bs"d
require("dotenv").config()
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt")
const User=require("../models/User")

const login=async(req,res)=>{
    const {username,password}=req.body
    if(!username||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    const foundUser=await User.findOne({username}).lean()
    if(!foundUser){
        return res.status(400).json({message:"Unauthorized"})

    }
    const match=await bcrypt.compare(password,foundUser.password)
    if(!match){
        return res .status(400).json({message:"Unauthorized"})
    }
    const userInfo={_id:foundUser._id,name:foundUser.name,
        role:foundUser.role,username:foundUser.username,
        email:foundUser.email
    }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})


}
const register=async(req,res)=>{

    const {username,password,name,email}=req.body
    if(!username||!name||!password||!email){
        return res.status(400).json({message:'All fields are required'})
    }
    console.log(User)
   
    const duplicate=await User.findOne({username:username})
    if(duplicate){
        return res.status(400).json({message:"Duplicate username"})
    }
    const hashedPwd=await bcrypt.hash(password,10)
    const userObject={name:name,email:email,username:username,password:hashedPwd}
    const user=await User.create(userObject)
    if(user){
       return res.status(201).json(user) 
    }else{
        return res.status(400).json({message:"Invalid user received"})
    }
   
}
module.exports={login,register}

