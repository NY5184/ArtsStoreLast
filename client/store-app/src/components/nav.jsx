import { Menubar } from 'primereact/menubar';
import './Nav.css';
import { useNavigate } from "react-router-dom";
import ChatbotComponent from './Chatbot';
import { useSelector } from 'react-redux';
const Nav = () => {
   
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const items = [
    {
        command: () => {
            navigate('./profile')
        },
        icon:<img
        src="/logo3.webp" alt="logo3" className="shop-logo3" // תמונה לפי title במקום name
        style={{ height: "80px", width: "80px" ,borderRadius: "40px"}}
    />
    },
    
    {
            label: 'Arts',
            icon: 'pi pi-home',
            className: 'menu-label-small', // Add a custom class
            command: () => {
                navigate('./')
            }
        },
       
        
        {
            label: 'DigitalArt',
            icon: "pi pi-desktop",
            className: 'menu-label-small', // Add a custom class
            command: () => {
                navigate('./DigitalArt')}
        },
        {
            label: 'AbstractArt',
            icon: 'pi pi-palette',
            className: 'menu-label-small', // Add a custom class
            command: () => {
                navigate('./AbstractArt')}
        },
        {
            label: 'Figurative',
            icon: 'pi pi-user',
            className: 'menu-label-small', // Add a custom class
            command: () => {
                navigate('./Figurative')}
        },
        {
            label: 'Fantasy',
            icon: 'pi pi-star',
            className: 'menu-label-small', // Add a custom class
            command: () => {
                navigate('./Fantasy')}
        },
        {
            label: "Nature",
            icon: "pi pi-globe", 
            className: 'menu-label-small', // Add a custom class// Represents nature art (leaf for nature)
            command: () => {
              navigate("./Nature");
            },
          },
      
        {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            className: 'menu-label-small', // Add a custom class
            command: () => {
                navigate('./CartPage')}
        },
        
    
        
    
        
    ]
    const managerItems = [
        {
            command: () => {
                navigate('./profile')
            },
            icon:<img
            src="/logo3.webp" alt="logo3" className="shop-logo3" // תמונה לפי title במקום name
            style={{ height: "80px", width: "80px" ,borderRadius: "40px"}}
        />
        },
        
        
            {
                label: 'Manger',
                icon: 'pi pi-shopping-cart',
                className: 'menu-label-small', // Add a custom class
                command: () => {
                    navigate('./manager')}
            },
           
            
        
            
        
            
        ]

    return (
    <div>
        {user.role==="admin"?<Menubar model={managerItems}/>: <Menubar model={items} />}
       
    </div>)

}
export default Nav;
