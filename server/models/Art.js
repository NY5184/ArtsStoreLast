//bs"d
const mongoose=require("mongoose")
const artSchema=new mongoose.Schema({
    title: { type: String, required: true ,unique:true},
    description: { type: String, required: true },
    category:{ type: String, required: true },
    artist:{ type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    ratingArray:[{userId:{
                        type:String
                    },
                rate:{
                        type:Number,
                        min:1,
                        max:5
                    }}],
    mean:{type:Number,default:0}
  }
)
module.exports=mongoose.model('Art',artSchema)