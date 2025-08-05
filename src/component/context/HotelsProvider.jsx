import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "https://bookinghotel-2-h9t8.onrender.com/persian-hotels";
function HotelsProvider({ children }) {
  const [searchParams, setSearchParamshost] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrLocation, setIsLoadingCurrLocation] = useState(false);
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: Hotels, isLoading } = useFetch(
    `${BASE_URL}`,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    try {
      setIsLoadingCurrLocation(true);
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrLocation(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrLocation(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        Hotels,
        isLoading,
        getHotel,
        isLoadingCurrLocation,
        currentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
