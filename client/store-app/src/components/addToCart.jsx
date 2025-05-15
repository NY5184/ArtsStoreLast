//bs"d
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByUserIdQuery,useAddItemToOrderMutation,useCreateOrderMutation } from '../redux/orderApi';
import { Button } from 'primereact/button';


const AddToCart = ({ art,user,order }) => {
 
    const [addItemToOrder] = useAddItemToOrderMutation();
    const [createOrder] = useCreateOrderMutation();

    const handleAddToCart = async () => {
      debugger
        if (!user._id) {
            alert("You can't add items to the cart before logging in.");
            return;
        }
        
        
        
        if (order) {
            try {
                const updatedOrder=await addItemToOrder({orderId:order._id, artId:art._id,quantity: 1}); // Adding 1 quantity for the art
                console.log("update:",updatedOrder)
                alert(art.title+" added succesfully!")
                // refetch(); 
            } catch (error) {
                console.error('Error updating existing order:', error);
            }
        } else {
            try {
                const newOrder = await createOrder({ userId: user._id, items: [{ art: art._id, quantity: 1 }] }).unwrap();
                console.log('New Order Created:', newOrder);
                debugger
                alert(art.title, " added succesfully!")
                // refetch(); 
            } catch (error) {
                console.error('Error creating order:', error);
            }
        }
    };

    return (
        <Button
            onClick={handleAddToCart}
            icon="pi pi-shopping-cart"
            className="p-button-rounded"
            disabled={art.quantity === 0}
        />
    );
};

export default AddToCart;