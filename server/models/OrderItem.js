const mongoose=require("mongoose")
const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  art: { type: mongoose.Schema.Types.ObjectId, ref: 'Art', required: true },
  quantity: { type: Number, default: 1 }}
  
 );
module.exports=mongoose.model('OrderItem',orderItemSchema)