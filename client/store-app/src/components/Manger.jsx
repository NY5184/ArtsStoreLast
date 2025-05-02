import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Dropdown } from "primereact/dropdown";
import "./Manger.css";
import {
  useGetArtsQuery,
  useCreateArtMutation,
  useUpdateArtMutation,
  useDeleteArtMutation,
  useUploadImageMutation
} from "../redux/artApi";

const Manager =()=> {
  // Fetching arts data using RTK Query     
  const { data: arts = [], refetch } = useGetArtsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [createArt] = useCreateArtMutation();
  const [updateArt] = useUpdateArtMutation();
  const [deleteArt] = useDeleteArtMutation();
  const [uploadImage] = useUploadImageMutation(); // Assuming you have this mutation defined
  
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

  const [newArt, setNewArt] = useState({ title: "", category: "", price: "", rating: 0 ,artist:"",description:"" ,quantity:1,imagePath:"" });
  const [currentArt, setCurrentArt] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update the selected file
  };

  
  
  
  
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData).unwrap();
      alert(response.message);
      setNewArt({ ...newArt, imagePath: response.filePath }); // Save the uploaded image path
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };
  const addArt = async () => {
    if (!newArt.title || !newArt.category || !newArt.price || !newArt.artist || !newArt.imagePath) {
      alert("Please fill in all fields, including the image.");
      return;
    }
  
    // Append the selected file to FormData 
  
    try {
      await createArt(newArt);// Send the FormData
      refetch();
      setVisibleAdd(false);
      setNewArt({
        title: "",
        category: "",
        price: "",
        rating: 0,
        artist: "",
        description: "",
        quantity: 1,
        imagePath: "",
      });
      alert("Art created successfully!");
    } catch (error) {
      console.error("Error creating art:", error);
      alert("Failed to create art. Please try again.");
    }
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
      <div className="art-card-content">
        <div className="art-image-wrapper">
          <img
           src={`http://localhost:7020/${art.imagePath}`} 
            className="art-image"
          />
        </div>
        <div className="text-2xl">{art.title}</div>
        <div className="art-category">{art.category}</div>
        <div className="text-sm">Artist: {art.artist}</div>
        <div className="text-lg">Price: ${art.price}</div>
        <div className="rating">
          <Rating value={art.mean} readOnly cancel={false} />
        </div>
        <div className="flex">
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
{
      <Dialog header="Add New Art" visible={visibleAdd} onHide={() => setVisibleAdd(false)}>
        <div className="p-fluid">
          <InputText placeholder="Art Title" value={newArt.title} onChange={(e) => setNewArt({ ...newArt, title: e.target.value })} />
          <InputText placeholder="Category" value={newArt.category} onChange={(e) => setNewArt({ ...newArt, category: e.target.value })} />
          <InputText placeholder="Price" value={newArt.price} onChange={(e) => setNewArt({ ...newArt, price: e.target.value })} />
            <InputText placeholder="Artist" value={newArt.artist} onChange={(e) => setNewArt({ ...newArt, artist: e.target.value })} />
            <InputText placeholder="Description" value={newArt.description} onChange={(e) => setNewArt({ ...newArt, description: e.target.value })} />
            <InputText placeholder="Quantity" value={newArt.quantity} onChange={(e) => setNewArt({ ...newArt, quantity: e.target.value })} />
            <input type="file" accept=".jpg" onChange={handleFileChange} />
          <Button
            label="Upload Image"
            icon="pi pi-upload"
            className="p-button-success mt-2"
            onClick={handleFileUpload}
          />
          <InputText placeholder="imagePath" value={newArt.imagePath}  />
          <Button label="Add" icon="pi pi-check" className="p-button-success mt-2" onClick={addArt} />
        </div>
      </Dialog> }
{
      <Dialog header="Edit Art" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
  {currentArt && (
    <div className="p-fluid">
      <div className="field">
        <label htmlFor="title">Title</label>
        <InputText
          id="title"
          value={currentArt.title}
          onChange={(e) => setCurrentArt({ ...currentArt, title: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <InputText
          id="category"
          value={currentArt.category}
          onChange={(e) => setCurrentArt({ ...currentArt, category: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="price">Price</label>
        <InputText
          id="price"
          value={currentArt.price}
          onChange={(e) => setCurrentArt({ ...currentArt, price: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="artist">Artist</label>
        <InputText
          id="artist"
          value={currentArt.artist}
          onChange={(e) => setCurrentArt({ ...currentArt, artist: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <InputText
          id="description"
          value={currentArt.description}
          onChange={(e) => setCurrentArt({ ...currentArt, description: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="quantity">Quantity</label>
        <InputText
          id="quantity"
          value={currentArt.quantity}
          onChange={(e) => setCurrentArt({ ...currentArt, quantity: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="createdAt">Created At</label>
        <InputText
          id="createdAt"
          value={currentArt.createdAt}
          onChange={(e) => setCurrentArt({ ...currentArt, createdAt: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="imagePath">Image Path</label>
        <InputText
          id="imagePath"
          value={currentArt.imagePath}
        />
      </div>
      <Button
        label="Update"
        icon="pi pi-refresh"
        className="p-button-warning mt-2"
        onClick={editArt}
      />
    </div>
  )}
</Dialog>  }
<Dialog
  header="Edit Art"
  visible={visibleEdit}
  onHide={() => setVisibleEdit(false)}
  className="edit-dialog" // Add this class name
>
  {currentArt && (
    <div className="p-dialog-content">
      <div className="field">
        <label htmlFor="title">Title</label>
        <InputText
          id="title"
          value={currentArt.title}
          onChange={(e) => setCurrentArt({ ...currentArt, title: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <InputText
          id="category"
          value={currentArt.category}
          onChange={(e) => setCurrentArt({ ...currentArt, category: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="price">Price</label>
        <InputText
          id="price"
          value={currentArt.price}
          onChange={(e) => setCurrentArt({ ...currentArt, price: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="artist">Artist</label>
        <InputText
          id="artist"
          value={currentArt.artist}
          onChange={(e) => setCurrentArt({ ...currentArt, artist: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <InputText
          id="description"
          value={currentArt.description}
          onChange={(e) => setCurrentArt({ ...currentArt, description: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="quantity">Quantity</label>
        <InputText
          id="quantity"
          value={currentArt.quantity}
          onChange={(e) => setCurrentArt({ ...currentArt, quantity: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="createdAt">Created At</label>
        <InputText
          id="createdAt"
          value={currentArt.createdAt}
          onChange={(e) => setCurrentArt({ ...currentArt, createdAt: e.target.value })}
        />
      </div>
      <div className="dialog-footer">
        <Button
          label="Update"
          icon="pi pi-refresh"
          className="p-button-warning"
          onClick={editArt}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-secondary"
          onClick={() => setVisibleEdit(false)}
        />
      </div>
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


