//bs"d

    import React from 'react';
import { Dialog } from 'primereact/dialog'; // Using PrimeReact's Dialog component
import { Button } from 'primereact/button';
import './styles.css'; // Your custom styles
import { useSelector } from 'react-redux';
const Profile=({ visible, onHide })=>{
    const user = useSelector((state) => state.user.user);
    return (
        <Dialog
            header="User Profile"
            visible={visible}
            style={{ width: '30vw' }}
            modal
            className="profile-dialog"
            onHide={onHide}
            draggable={false}
        >
            <div className="profile-container">
                <img
                    src={   "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="profile-image"
                />
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <div className="profile-actions">
                    <Button
                        label="Edit Profile"
                        icon="pi pi-pencil"
                        className="p-button-outlined p-button-info"
                    />
                    <Button
                        label="Log Out"
                        icon="pi pi-sign-out"
                        className="p-button-outlined p-button-danger"
                    />
                </div>
            </div>
        </Dialog>
    );
}
export default Profile