import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./component/AppLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AppLayout>
        <App />
      </AppLayout>
    </React.StrictMode>
  </BrowserRouter>
);
