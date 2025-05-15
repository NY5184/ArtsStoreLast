import React, { useState } from "react";
import "../components/Arts.css"; // Import your CSS file for styling
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useGetArtsQuery } from "../redux/artApi";
import AddToCart from "./addToCart";
import { useSelector } from "react-redux";
import { useGetOrderByUserIdQuery } from "../redux/orderApi";
import Manager from "./Manger";

export default function DigitalArts() {
  // Fetch all arts data
  
  const { data: arts = [], refetch } = useGetArtsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const user = useSelector((state) => state.user.user);

  const { data: order } = useGetOrderByUserIdQuery(undefined, {
      refetchOnMountOrArgChange: true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOptions, setSortOptions] = useState(null);

  // Filter and sort the artworks
  const filteredArts = arts
    .filter((art) => art.category === "Figurative") // Only include Digital Art
    .filter((art) =>
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

  // Render each artwork
  const gridItem = (art) => (
    <div className="art-card" key={art._id}>
      <div className="art-card-content">
        <div className="art-card-header">
          <i className="pi pi-tag"></i>
          <span className="art-category">{art.category}</span>
        </div>
        <div className="art-image-wrapper">
        <img
           src={`http://localhost:7020/${art.imagePath}`} 
            className="art-image"
          />
        </div>
        <Rating value={art.mean} readOnly cancel={false}/>
        <div className="art-title">{art.title}</div>
        <div className="art-footer">
          <span className="art-price">${art.price}</span>
          <AddToCart art={art}user={user}order={order} />
        </div>
      </div>
    </div>
  );

  // Header with search and sort options
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
    <div>
    {user.role==="admin"? <Manager/>:<div className="arts-container">
    <DataView value={sortedArts} itemTemplate={gridItem} header={header()} /></div>
    
  }

  </div>
   
  );
}