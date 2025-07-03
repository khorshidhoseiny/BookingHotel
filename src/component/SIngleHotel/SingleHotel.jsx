import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import toLocalDateShort, { getPersianYear } from "../../utils/toLocalDateShort";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { FaCheck, FaP, FaStar, FaUtensils, FaWifi } from "react-icons/fa6";

import HotelDetail from "./HotelDetail";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrLocation, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrLocation || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <HotelDetail currentHotel={currentHotel} />
    </div>
  );
}

export default SingleHotel;
