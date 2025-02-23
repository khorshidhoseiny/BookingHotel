import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrLocation, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrLocation || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.thumbnail_url} />
      </div>
    </div>
  );
}

export default SingleHotel;
