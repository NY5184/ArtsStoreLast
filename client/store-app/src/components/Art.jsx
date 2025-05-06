//bs"d
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Image } from 'primereact/image';
import { Rating } from "primereact/rating";
import axios from "axios";
import { useSelector ,useDispatch} from 'react-redux';
import {artApi, useUpdateArtMutation,useUpdateRateMutation} from '../redux/artApi';
import AddToCart from "./addToCart";

const Art = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user:",user)
  const token = useSelector((state) => state.user.token);
  const location = useLocation();
  const [value, setValue] = useState(0);
  const art = location.state || {};
  const [updateArt] = useUpdateArtMutation();
  const[updateArtRating]=useUpdateRateMutation()

  useEffect(() => {
    debugger
    console.log(user)
    const userRate = art.ratingArray.find((rate) => rate._id === user._id);
    if (userRate) {
      setValue(userRate.rate);
     console.log("Setting value to:",value); }
  }, []);


  
  const updateRate = async (e) => {
    try {
      debugger
      const rate={_id: art._id, rate: e.value}
      console.log(e.value)
      const resRates = await updateArtRating(rate)
      console.log(resRates.data); 
      // const updatedParameters = { ...art, ratingArray: resRates.data };
      // updateArt(updatedParameters);
      
      // dispatch(
      //   artApi.util.updateQueryData('getArtById',art._id, (draft) => {
          
      //     draft.title = updatedParameters.ratingArray;
       
      //   })
      // );

    } catch (error) {
      console.error('Error updating rate:', error.response ? error.response.data : error.message);
      // You can add more error handling logic here
    }
  };

  const handleRatingChange = (e) => {
    debugger
    setValue(e.value);
    updateRate(e); // Call updateRate immediately after the user changes the rating
  };

  return (
    <div>
      <img
           src={`http://localhost:7020/${art.imagePath}`} 
           
          />
      <Rating value={art.mean} readOnly />
      {user ? (
        <div><Rating
          value={value}
          onChange={handleRatingChange}
          cancel={false}
        />
        <AddToCart art={art}></AddToCart></div>
      ) : (
        <>
        {user}</>
        
      )}
      
    </div>
  );
};

export default Art;