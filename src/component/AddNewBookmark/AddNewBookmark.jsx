import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useBookmark } from "../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";

function AddNewBookmark() {
  const { state } = useLocation();
  console.log(state, "state");

  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const { createBookmark } = useBookmark();
  const BASE_GEOLOCATION_URL = "https://nominatim.openstreetmap.org/reverse";
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [GeoCodingError, setGeoCodingError] = useState(null);
  console.log(lng, lat);
  let IsBookingHotel = !!state;

  useEffect(() => {
    if (!lat || !lng) return;
    if (IsBookingHotel) {
      setCityName(state.name);
      setCountryCode(state.Country_code);
      setCountryName(state.country);
      return;
    }
    async function fetchLocationData() {
      try {
        setIsLoadingGeoLocation(true);
        const { data } = await axios.get(
          `${BASE_GEOLOCATION_URL}?lat=${lat}&lon=${lng}`
        );
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "this location is not a city ! please click somewhere else"
          );

        setCityName(data.city || data.locality);
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !countryName) return;
    const newBookmark = {
      cityName,
      country: countryName,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + countryName,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  }

  return (
    <div>
      <h2>اضافه کردن منتخب جدید !</h2>
      <form action="" onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="cityName">اسم شهر،هتل</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">اسم کشور</label>
          <input
            value={countryName}
            type="text"
            name="countryName"
            id="countryName"
            onChange={(e) => setCountryName(e.target.value)}
          />
          <ReactCountryFlag svg className="flag" countryCode={countryCode} />
        </div>

        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; بازگشت
          </button>
          <button className="btn btn--primary"> افزودن</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
