//bs"d
require("dotenv").config()
const express=require("express")
const cors =require("cors")
const  mongoose  = require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const PORT=process.env.PORT || 7022
const app=express()
connectDB()
app.use(express.json())
app.use(cors(corsOptions))
app.use("/auth",require("./routes/authRoutes"))
app.use("/user",require("./routes/usersRoute"))
app.use("/art",require("./routes/artsRoute"))
app.use("/orderItem",require("./routes/orderItemsRoute"))
app.use("/order",require("./routes/ordersRoute"))

app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.send("ein od milvado //home page")
})
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{console.log(`Server run on ${PORT}`)})
})
mongoose.connection.on('error',err=>{console.log(err)})