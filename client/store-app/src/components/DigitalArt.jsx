import React from 'react';
import { useGetArtsQuery } from '../redux/artApi';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';

const DigitalArt = () => {
    const { data: arts = [] } = useGetArtsQuery();

    const digitalArts = arts.filter(art => art.category === 'Digital Art');

    const gridItem = (art) => (
        <div className="col-12 sm:col-6 lg:col-4 p-2" key={art._id}>
            <div className="p-4 border-1 surface-border surface-card border-round">
                <img
                    src={`/images/${art.title}.jpg`}
                    alt={art.title}
                    className="w-full border-round"
                    style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="text-2xl font-bold">{art.title}</div>
                <div className="text-lg">Category: {art.category}</div>
                <div className="text-sm">Artist: {art.artist}</div>
                <div className="text-sm">Description: {art.description}</div>
                <div className="text-lg font-bold">Price: ${art.price}</div>
                <div className="text-sm">Quantity: {art.quantity}</div>
                <Rating value={art.rating} readOnly cancel={false} />
                <div className="flex justify-content-between mt-3">
                    <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" />
                    <Button icon="pi pi-trash" className="p-button-sm p-button-danger" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="card">
            <DataView value={digitalArts} layout="grid" itemTemplate={gridItem} />
        </div>
    );
};

export default DigitalArt;