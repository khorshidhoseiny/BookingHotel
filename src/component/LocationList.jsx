import React from "react";

import useFetch from "../hooks/useFetch";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toPersianNumbersWithComma } from "../utils/toPersianNumbers";
import { FaStar } from "react-icons/fa6";
import Header from "./Header";

function LocationList() {
  const { data, isLoading } = useFetch(
    "http://localhost:5000/persian-hotels",
    ""
  );

  if (isLoading) <p>Loading... </p>;

  return (
    <>
      <Header />
      <div className="nearbyLocation">
        <h2>هتل های پرطرفدار</h2>
        <div className="locationList">
          {data.map((item) => {
            return (
              <Link
                to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              >
                <div className="locationItem" key={item.id}>
                  <img src={item.thumbnail_url} />
                  <div className="locationItemDesc">
                    <p className="name">{item.name}</p>
                    <p className="location">{item.smart_location}</p>
                    <div className="locationItemDesc__body">
                      <p className="price">
                        <span>ریال</span>
                        &nbsp;{toPersianNumbersWithComma(item.price)}&nbsp;
                      </p>
                      <div>
                        {Array(item.stars)
                          .fill(0)
                          .map((_, index) => (
                            <FaStar key={index} className="starIcon" />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LocationList;
