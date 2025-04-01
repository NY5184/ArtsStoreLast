import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Dropdown } from "primereact/dropdown";

import {
  useGetArtsQuery,
  useCreateArtMutation,
  useUpdateArtMutation,
  useDeleteArtMutation,
} from "../redux/artApi";

const Manager =()=> {
  // Fetching arts data using RTK Query     
  const { data: arts = [], refetch } = useGetArtsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [createArt] = useCreateArtMutation();
  const [updateArt] = useUpdateArtMutation();
  const [deleteArt] = useDeleteArtMutation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOptions, setSortOptions] = useState(null);
  const filteredArts = arts.filter((art) =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedArts = [...filteredArts].sort((a, b) => {
    if (sortOptions === "new to old") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOptions === "old to new") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOptions === "a to z") {
      return a.title.localeCompare(b.title);
    } else if (sortOptions === "z to a") {
      return b.title.localeCompare(a.title);
    } else if (sortOptions === "mostRating") {
      return b.mean - a.mean; // Sort by average rating
    } else if (sortOptions === "leastRating") {
      return a.mean - b.mean; // Sort by average rating
    }
    return 0;
  });

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const [newArt, setNewArt] = useState({ title: "", category: "", price: "", rating: 0 });
  const [currentArt, setCurrentArt] = useState(null);

  const addArt = async () => {
    if (!newArt.title || !newArt.category || !newArt.price||!newArt.artist||!newArt.description) {
      alert("Please fill in all fields.");
      return;
    }
    await createArt(newArt);
    refetch();
    setVisibleAdd(false);
    setNewArt({ title: "", category: "", price: "", rating: 0, artist:"",description:"" ,quentity:1});
  };

  const editArt = async () => {
    await updateArt(currentArt);
    refetch();
    setVisibleEdit(false);
  };

  const removeArt = async () => {
    await deleteArt(currentArt._id);
    refetch();
    setVisibleDelete(false);
  };

  const gridItem = (art) => (
    <div className="art-card" key={art._id}>
      <div className="art-image-wrapper">
        <img
          src={`/images/${art.title}.jpg`}
          alt={art.title}
          className="art-image"
          style={{ width: "20%" }}
        />
        <div className="text-2xl font-bold">{art.title}</div>
        <div className="art-category">Category: {art.category}</div>
        <div className="text-sm">Artist: {art.artist}</div>
        <div className="text-sm">Description: {art.description}</div>
        <div className="text-lg font-bold">Price: ${art.price}</div>
        <div className="text-sm">Quantity: {art.quantity}</div>
        <Rating value={art.mean} readOnly cancel={false} />
        
        <div className="flex justify-content-between mt-3">
          <Button
            icon="pi pi-pencil"
            className="p-button-sm p-button-warning"
            onClick={() => {
              setCurrentArt(art);
              setVisibleEdit(true);
            }}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-sm p-button-danger"
            onClick={() => {
              setCurrentArt(art);
              setVisibleDelete(true);
            }}
          />
        </div>
      </div>
    </div>
  );
  const header = () => {
    const sortOptionsList = [
      { label: "Newest to Oldest", value: "new to old" },
      { label: "Oldest to Newest", value: "old to new" },
      { label: "A to Z", value: "a to z" },
      { label: "Z to A", value: "z to a" },
      { label: "Most Rating to Least Rating", value: "mostRating" },
      { label: "Least Rating to Most Rating", value: "leastRating" },
    ];
     return (
          <div className="header-container">
            <InputText
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <Dropdown
              value={sortOptions}
              options={sortOptionsList}
              onChange={(e) => setSortOptions(e.value)}
              placeholder="Sort by"
              className="sort-dropdown"
            />
          </div>
        );
      };
  return (
    <div className="arts-container">
      <Button
        label="Add New Art"
        icon="pi pi-plus"
        className="p-button-success mb-3"
        onClick={() => setVisibleAdd(true)}
      />

      <DataView value={sortedArts} itemTemplate={gridItem} header={header()}/>

      <Dialog header="Add New Art" visible={visibleAdd} onHide={() => setVisibleAdd(false)}>
        <div className="p-fluid">
          <InputText placeholder="Art Title" value={newArt.title} onChange={(e) => setNewArt({ ...newArt, title: e.target.value })} />
          <InputText placeholder="Category" value={newArt.category} onChange={(e) => setNewArt({ ...newArt, category: e.target.value })} />
          <InputText placeholder="Price" value={newArt.price} onChange={(e) => setNewArt({ ...newArt, price: e.target.value })} />
            <InputText placeholder="Artist" value={newArt.artist} onChange={(e) => setNewArt({ ...newArt, artist: e.target.value })} />
            <InputText placeholder="Description" value={newArt.description} onChange={(e) => setNewArt({ ...newArt, description: e.target.value })} />
            <InputText placeholder="Quantity" value={newArt.quantity} onChange={(e) => setNewArt({ ...newArt, quantity: e.target.value })} />

          <Button label="Add" icon="pi pi-check" className="p-button-success mt-2" onClick={addArt} />
        </div>
      </Dialog>

      <Dialog header="Edit Art" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
        {currentArt && (
          <div className="p-fluid">
            <InputText value={currentArt.title} onChange={(e) => setCurrentArt({ ...currentArt, title: e.target.value })} />
            <InputText value={currentArt.category} onChange={(e) => setCurrentArt({ ...currentArt, category: e.target.value })} />
            <InputText value={currentArt.price} onChange={(e) => setCurrentArt({ ...currentArt, price: e.target.value })} />
            <InputText value={currentArt.artist} onChange={(e) => setCurrentArt({ ...currentArt, artist: e.target.value })} />
            <InputText value={currentArt.description} onChange={(e) => setCurrentArt({ ...currentArt, description: e.target.value })} />
            <InputText value={currentArt.quantity} onChange={(e) => setCurrentArt({ ...currentArt, quantity: e.target.value })} />
            <InputText vakue={currentArt.createdAt} onChange={(e) => setCurrentArt({ ...currentArt, createdAt: e.target.value })} />
            <Button label="Update" icon="pi pi-refresh" className="p-button-warning mt-2" onClick={editArt} />
          </div>
        )}
      </Dialog>

      <Dialog header="Delete Art" visible={visibleDelete} onHide={() => setVisibleDelete(false)}>
        <p>Are you sure you want to delete "{currentArt?.title}"?</p>
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={removeArt} />
      </Dialog>
    </div>
  );

};
export default Manager;


