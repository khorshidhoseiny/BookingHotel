import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useBookmark } from "../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";

function AddNewBookmark() {
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

  useEffect(() => {
    if (!lat || !lng) return;
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
      <h2>Add New Bookmark</h2>
      <form action="" onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="cityName">cityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">countryName</label>
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
            &larr; Back
          </button>
          <button className="btn btn--primary"> Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
