// bs"d
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import axios from 'axios';

export default function Manger() {
    const [arts, setArts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [currentArt, setCurrentArt] = useState(null);
    const [newArt, setNewArt] = useState({ name: '', category: '', price: '', rating: 0 });

    useEffect(() => {
        getArts();
    }, []);

    const getArts = async () => {
        try {
            const res = await axios.get('http://localhost:7020/art');
            if (res.status === 200) {
                setArts(res.data);
            }
        } catch (e) {
            console.error("Error fetching arts:", e);
        }
    };

    const addArt = async () => {
        try {
            await axios.post('http://localhost:7020/art', newArt);
            getArts(); // רענון הרשימה
            setVisibleAdd(false);
            setNewArt({ name: '', category: '', price: '', rating: 0 });
        } catch (error) {
            console.error('Error adding art:', error);
        }
    };

    const updateArt = async () => {
        try {
            await axios.put(`http://localhost:7020/art/${currentArt._id}`, currentArt);
            getArts();
            setVisibleEdit(false);
        } catch (error) {
            console.error('Error updating art:', error);
        }
    };

    const deleteArt = async () => {
        try {
            await axios.delete(`http://localhost:7020/art/${currentArt._id}`);
            getArts();
            setVisibleDelete(false);
        } catch (error) {
            console.error('Error deleting art:', error);
        }
    };

    const gridItem = (art) => (
        <div className="col-12 sm:col-6 lg:col-4 p-2" key={art._id}>
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="text-2xl font-bold">{art.name}</div>
                <Rating value={art.rating} readOnly cancel={false} />
                <div className="flex justify-content-between">
                    <span className="text-2xl font-semibold">${art.price}</span>
                </div>
                <div className="flex justify-content-between mt-3">
                    <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" onClick={() => { setCurrentArt(art); setVisibleEdit(true); }} />
                    <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => { setCurrentArt(art); setVisibleDelete(true); }} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="card">
            <Button label="הוספת ציור" icon="pi pi-plus" className="p-button-success mb-3" onClick={() => setVisibleAdd(true)} />
            <DataView value={arts} layout={layout} itemTemplate={gridItem} />
            
            {/* חלון הוספת ציור */}
            <Dialog header="הוספת ציור" visible={visibleAdd} onHide={() => setVisibleAdd(false)}>
                <div className="p-fluid">
                    <InputText placeholder="שם הציור" value={newArt.name} onChange={(e) => setNewArt({ ...newArt, name: e.target.value })} />
                    <InputText placeholder="קטגוריה" value={newArt.category} onChange={(e) => setNewArt({ ...newArt, category: e.target.value })} />
                    <InputText placeholder="מחיר" value={newArt.price} onChange={(e) => setNewArt({ ...newArt, price: e.target.value })} />
                    <Rating value={newArt.rating} onChange={(e) => setNewArt({ ...newArt, rating: e.value })} />
                    <Button label="הוספה" icon="pi pi-check" className="p-button-success mt-2" onClick={addArt} />
                </div>
            </Dialog>

            {/* חלון עדכון ציור */}
            <Dialog header="עדכון ציור" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
                {currentArt && (
                    <div className="p-fluid">
                        <InputText value={currentArt.name} onChange={(e) => setCurrentArt({ ...currentArt, name: e.target.value })} />
                        <InputText value={currentArt.category} onChange={(e) => setCurrentArt({ ...currentArt, category: e.target.value })} />
                        <InputText value={currentArt.price} onChange={(e) => setCurrentArt({ ...currentArt, price: e.target.value })} />
                        <Rating value={currentArt.rating} onChange={(e) => setCurrentArt({ ...currentArt, rating: e.value })} />
                        <Button label="עדכון" icon="pi pi-refresh" className="p-button-warning mt-2" onClick={updateArt} />
                    </div>
                )}
            </Dialog>

            {/* חלון אישור מחיקה */}
            <Dialog header="מחיקת ציור" visible={visibleDelete} onHide={() => setVisibleDelete(false)}>
                <p>האם את בטוחה שברצונך למחוק את "{currentArt?.name}"?</p>
                <Button label="מחיקה" icon="pi pi-trash" className="p-button-danger" onClick={deleteArt} />
            </Dialog>
        </div>
    );
}
