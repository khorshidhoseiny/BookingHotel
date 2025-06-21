import React from "react";

import useFetch from "../hooks/useFetch";
import { Navigate, useNavigate } from "react-router-dom";
import { toPersianNumbersWithComma } from "../utils/toPersianNumbers";

function LocationList() {
  const { data, isLoading } = useFetch(
    "http://localhost:5000/persian-hotels",
    ""
  );

  if (isLoading) <p>Loading... </p>;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.thumbnail_url} />
              <div className="locationItemDesc">
                <p className="name">{item.name}</p>
                <p className="location">{item.smart_location}</p>
                <p className="price">
                  <span>ریال</span>
                  &nbsp;{toPersianNumbersWithComma(item.price)}&nbsp;
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
