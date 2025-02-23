import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../context/BookmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();

  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
