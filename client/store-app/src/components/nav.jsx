import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router-dom";
const Nav = () => {
   
    const navigate = useNavigate();

    const items = [
        {
            label: 'Art',
            icon: 'pi pi-home',
            command: () => {

            }
        },
        {
            label: 'Arts',
            icon: 'pi pi-star',
            command: () => {
                navigate('./arts')
            }
        },
        {
            label: 'Manger',
            icon: 'pi pi-shopping-cart',
            command: () => {
                navigate('./manger')}
        }
    
        
    ]

    return (
    <div>
        <Menubar model={items} />
    </div>)

}
export default Nav;
