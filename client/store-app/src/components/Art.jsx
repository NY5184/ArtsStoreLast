//bs"d
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Image } from 'primereact/image';
import { Rating } from "primereact/rating";
import { useSelector } from 'react-redux';
import { useUpdateArtMutation, useUpdateRateMutation } from '../redux/artApi';
import AddToCart from "./addToCart";
import './styles.css'; // Ensure your styles are imported

const Art = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const [value, setValue] = useState(0);
  const {art,order} = location.state || {};
  const [updateArtRating] = useUpdateRateMutation();

  useEffect(() => {
    const userRate = art.ratingArray.find((rate) => rate.userId === user._id);
    if (userRate) {
      setValue(userRate.rate);
    }
  }, [art, user]);

  const updateRate = async (e) => {
    try {
      debugger
      const rate = { _id: art._id, rate: e.value };
      await updateArtRating(rate);
    } catch (error) {
      console.error('Error updating rate:', error.message);
    }
  };

  const handleRatingChange = (e) => {
    setValue(e.value);
    updateRate(e);
  };

  return (
    <div className="art-details-container">
      <div className="image-container2">
        <img src={`http://localhost:7020/${art.imagePath}`} alt={art.title} className="art-image2" />
      </div>
      <div className="details-container">
        <h2 className="art-title">{art.title}</h2>
        <div className="rating-container">
          <Rating value={art.mean} readOnly />
        </div>
        {user && (
          <div className="user-rating-container">
            <Rating
              value={value}
              onChange={handleRatingChange}
              cancel={false}
              className="user-rating"
            />
          </div>
        )}
        <div className="art-description">{art.description}</div>
        <div className="art-artist">Artist: {art.artist}</div>
        <div className="art-price">Price: ${art.price}</div>
        {user && <AddToCart art={art}user={user}order={order}/>}
      </div>
    </div>
  );
};

export default Art;
