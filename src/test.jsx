import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./component/AppLayout.jsx";
import HeaderTest from "./component/HeaderTest.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AppLayout>
        <HeaderTest />
      </AppLayout>
    </React.StrictMode>
  </BrowserRouter>
);
