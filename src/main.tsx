import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Admin from "./routes/admin";

const baseRoute = import.meta.env.VITE_BASE_ROUTE;

const router = createBrowserRouter([
  {
    path: `${baseRoute}/`,
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${baseRoute}/login`,
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
