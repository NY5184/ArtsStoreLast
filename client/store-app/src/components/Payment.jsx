import React from 'react';

import { useForm } from 'react-hook-form';
import '../PaymentForm.css'; // Make sure to create this CSS file
import {usePayOrderMutation} from '../redux/orderApi';
import { useLocation, useNavigate } from 'react-router';
const Payment = () => {
    const location = useLocation();
    const { order } = location.state || {};
  const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [payAndCloseOrder] = usePayOrderMutation(); // Move hook call here

    const onSubmit = async (data) => {
        try {
        
            const resOrder = await payAndCloseOrder(order._id );
            // Handle response (e.g., success or error)
            console.log(resOrder);
            navigate("/CartPage")
        } catch (error) {
            // Handle error (e.g., show an error message)
           debugger
            if(error.data.arts){
                alert(`${error.data.art.title} is out of stock`)
            }
            console.error(error);
            navigate("/CartPage")
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
            <div>
                <label>Cardholder Name
                    <input 
                        {...register("cardholderName", { required: "This field is required" })} 
                    />
                </label>
                {errors.cardholderName && <p className="error">{errors.cardholderName.message}</p>}
            </div>

            <div>
                <label>Credit Card Number
                    <input 
                        {...register("cardNumber", { 
                            required: "This field is required", 
                            minLength: { value: 16, message: "Must be 16 digits", }, 
                            maxLength: { value: 16, message: "Must be 16 digits" },
                            pattern: { value: /^[0-9]{16}$/, message: "Card number must be numbers only" }
                        })} 
                    />
                </label>
                {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
            </div>

            <div className="expiry-cvv">
                <div>
                    <label>Expiration Date (MM/YY)
                        <input 
                            {...register("expiryDate", { 
                                required: "This field is required", 
                                pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Must be a valid date (MM/YY)" }
                            })} 
                        />
                    </label>
                    {errors.expiryDate && <p className="error">{errors.expiryDate.message}</p>}
                </div>

                <div>
                    <label>CVV
                        <input 
                            {...register("cvv", {
                                required: "This field is required", 
                                minLength: { value: 3, message: "Must be 3 digits" },
                                maxLength: { value: 3, message: "Must be 3 digits" },
                                pattern: { value: /^[0-9]{3}$/, message: "CVV must be numbers only" }
                            })} 
                        />
                    </label>
                    {errors.cvv && <p className="error">{errors.cvv.message}</p>}
                </div>
            </div>

            <div>
                <label>Identity Number
                    <input 
                        {...register("identityNumber", { 
                            required: "This field is required", 
                            minLength: { value: 8, message: "Must be at least 8 digits" },
                            maxLength: { value: 10, message: "Must be at most 10 digits" },
                            pattern: { value: /^[0-9]+$/, message: "Identity number must be numbers only" }
                        })} 
                    />
                </label>
                {errors.identityNumber && <p className="error">{errors.identityNumber.message}</p>}
            </div>

            <button className="button" type="submit" disabled={false} >Pay</button>
        </form>
    );
};

export default Payment;