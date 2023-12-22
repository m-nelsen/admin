import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Admin from "./routes/admin";

const baseRoute = import.meta.env.VITE_BASE_ROUTE;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseRoute}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
