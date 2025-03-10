//bs"d
const mongoose=require("mongoose")
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems:[ { type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}],
    
    //,quantity: { type: Number, default: 1 }}],
  totalPrice: { type: Number},
  orderDate: { type: Date, default: Date.now },
});
module.exports=mongoose.model('Order',orderSchema)

