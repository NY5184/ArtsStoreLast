//bs"d
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios'
import {Routes,Route,Link}from'react-router';
import {
    useGetArtsQuery,
    useCreateArtMutation,
    useUpdateArtMutation,
    useDeleteArtMutation,
  } from "../redux/artApi";

  import { IconField } from 'primereact/iconfield';
  import { InputIcon } from 'primereact/inputicon';
 import { InputText } from 'primereact/inputtext';
          
import Art from './Art';

         
export default function Arts() {
     const { data: arts = [], refetch } = useGetArtsQuery(undefined, {
       refetchOnMountOrArgChange: false,
     });
    const [layout, setLayout] = useState('grid');
    const navigate = useNavigate();
 
    






    const listItem = (art, index) => {
    
        return (
            
            <div className="col-12" key={art.id}>
 
            <Routes><Route path='/Art' element={<Art />}></Route></Routes>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                   
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{art.name}</div>
                            <Rating value={art.rating} ></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{art.category}</span>
                                </span>
                         
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${art.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={art.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (art) => {
        return (
            
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={art.id}>
                
                         <Routes><Route path='/Art' element={<Art />}></Route></Routes>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{art.category}</span>
                        </div>
                        
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                    {/* <Link to={'/Art'}>hjhjhjhjhjhjj</Link> */}
                    <img
                    src={`/images/${art.title}.jpg`} // תמונה לפי title במקום name
                    alt={art.title}
                    className="w-full border-round"
                    style={{ height: "400px", objectFit: "cover" }}
                />
                        <Rating value={art.rating}  ></Rating>
                        <div className="text-2xl font-bold text-900">{art.title}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${art.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={art.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (art, layout, index) => {
        if (!art) {
            return;
        }

        if (layout === 'list') return listItem(art, index);
        else if (layout === 'grid') return gridItem(art);
    };

    const listTemplate = (arts, layout) => {
        return <div className="grid grid-nogutter">{arts.map((art, index) => itemTemplate(art, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={arts} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}
        