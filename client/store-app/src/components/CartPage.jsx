
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { ProductService } from './service/ProductService';

import { InputNumber } from 'primereact/inputnumber';

// export default function SortingDemo() {
//     const [arts, setProducts] = useState([]);
//     const [sortKey, setSortKey] = useState('');
//     const [sortOrder, setSortOrder] = useState(0);
//     const [sortField, setSortField] = useState('');
//     const [value, setValue] = useState(50);
//     const sortOptions = [
//         { label: 'Price High to Low', value: '!price' },
//         { label: 'Price Low to High', value: 'price' },
//     ];

//     const userId = "YOUR_USER_ID_HERE"; // Replace with actual user ID retrieval


//     const [addItemToOrder] = useAddItemToOrderMutation();
//     useEffect(() => {
//         ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
//     }, []);

//     // Find the last unpaid order

// const updateOrderItems=(artId)=>{


// }
//     const getSeverity = (art) => {
//         switch (art.inventoryStatus) {
//             case 'INSTOCK':
//                 return 'success';
//             case 'LOWSTOCK':
//                 return 'warning';
//             case 'OUTOFSTOCK':
//                 return 'danger';
//             default:
//                 return null;
//         }
//     };

//     const onSortChange = (event) => {
//         const value = event.value;

//         if (value.indexOf('!') === 0) {
//             setSortOrder(-1);
//             setSortField(value.substring(1, value.length));
//             setSortKey(value);
//         } else {
//             setSortOrder(1);
//             setSortField(value);
//             setSortKey(value);
//         }
//     };

//     const header = () => {
//         return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />;
//     };

//     const itemTemplate = (art, index) => {
//         return (
//           <div className="col-12 small-item" key={art.art._id}>
//                 <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
//                     <img 
//                     className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" 
//                      src={`/images/${art.art.title}.jpg`}
//                      alt={art.art.title}/>
//                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                             <div className="text-2xl font-bold text-900">{art.art.title}</div>
//                             <Rating value={art.art.mean} readOnly cancel={false}></Rating>
//                             <div className="flex align-items-center gap-3">
//                                 <span className="flex align-items-center gap-2">
//                                     <i className="pi pi-tag"></i>
//                                     <span className="font-semibold">{art.art.category}</span>
//                                 </span>
//                                 <Tag value={art.art.inventoryStatus} severity={getSeverity(art.art)}></Tag>
//                             </div>
//                         </div>
//                         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                             <span className="text-2xl font-semibold">${art.art.price}</span>
//                             <div className="card flex justify-content-center">
//             <InputNumber value={value} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }} 
//                     decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
//         </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const listTemplate = (items) => {
//         if (!items || items.length === 0) return null;

//         let list = items.map((art, index) => {
//           console.log("art:",art)
//             return itemTemplate(art, index);
//         });

//         return <div className="grid grid-nogutter">{list}</div>;
//     };

//     return (
//       <div>
//         <div className="card half-screen">
//             <h2>Last Unpaid Order Items</h2>
//             <DataView value={order.items} listTemplate={listTemplate} header={header()} sortField={sortField} sortOrder={sortOrder} />
//         </div>
//         <div className="payment-container">
//         <Button label="Pay Now" icon="pi pi-dollar" className="p-button-success" onClick={()=>{}} />
//     </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { useNavigate } from "react-router";
import { useGetOrderByUserIdQuery } from '../redux/orderGptapi';
// import '../styles.css';

export default function CartPage() {
    const { data: order = {}, refetch } = useGetOrderByUserIdQuery({}, {
        refetchOnMountOrArgChange: true,
    });
debugger
    const navigate = useNavigate();
    const [arts, setArts] = useState([]);

    useEffect(() => {
        // Update arts whenever order changes
        refetch()
        if (order) {
            setArts(order.items);
        }
        console.log(order)
    }, [order]); // Depend on `order` to set `arts` when order data changes

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round"  src={`http://localhost:7020/${item.art.imagePath}`}  alt={item.art.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.art.title}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.art.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.art.price}</span>
                <span>Quantity {item.quantity}</span>
            </div>
        );
    };

    return (
        <div className="card xl:flex xl:justify-content-center">
            {order ? (
                <div>
                    <OrderList
                        dataKey="id"
                        value={arts}
                        onChange={(e) => setArts(e.value)}
                        itemTemplate={itemTemplate}
                        header="Arts"
                        filter
                        filterBy="name"
                    />
                    <div>Total price {order.totalPrice}</div>
                    <div className="payment-container">
                        <Button label="Pay Now" icon="pi pi-dollar" className="p-button-success" 
                            onClick={() => {
                                navigate('/payment', { state: { order: order } });
                             
                            }} 
                        />
                    </div>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}