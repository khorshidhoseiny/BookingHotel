import React from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { Hotels, isLoading, currentHotel } = useHotels();
  if (isLoading) <Loader />;
  return (
    <div className="searchList">
      <h2>
        نتیجه ی جستجو (<span>{Hotels.length} هتل یافت شد</span>)
      </h2>
      {Hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel?.id ? "current-hotel" : ""
              } `}
            >
              <img src={item.thumbnail_url} />

              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
