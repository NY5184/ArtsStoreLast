//bs"d
const User=require("../models/User");
const bcrypt=require("bcrypt")
const createNewManager=async(req,res)=>{
    const{name,username,password,email,role}=req.body

    if(!username||!name||!password||!email){
        return res.status(400).json({message:'Fields are required'})
    }
   
   
    const duplicate=await User.findOne({username:username})

    if(duplicate){
        return res.status(400).json({message:"Duplicate username"})
    }
    const hashedPwd=await bcrypt.hash(password,10)
    
    const userObject={name:name,email:email,username:username,password:hashedPwd,role}
   
    const user=await User.create(userObject)
    
   
    if(user){
       return res.status(201).json(user) 
    }else{
        return res.status(400).json({message:"Invalid user received"})
    }
   

}


module.exports={createNewManager}