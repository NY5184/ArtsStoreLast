const Order=require("../models/Order")
const OrderItem=require("../models/OrderItem")
const Art=require("../models/Art")
const createNewOrder = async (req, res) => {
    const {arts} = req.body
    const user=req.user._id

    if(!arts||!user){
        return res.status(400).json({message:"all fileds is required"})
    }
    
    const newOrder={user}
    const order = await Order.create(newOrder)
    if(!order){
        return res.status(400).json({message:"order didn't created"})
    }
     const orderItemsId=[]
    const artsForDelete=[]

     for (let index = 0; index < arts.length; index++) {
        const a = arts[index];
        const {quantity,art}=a
        const quantityart=await Art.findById(art)
        if(!quantityart)
            {
                return res.status(400).json({message:"art id is not good"})
            }
        if(quantityart.quantity<quantity)
            {
                 return res.status(400).json({message:`there isn'enough from art${quantityart.title}`,title:quantityart.title})
            }
        if(quantityart.quantity>quantity)
            {
                quantityart.quantity=quantityart.quantity-quantity
                const a=await quantityart.save()
                if(!a)
                    {
                        return res.status(400).json({message:"error"})   
                    }
                    
            }
        else{
            artsForDelete.push(quantityart)
            
        }
        
       
             const newOrderItem={quantity,art,order:order._id}
             const orderItem=await OrderItem.create(newOrderItem)
            
            if(orderItem){
                orderItemsId.push(orderItem._id)
            }   
      
        
    }

        order.orderItems=orderItemsId
        const updateOrder=await order.save()
      
        let totalPrice=0

         await updateOrder.populate(
            "orderItems"
        ).then(async order=>{
           
           for (let index = 0; index < order.orderItems.length; index++) {
            
            const orderItem = order.orderItems[index];
            
       
                await  orderItem.populate("art", "price").then(b=>  {console.log("price",b.art.price); totalPrice+=b.art.price*orderItem.quantity   })
            }
        
         
        })        
for (let index = 0; index < artsForDelete.length; index++) {
    const result = await artsForDelete[index].deleteOne()
    
    
}
       
      
        updateOrder.totalPrice=totalPrice
        const updatedOrder=await updateOrder.save()
        const finelarts=await Art.find()
          return res.json({updateOrder:updateOrder,arts:finelarts})
    }

const getAllOrders=async(req,res)=>{

    const orders=await Order.find().lean()
if(!orders){
    return res.status(400).json({message:"No orders"})
}
return res.json(orders)
}

const getOrderByID=async(req,res)=>{
    const {id}=req.params
    const order=await Order.findById(id)
    if(!order){
        return res.status(400).json({message:"order isn't found"})}
    
    res.json(order)
}


module.exports={createNewOrder,getAllOrders,getOrderByID}

