//bs"d
const Order = require('../models/OrderGpt');
const Art = require('../models/Art');

const createOrder = async (req, res) => {
    console.log("create")
    const { userId, items } = req.body; // items is an array of { artId, quantity }
    const oldOrder=await Order.find({user:userId,isPayed:false})
    if(oldOrder.length>0){
        console.log(oldOrder)
        return res.status(400).json({ message: 'not payed order already exist ' })
    }
    try {
        // Create the order without saving immediately
        const newOrder = new Order({
            user: userId,
            items
        });
console.log("pop",newOrder)
        // Use populate to fill the art details in one query
        const populatedOrder = await newOrder.populate('items.art');
        
        let totalPrice = 0;

        for (let item of populatedOrder.items) {
            if (!item.art) {
                return res.status(404).json({ message: 'Art not found' });
            }
            totalPrice += item.art.price * item.quantity; // item.art contains the populated Art document
        }

        // Assign totalPrice to the order
        newOrder.totalPrice = totalPrice;

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

const addItemToOrder = async (req, res) => {
    console.log("addItem")
    const { orderId, artId, quantity } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            console.log("addItem")
            return res.status(404).json({ message: 'Order not found' });
        }

        const art = await Art.findById(artId);
        if (!art) {
            return res.status(404).json({ message: 'Art not found' });
        }

        // Check if the art is already in the order
        const existingItem = order.items.find(item => item.art.toString() === artId);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity
        } else {
            order.items.push({ art: artId, quantity });
        }

        // Update total price
        order.totalPrice += art.price * quantity;

        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to order', error });
    }
};
const getOrderByUserId = async (req, res) => {
    console.log("gtbyusrdrid")
    const user = req.user._id
    console.log(user)
    const notPayedOrder = await Order.findOne({user: user,isPayed:false})
   
    if(!notPayedOrder){
       
        return res.json(null)
    }
    
    const populatedOrder = await notPayedOrder.populate('items.art');
    console.log(populatedOrder)
    return res.json(populatedOrder)
}


const payOrder = async (req, res) => {
    const { orderId } = req.body;
 console.log("order",orderId)
    try {
       
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
       
        // Check if already paid
        if (order.isPayed) {
            return res.status(400).json({ message: 'Order has already been paid' });
        }
        const outOffStock=[];
        // Update each art's quantity in the database
        for (let item of order.items) {
            console.log("art:",item)
            const art = await Art.findById(item.art);
            if (art) {
                if(art.quantity-item.quantity<0)
                   { outOffStock.push(art)
                    order.totalPrice-=item.quantity*art.price
                    order.items.remove(item)
                   }
               
                else{art.quantity -= item.quantity;
                 // Decrease the quantity of art
                await art.save();}
            }
        }
    
        // Mark the order as paid
        order.isPayed = true;
        console.log("isPayed:",order)
        await order.save();
        if(outOffStock.length>0){
            return res.status(500).json({message:"outOffStock",arts:outOffStock,order:order})
        }

       return res.json(order);
    } catch (error) {
        console.log("isPayed:",error)
       return res.status(500).json({ message: 'Error processing payment', error });
    }
};

module.exports = {
    createOrder,
    addItemToOrder,
    payOrder,
    getOrderByUserId
};