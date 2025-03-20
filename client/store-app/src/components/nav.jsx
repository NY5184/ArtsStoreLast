import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";
const Nav = () => {
   
    const navigate = useNavigate();

    const items = [
    {
        icon:<img
        src="/images/logo.webp" alt="Logo" className="shop-logo" // תמונה לפי title במקום name
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
            icon: 'pi pi-shopping-cart',
            command: () => {
                navigate('./DigitalArt')}
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
