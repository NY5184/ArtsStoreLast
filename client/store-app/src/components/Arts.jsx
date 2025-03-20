import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import {
    useGetArtsQuery
} from "../redux/artApi";

export default function Arts() {
    const { data: arts = [] } = useGetArtsQuery();
    const [layout, setLayout] = useState('grid');
    const [searchTerm, setSearchTerm] = useState("");

    // סינון הציורים לפי הכותרת
    const filteredArts = arts.filter((art) =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const gridItem = (art) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 p-2" key={art.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{art.category}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img
                            src={`/images/${art.title}.jpg`}
                            alt={art.title}
                            className="w-full border-round"
                            style={{ height: "400px", objectFit: "cover" }}
                        />
                        <Rating value={art.rating} />
                        <div className="text-2xl font-bold text-900">{art.title}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${art.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={art.inventoryStatus === 'OUTOFSTOCK'} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (art) => {
        return gridItem(art);
    };

    const header = () => {
        return (
            <div className="flex justify-content-between align-items-center mb-3">
                {/* תיבת החיפוש בצד ימין */}
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText
                        placeholder="חיפוש ציור"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </IconField>

                {/* אפשרויות תצוגה */}
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={filteredArts} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    );
}
