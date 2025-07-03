import React from "react";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "../../utils/toPersianNumbers";
import { getPersianYear } from "../../utils/toLocalDateShort";
import { FaCheck, FaP, FaStar, FaUtensils, FaWifi } from "react-icons/fa6";
import Map from "../Map/Map";
function HotelDetail({ currentHotel }) {
  return (
    <>
      <div className="gallery">
        <div className="gallery__main">
          <img src={currentHotel.thumbnail_url} alt={currentHotel.name} />
        </div>
        <div className="gallery__side">
          {currentHotel.imageList.slice(0, 4).map((img, i) => (
            <div key={i} className="gallery__thumb">
              <img src={img} alt={`hotel-image-${i}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="room__Detail--container">
        <div className="roomDetailItem">
          <div>
            <h1>{currentHotel.name}</h1>
            <div className="hotel_typeInfo">
              <span className="hotel-badge">{currentHotel.property_type}</span>
              <span>
                {Array(currentHotel.stars)
                  .fill(0)
                  .map((_, index) => (
                    <FaStar key={index} className="starIcon" />
                  ))}
              </span>
            </div>
            <div className="hotel-rating">
              <span className="rating-number">
                {" "}
                ۱۰ / {toPersianNumbers(currentHotel.rating)}
              </span>
              <span>خیلی خوب</span>
            </div>
            <div>
              <h2>امکانات هتل</h2>
              <div className="Hotel__amenities">
                <div className="amenities_item">
                  <FaWifi /> وای فای
                </div>
                <div className="amenities_item">
                  <FaUtensils /> رستوران
                </div>
                <div className="amenities_item">
                  <FaCheck /> لاندری
                </div>
                <div className="amenities_item">
                  <FaCheck /> آسانسور
                </div>
                <div className="amenities_item">
                  <FaP />
                  پارکینگ
                </div>
              </div>
            </div>
          </div>
          {/* Location ⬇︎ */}
          <div>
            <h2>موقعیت هتل در نقشه</h2>
            <div className="room__locationItem">
              <div className="room__location--map">
                <Map markerLocation={currentHotel} />
              </div>
              <div className="room__location--name">
                {currentHotel.host_location}
              </div>
            </div>
          </div>
        </div>
        <div className="roomDetailItem hotel-price">
          <h2>قیمت رزرو برای یک شب </h2>
          <p className="price">
            &nbsp;{toPersianNumbersWithComma(currentHotel.price)}&nbsp;
            <span>ریال</span>
          </p>
        </div>
        <div className="roomDetailItem hote-info ">
          <h2> درباره هتل</h2>
          <h3>مشخصات عمومی هتل</h3>
          <div className="info-items">
            <div className="info-item">
              <span>سال تأسیس:</span>
              <span>{getPersianYear(currentHotel.host_since)}</span>
            </div>

            <div className="info-item">
              <span>وضعیت دید:</span>
              <span>{currentHotel.neighborhood_overview}</span>
            </div>

            <div className="info-item">
              <span>تعداد اتاق‌ها:</span>
              <span>{currentHotel.accommodates} اتاق</span>
            </div>

            <div className="info-item">
              <span>تعداد تخت‌ها:</span>
              <span>{currentHotel.beds} تخت</span>
            </div>

            <div className="info-item">
              <span>موقعیت هتل:</span>
              <span>{currentHotel.smart_location}</span>
            </div>
          </div>
          <div className="hotel--about">
            <h3>توضیحات درباره ی {currentHotel.name}</h3>
            <p>{currentHotel.description}</p>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default HotelDetail;
