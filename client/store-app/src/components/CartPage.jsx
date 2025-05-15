
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ProductService } from './service/ProductService';

import { InputNumber } from 'primereact/inputnumber';



import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { useNavigate } from "react-router";
import { useAddItemToOrderMutation, useGetOrderByUserIdQuery } from '../redux/orderApi';
import './styles.css';
export default function SortingDemo() {
    debugger
    const [arts, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const [value, setValue] = useState(50);
    const navigate = useNavigate();
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
    ];
    const { data: order, refetch } = useGetOrderByUserIdQuery({}, {
        refetchOnMountOrArgChange: true,
    });

    const [orderedItemsCount, setOrderedItemsCount] = useState(order? order.items.length : 0);

    const [addItemToOrder] = useAddItemToOrderMutation();
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    }, []);
    useEffect(() => {
        setOrderedItemsCount(order ? order.items.length : 0);
    }, [order]);

    // Find the last unpaid order

    const addItem = async(art) => {
      
        try{ const res=await addItemToOrder({orderId:order._id, artId:art.art._id,quantity: 1});
        if(res ){
           
           refetch() 
           alert(art.art.title+" added successfully!")
        }
        }
        catch(err){
            console.log("err",err)
        }
           
    };
    const removeItem = async (art) => {
        try{ const res=await addItemToOrder({orderId:order._id, artId:art.art._id,quantity: -1});
    if(res ){
       
        refetch()
         alert(art.art.title+" removed successfully!")
    }
    }
    catch(err){
        console.log("err",err)
    }
       
    };
    const getSeverity = (art) => {
        switch (art.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };
    const header = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h3>Ordered Items Count: {orderedItemsCount}</h3>
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />
            </div>
        );
    };
    const itemTemplate = (art, index) => {
        return (
            <div className="small-item" key={art.art._id}>
               
                <div className="flex align-items-center justify-content-between">
                    <img src={`http://localhost:7020/${art.art.imagePath}`} alt={art.art.name} />
                    <div className="flex flex-column">
                        <div className="text-xl font-bold">{art.art.title}</div>
                        <Rating value={art.art.mean} readOnly cancel={false}></Rating>
                        <div className="flex align-items-center gap-1">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{art.art.category}</span>
                            <Tag value={art.art.inventoryStatus} severity={getSeverity(art.art)}></Tag>
                        </div>
                        <span className="text-xl font-semibold">${art.art.price}</span>
                        <span className="text-sm">Quantity: {art.quantity || 0}</span> {/* Display quantity */}
                    </div>
                    <div className="flex">
                        <Button label="Add" onClick={() => addItem(art)} className="p-button-success" />
                        <Button label="Remove" onClick={() => removeItem(art)} className="p-button-danger" />
                    </div>
                </div>
            </div>
        );
    };
    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((art, index) => {
          console.log("art:",art)
            return itemTemplate(art, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        
        <div>{order?<div>
                    <div className="card half-screen">
                <h2>Last Unpaid Order Items</h2>
                <DataView value={order.items} listTemplate={listTemplate} header={header()} sortField={sortField} sortOrder={sortOrder} />
            </div>
    
            {/* Flex container for Total Price and Pay Button */}
            <div className="total-price-container">
                {/* Pay Now Button */}
                <div className="payment-container">
                    <Button label="Pay Now" icon="pi pi-dollar" className="p-button-success pay-button" onClick={() => {navigate('/payment', { state: { order: order } });}} />
                </div>
                <div className="total-price-box">
                    <h4>{`Total Price: $${order.totalPrice}`}</h4>
                </div>
            </div> </div>:<div className="grid grid-nogutter">{<p>Your cart is empty.</p>}</div>}
    
        </div>
    );
}
// import React, { useState, useEffect } from 'react';
// import { OrderList } from 'primereact/orderlist';
// import { useNavigate } from "react-router";
// import { useGetOrderByUserIdQuery } from '../redux/orderApi';
// import './styles.css';

// export default function CartPage() {
//     const { data: order = {}, refetch } = useGetOrderByUserIdQuery({}, {
//         refetchOnMountOrArgChange: true,
//     });
// debugger
//     const navigate = useNavigate();
//     const [arts, setArts] = useState([]);

//     useEffect(() => {
//         // Update arts whenever order changes
//         refetch()
//         if (order) {
//             setArts(order.items);
//         }
//         console.log(order)
//     }, [order]); // Depend on `order` to set `arts` when order data changes

//     const itemTemplate = (item) => {
//         return (
//             <div className="flex flex-wrap p-2 align-items-center gap-3">
//                 <img className="w-4rem shadow-2 flex-shrink-0 border-round"  src={`http://localhost:7020/${item.art.imagePath}`}  alt={item.art.name} />
//                 <div className="flex-1 flex flex-column gap-2 xl:mr-8">
//                     <span className="font-bold">{item.art.title}</span>
//                     <div className="flex align-items-center gap-2">
//                         <i className="pi pi-tag text-sm"></i>
//                         <span>{item.art.category}</span>
//                     </div>
//                 </div>
//                 <span className="font-bold text-900">${item.art.price}</span>
//                 <span>Quantity {item.quantity}</span>
//             </div>
//         );
//     };

//     return (
//         <div className="card xl:flex xl:justify-content-center">
//             {order ? (
//                 <div>
//                     <OrderList
//                         dataKey="id"
//                         value={arts}
//                         onChange={(e) => setArts(e.value)}
//                         itemTemplate={itemTemplate}
//                         header="Arts"
//                         filter
//                         filterBy="name"
//                     />
//                     <div>Total price {order.totalPrice}</div>
//                     <div className="payment-container">
//                         <Button label="Pay Now" icon="pi pi-dollar" className="p-button-success" 
//                             onClick={() => {
//                                 navigate('/payment', { state: { order: order } });
                             
//                             }} 
//                         />
//                     </div>
//                 </div>
//             ) : (
//                 <p>Your cart is empty</p>
//             )}
//         </div>
//     );
// }