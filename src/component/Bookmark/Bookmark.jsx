import React from "react";
import { useBookmark } from "../context/BookmarkListContext";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import Loader from "../Loader/Loader";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark, DeleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await DeleteBookmark(id);
  };
  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmark location</p>;

  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
