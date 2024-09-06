import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Watchlist from "./pages/Watchlist";
import Top15 from "./pages/Top15";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ErrorElement from "./pages/ErrorElement";
import CoinByIdData from "./pages/CoinByIdData";
import { createContext } from "react";
import { Provider } from "react-redux";
import { cryptoStore } from "./store/cryptoStore";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";

export const Name = createContext();

const Applayout = () => {
  return (
    <Provider store={cryptoStore}>
      <div>
        <Name.Provider value={"Skc"}>
          <Navbar />
          <Outlet />
          <Footer />
        </Name.Provider>
      </div>
    </Provider>
  );
};

const browserRouter = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/top15", element: <Top15 /> },
      { path: "/watchlist", element: <Watchlist /> },
      { path: "/trending", element: <Trending /> },
      { path: "/coin/:id", element: <CoinByIdData /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },

    ],
    errorElement: <ErrorElement />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={browserRouter} />);
