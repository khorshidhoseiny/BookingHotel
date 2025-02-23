import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map/Map";
import { useHotels } from "./context/HotelsProvider";

function AppLayout() {
  const { Hotels } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={Hotels} />
    </div>
  );
}

export default AppLayout;
