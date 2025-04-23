// import React, { useState ,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { classNames } from 'primereact/utils';
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';


// import {
//     useGetArtsQuery,
//     useGetAverageRatingQuery
// } from "../redux/artApi";

// export default function Arts() {
//     const { data: arts = [], refetch } = useGetArtsQuery(undefined, {
//       refetchOnMountOrArgChange: false,
//     });
   
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortOptions, setSortOptions] = useState(null);
//     const [meanRating, setMeanRating] = useState(0);

  
// const AverageRating=async (artId) => {
//     try {
//         const response = await useGetAverageRatingQuery(artId);
//         refetch();
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching mean rating:", error);
//         return 0; // Default to 0 in case of an error
//     }

// }
//     // סינון הציורים לפי הכותרת
//     const filteredArts = arts.filter((art) =>
//         art.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
// const sortedArts=[...filteredArts].sort((a, b) => {
// if(sortOptions==="new to old"){
//     return new Date(b.createdAt)-new Date(a.createdAt)
// }
// else if(sortOptions==="old to new"){ 
//     return new Date(a.createdAt)-new Date(b.createdAt)   
// }
// else if(sortOptions==="a to z"){
// return a.title.localeCompare(b.title);
// }
// else if(sortOptions==="z to a"){
//     return b.title.localeCompare(a.title);
// }
// else if(sortOptions==="mostRating"){
//     return b.rating-a.rating;
// }
// else if(sortOptions==="leastRating"){
//     return a.rating-b.rating;
// }
//     return 0;
// })
//     const gridItem = (art) => {

//             const fetchMeanRating = async () => {
//                 try {
//                     const response = await AverageRating (art._id);
//                     refetch();
//                     const meanRating = Math.round(response.data); // Convert to integer
//                     setMeanRating(meanRating); // Update the state
//                 } catch (error) {
//                     console.error("Error fetching mean rating:", error);
//                     setMeanRating(0); // Default to 0 in case of an error
//                 }
//             };
    
//             // fetchMeanRating();
//         // Fetch the rating whenever the art ID changes
//         return (
//             <div className="col-12 sm:col-6 lg:col-4 p-2" key={art.id}>
//                 <div className="p-4 border-1 surface-border surface-card border-round">
//                     <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                         <div className="flex align-items-center gap-2">
//                             <i className="pi pi-tag"></i>
//                             <span className="font-semibold">{art.category}</span>
//                         </div>
//                     </div>
//                     <div className="flex flex-column align-items-center gap-3 py-5">
//                         <div>
//                         <img
//                             src={`/images/${art.title}.jpg`}
//                             alt={art.title}
//                             className="w-full border-round"
//                             style={{  width:"20%", height: "20%" }}
//                         />
//                         </div>
//                         <Rating value={meanRating} />
                        
//                         <div className="text-2xl font-bold text-900">{art.title}</div>
//                     </div>
//                     <div className="flex align-items-center justify-content-between">
//                         <span className="text-2xl font-semibold">${art.price}</span>
//                         <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={art.inventoryStatus === 'OUTOFSTOCK'} />
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (art) => {
//         return gridItem(art);
//     };

   
//         const header = () => {
//             const sortOptionsList = [
//                 { label: 'Newest to Oldest', value: 'new to old' },
//                 { label: 'Oldest to Newest', value: 'old to new' },
//                 { label: 'A to Z', value: 'a to z' },
//                 { label: 'Z to A', value: 'z to a' },
//                 { label: 'Most Rating to Least Rating', value: 'mostRating' },
//                 { label: 'Least Rating to Most Rating', value: 'leastRating' },
//             ];
//         return (
//             <div className="flex justify-content-between align-items-center mb-3">
//                 {/*    */}
//                 <IconField iconPosition="left">
//                     <InputIcon className="pi pi-search" />
//                     <InputText
//                         placeholder="search"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </IconField>
//                 <Dropdown
//                 value={sortOptions}
//                 options={sortOptionsList}
//                 onChange={(e) => setSortOptions(e.value)}
//                 placeholder="Sort by"/>

//                 {/* אפשרויות תצוגה */}
 

//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataView value={sortedArts} itemTemplate={itemTemplate}  header={header()} />
//         </div>
//     );
// }
import React, { useState } from "react";
import "../components/Arts.css"; // Import your CSS file for styling
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useGetArtsQuery } from "../redux/artApi";


export default function DigitalArts() {
  // Fetch all arts data
  
  const { data: arts = [], refetch } = useGetArtsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOptions, setSortOptions] = useState(null);

  // Filter and sort the artworks
  const filteredArts = arts
    .filter((art) => art.category === "Digital Art") // Only include Digital Art
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
            src={`/images/${art.title}.jpg`}
            alt={art.title}
            className="art-image"
          />
        </div>
        <Rating value={art.mean} readOnly cancel={false}/>
        <div className="art-title">{art.title}</div>
        <div className="art-footer">
          <span className="art-price">${art.price}</span>
          <Button
            icon="pi pi-shopping-cart"
            className="p-button-rounded"
            disabled={art.inventoryStatus === "OUTOFSTOCK"}
          />
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
    <div className="arts-container">
      <DataView value={sortedArts} itemTemplate={gridItem} header={header()} />
    </div>
  );
}