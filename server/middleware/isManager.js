//bs"d
const jwt=require("jsonwebtoken")
const isManager=(req,res,next)=>{
  
const authHeader=req.headers.authorization||req.headers.Authorization

if (!authHeader?.startsWith('Bearer')){
    
    return res.status(401).json({message:"Unauthorized"})
}
const token=authHeader.split(" ")[1]
jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
    if (err) return res.status(403).json({message :'Forbidden'})
        debugger
        if(decoded.role!="admin")return res.status(403).json({message:"this route is just for admins "})

            req.user = decoded
    next()
    }
    )

}
module.exports=isManager