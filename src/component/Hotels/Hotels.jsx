import React from "react";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Map from "../Map/Map";
import Header from "../Header";
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers";
import { HiHeart } from "react-icons/hi";
import {
  FaCheck,
  FaHeart,
  FaP,
  FaRegHeart,
  FaUtensils,
  FaWifi,
} from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Hotels() {
  const { Hotels, isLoading, currentHotel } = useHotels();
  const navigate = useNavigate();
  if (isLoading) <Loader />;
  return (
    <>
      <Header />
      <div className="appLayout">
        <Map markerLocation={Hotels} />
        <div className="sidebar">
          <div className="searchList">
            <h2>
              نتیجه ی جستجو (<span>{Hotels.length} هتل یافت شد</span>)
            </h2>
            {Hotels.map((item) => {
              return (
                <div
                  className="searchItem--container"
                  key={item.id}
                  onClick={() =>
                    navigate(
                      `/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`
                    )
                  }
                >
                  <div
                    className={`searchItem ${
                      item.id === currentHotel?.id ? "current-hotel" : ""
                    } `}
                  >
                    <img src={item.thumbnail_url} />

                    <div className="searchItemDesc">
                      <div className="searchItemDesc__header">
                        <p className="name">{item.name}</p>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/bookmarks/add?lat=${item.latitude}&lng=${item.longitude}`,
                              {
                                state: item,
                              }
                            );
                          }}
                        >
                          <FaRegHeart className="icon" />
                        </div>
                      </div>
                      <p className="location">{item.smart_location}</p>
                      <div className="searchItemDesc__footer">
                        <div className="Hotel__amenities">
                          <div className="amenities_item">
                            <FaWifi /> وای فای
                          </div>
                          <div className="amenities_item">
                            <FaUtensils /> رستوران
                          </div>
                          <div className="amenities_item">
                            <FaCheck /> آسانسور
                          </div>
                          <div className="amenities_item">
                            <FaP />
                            پارکینگ
                          </div>
                        </div>
                        <div className="price">
                          <span> شروع قیمت از</span>
                          <h2>
                            &nbsp;{toPersianNumbersWithComma(item.price)}&nbsp;﷼
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotels;
