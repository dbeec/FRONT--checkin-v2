import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Admin from "./routes/admin/admin";
import WowDesarrollos from "./routes/admin/wowdesarrollos/view.wowdesarrollos";
import EtFundacion from "./routes/admin/etfundacion/view.etfundacion";
// import EtFundacion from './routes/admin/etfundacion/view.etfundacion'
// import { red,  } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Users from "./routes/admin/users/view.users";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222",
    },
    secondary: {
      main: "#2074d4",
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "wowdesarrollos",
        element: <WowDesarrollos />,
      },
      {
        path: "etfundacion",
        element: <EtFundacion />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
