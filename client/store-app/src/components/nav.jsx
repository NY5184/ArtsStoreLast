import { Menubar } from 'primereact/menubar';
import './Nav.css';
import { useNavigate } from "react-router-dom";
const Nav = () => {
   
    const navigate = useNavigate();

    const items = [
    {
        icon:<img
        src="/images/logo3.webp" alt="logo3" className="shop-logo3" // תמונה לפי title במקום name
        style={{ height: "80px", width: "80px" ,borderRadius: "40px"}}
    />
    },
    
    {
            label: 'Arts',
            icon: 'pi pi-home',
            command: () => {
                navigate('./arts')
            }
        },
       
        
        {
            label: 'DigitalArt',
            icon: "pi pi-desktop",
            command: () => {
                navigate('./DigitalArt')}
        },
        {
            label: 'AbstractArt',
            icon: 'pi pi-palette',
            command: () => {
                navigate('./AbstractArt')}
        },
        {
            label: 'Figurative',
            icon: 'pi pi-user',
            command: () => {
                navigate('./Figurative')}
        },
        {
            label: 'Fantasy',
            icon: 'pi pi-star',
            command: () => {
                navigate('./Fantasy')}
        },
        {
            label: "Nature",
            icon: "pi pi-globe", // Represents nature art (leaf for nature)
            command: () => {
              navigate("./Nature");
            },
          },
        {
            label: 'Manger',
            icon: 'pi pi-shopping-cart',
            command: () => {
                navigate('./manger')}
        },
    
        
    
        
    ]

    return (
    <div>
        <Menubar model={items} />
    </div>)

}
export default Nav;
