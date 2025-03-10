

const OrderItem=require("../models/OrderItem")

const getAllOrderItems=async(req,res)=>{

    const orderItems=await OrderItem.find().lean()
if(!orderItems){
    return res.status(400).json({message:"No ordersItem"})
}
return res.json(orderItems)
}

const getOrderItemByID=async(req,res)=>{
    const {id}=req.params
    const orderItem=await OrderItem.findById(id)
    if(!orderItem){
        return res.status(400).json({message:"Art didn't found"})}
    
    res.json(orderItem)
}

const createNewOrderItem=async(req,res)=>{
    
const{quantity,art,user}=req.body
if(!art||!user){
    return res.status(400).json({message:"all fileds is required"})
}
const newOrderItem={quantity,art,user}
const orderItem=await OrderItem.create(newOrderItem)
const orderItems=await OrderItem.find()
if(!orderItem){
    return res.status(400).json({message:"order item isny found"})
}

return res.json(orderItems)
}

const updateOrderItem=async (req,res)=>{
    const{_id,quantity,art,user}=req.body
    if(!_id){
        return res.status(400).json({message:"you must insert _id"})
    }
    const orderItem=await OrderItem.findById(_id)
    if(!orderItem){
        return res.status(400).json({message:"art didn't found"})
    }
   
    if(quantity)
        orderItem.quantity=quantity
    if(art)
        orderItem.art=art
    if(user)
        orderItem.user=user
   
 
const updateOrderItem=await orderItem.save()

const orderItems=await OrderItem.find().lean()
return res.json(orderItems)
}

const deleteOrderItem=async(req,res)=>{
    const {id}=req.params
    const orderItem = await OrderItem.findById(id).exec()
    if (!orderItem) {
        return res.status(400).json({ message: 'Art not found' })
        }
    const result = await OrderItem.deleteOne()
    const orderItems=await OrderItem.find().lean()
    const reply=`OrderItem '${result.title}' ID ${result._id} deleted`
    res.json({reply:reply,orderItems:orderItems})

}


module.exports={getAllOrderItems,getOrderItemByID,deleteOrderItem,updateOrderItem,createNewOrderItem}

