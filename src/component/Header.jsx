import React, { useRef } from "react";
import { MdLocationOn, MdLogout } from "react-icons/md";
import {
  HiCalendar,
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

  return (
    <div className="header">
      <NavLink to="/bookmarks">Bookmark</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            id="destination"
            name="destination"
            placeholder="where to go ?"
            className="headerSearchInput"
          />
          <span className="seperator" />
        </div>
        <div className="headerSearchItem" style={{ cursor: "pointer" }}>
          <HiCalendar className="headerIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "yyyy/mm/dd")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              className="date"
            />
          )}
          <span className="seperator" />
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {options.adult} adult . {options.children} children . {options.room}{" "}
            room
          </div>
          {isOpen && (
            <GuestOptionList
              setIsOpen={setIsOpen}
              options={options}
              handleOptions={handleOptions}
            />
          )}
          <span className="seperator" />
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={() => handleSearch()}>
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
  useOutSideClick(optionsRef, "optionDropDown", () => setIsOpen(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLmit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLmit={7}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLmit={6}
      />
    </div>
  );
}

function OptionItem({ options, type, minLmit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
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
  const { user, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <strong>{user.name}</strong>
          <button>
            &nbsp; <MdLogout onClick={handleLogout} className="logout icon" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  );
}
