// bs"d
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import axios from "axios";

export default function Manager() {
    const [arts, setArts] = useState([]);  
    const [layout, setLayout] = useState("grid");  
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [currentArt, setCurrentArt] = useState(null);
    const [newArt, setNewArt] = useState({ title: "", category: "", price: "", rating: 0 });

    useEffect(() => {
        getArts();
    }, []);

    const getArts = async () => {
        try {
            const res = await axios.get("http://localhost:7020/art");
            if (res.status === 200) {
                setArts(res.data);
            }
        } catch (e) {
            console.error("Error fetching arts:", e);
        }
    };

    const addArt = async () => {
        if (!newArt.title || !newArt.category || !newArt.price) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await axios.post("http://localhost:7020/art", newArt);
            getArts(); // Refresh the list
            setVisibleAdd(false);
            setNewArt({ title: "", category: "", price: "", rating: 0 });
        } catch (error) {
            console.error("Error adding art:", error);
        }
    };

    const updateArt = async () => {
        try {
            await axios.put(`http://localhost:7020/art/${currentArt._id}`, currentArt);
            getArts();
            setVisibleEdit(false);
        } catch (error) {
            console.error("Error updating art:", error);
        }
    };

    const deleteArt = async () => {
        try {
            await axios.delete(`http://localhost:7020/art/${currentArt._id}`);
            getArts();
            setVisibleDelete(false);
        } catch (error) {
            console.error("Error deleting art:", error);
        }
    };

    const gridItem = (art) => (
        <div className="col-12 sm:col-6 lg:col-4 p-2" key={art._id}>
            <div className="p-4 border-1 surface-border surface-card border-round">
                <img
                    src={`/images/${art.title}.jpg`} // תמונה לפי title במקום name
                    alt={art.title}
                    className="w-full border-round"
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="text-2xl font-bold">{art.title}</div>
                <div className="text-lg">{art.category}</div>
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
            <Button label="Add New Art" icon="pi pi-plus" className="p-button-success mb-3" onClick={() => setVisibleAdd(true)} />
            <DataView value={arts} layout={layout} itemTemplate={gridItem} />

            {/* Add Art Dialog */}
            <Dialog header="Add New Art" visible={visibleAdd} onHide={() => setVisibleAdd(false)}>
                <div className="p-fluid">
                    <InputText placeholder="Art Title" value={newArt.title} onChange={(e) => setNewArt({ ...newArt, title: e.target.value })} />
                    <InputText placeholder="Category" value={newArt.category} onChange={(e) => setNewArt({ ...newArt, category: e.target.value })} />
                    <InputText placeholder="Price" value={newArt.price} onChange={(e) => setNewArt({ ...newArt, price: e.target.value })} />
                    <Rating value={newArt.rating} onChange={(e) => setNewArt({ ...newArt, rating: e.value })} />
                    <Button label="Add" icon="pi pi-check" className="p-button-success mt-2" onClick={addArt} />
                </div>
            </Dialog>

            {/* Edit Art Dialog */}
            <Dialog header="Edit Art" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
                {currentArt && (
                    <div className="p-fluid">
                        <InputText value={currentArt.title} onChange={(e) => setCurrentArt({ ...currentArt, title: e.target.value })} />
                        <InputText value={currentArt.category} onChange={(e) => setCurrentArt({ ...currentArt, category: e.target.value })} />
                        <InputText value={currentArt.price} onChange={(e) => setCurrentArt({ ...currentArt, price: e.target.value })} />
                        <Rating value={currentArt.rating} onChange={(e) => setCurrentArt({ ...currentArt, rating: e.value })} />
                        <Button label="Update" icon="pi pi-refresh" className="p-button-warning mt-2" onClick={updateArt} />
                    </div>
                )}
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog header="Delete Art" visible={visibleDelete} onHide={() => setVisibleDelete(false)}>
                <p>Are you sure you want to delete "{currentArt?.title}"?</p>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={deleteArt} />
            </Dialog>
        </div>
    );
}
