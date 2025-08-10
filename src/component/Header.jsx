import React, { useEffect, useRef } from "react";
import { MdLocationOn, MdLogout } from "react-icons/md";
import { FaBookmark, FaRegBookmark, FaUser } from "react-icons/fa6";
import { IoLogoUsd, IoMdLogIn } from "react-icons/io";
import { MdChildCare } from "react-icons/md";
import {
  IoBed,
  IoLogOut,
  IoLogOutOutline,
  IoLogOutSharp,
} from "react-icons/io5";
import {
  HiCalendar,
  HiLogin,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useOutSideClick from "../hooks/useOutSideClick";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import axios from "axios";
import { control } from "leaflet";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const encodedParams = createSearchParams({
    date: JSON.stringify(date),
    destination,
    options: JSON.stringify(options),
  });
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  const optionDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return (
    <div className="header">
      <NavLink to="/bookmarks" className="bookmarkLink">
        {({ isActive }) => (
          <span className="nevigateContent">
            {isActive ? (
              <FaBookmark className="headerIcon" />
            ) : (
              <FaRegBookmark className="headerIcon" />
            )}
            <span className="bookmarkLink_text">منتخب ها</span>
          </span>
        )}
      </NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <div className="headerSearchInput">
            <span className="headerSearchInput__header">
              <MdLocationOn className="headerIcon locationIcon" />
              نام شهر ، هتل یا منطقه
            </span>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              id="destination"
              name="destination"
              className="headerSearchInput__body"
            />
          </div>
        </div>

        <div className="filterSearchOptions">
          <div
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchItem dateOption"
            style={{ cursor: "pointer" }}
          >
            <div className="dateOption__header ">
              <HiCalendar className="headerIcon dateIcon" />
              <span>تاریخ رفت و برگشت</span>
            </div>
            <div className="dateDropDown ">
              <span className="dateText">
                {date[0].startDate.toLocaleDateString("fa-IR", optionDate)}
              </span>
              <span className="dateText " style={{ margin: "0 0.5rem" }}>
                تا
              </span>
              <span className="dateText">
                {date[0].endDate.toLocaleDateString("fa-IR", optionDate)}
              </span>
            </div>
            {openDate && (
              <DateRange
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                className="date"
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>

          <div className="headerSearchItem">
            <div
              id="optionDropDown"
              className="optDropDown"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="optDropDown__header">
                <FaUser className="headerIcon" />
                <span> مسافران و اتاق ها</span>
              </div>
              <div className="optionDropDown__body">
                <div className="optionDropDownItem">
                  <span>
                    {options.adult}
                    <span className="optionType-Name">بزرگسال</span>
                  </span>
                </div>
                <div className="optionDropDownItem">
                  <span>
                    {options.children}{" "}
                    <span className="optionType-Name">کودک</span>
                  </span>
                </div>
                <div className="optionDropDownItem">
                  <span>
                    {options.room} <span className="optionType-Name">اتاق</span>
                  </span>
                </div>
              </div>
            </div>
            {isOpen && (
              <GuestOptionList
                setIsOpen={setIsOpen}
                options={options}
                handleOptions={handleOptions}
              />
            )}
          </div>
        </div>

        <div className="headerSearchItem search ">
          <button className="headerSearchBtn" onClick={() => handleSearch()}>
            <h2>جستجو</h2>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, setIsOpen, handleOptions }) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, () => setIsOpen(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        persianTypeName="بزرگسال"
        type="adult"
        options={options}
        minLmit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        persianTypeName="کودک"
        type="children"
        options={options}
        minLmit={7}
      />
      <OptionItem
        handleOptions={handleOptions}
        persianTypeName="اتاق"
        type="room"
        options={options}
        minLmit={6}
      />
    </div>
  );
}

function OptionItem({
  options,
  type,
  persianTypeName,
  minLmit,
  handleOptions,
}) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{persianTypeName}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLmit}
        >
          <HiMinus className="icon" />
        </button>
        <button className="optionCounterNumber">{options[type]}</button>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAthenticated, logout } = useAuth();
  console.log(user, isAthenticated);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  if (!isAthenticated) {
    return (
      <NavLink to="/login" className="nevigateContent">
        <IoMdLogIn className="headerIcon" />
        <span>ورود</span>
      </NavLink>
    );
  }
  return (
    <div onClick={() => handleLogout()} className="profile">
      <HiLogout className="headerIcon" />
      <span>{user.name}</span>
    </div>
  );
}
