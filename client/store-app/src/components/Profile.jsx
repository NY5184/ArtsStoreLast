//bs"d

    import React from 'react';
import { Dialog } from 'primereact/dialog'; // Using PrimeReact's Dialog component
import { Button } from 'primereact/button';
import './styles.css'; // Your custom styles
import { useDispatch, useSelector } from 'react-redux';
import { setToken,setUser } from '../redux/userDetails';
import { useNavigate } from 'react-router';
const Profile=({ visible, onHide })=>{
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const logOut=()=>{
       dispatch(setToken(""))
      dispatch( setUser({}))
        console.log("user",user)
        navigate("/arts")
    }
    const user = useSelector((state) => state.user.user);
    return (
        <Dialog
          
            visible={visible}
            style={{ width: '10vw',
                
             }}
           
            onHide={onHide}
            draggable={false}
        >
            <div className="profile-container">
             
               
                <div className="profile-actions">
                
                    <Button
                        label="Log Out"
                        icon="pi pi-sign-out"
                        className="p-button-outlined p-button-danger"
                        onClick={logOut}
                    />
                </div>
            </div>
        </Dialog>
    );
}
export default Profile