import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainContext from "./context/MainContext.js";
import style from "./App.module.scss";

import RootLayout from "./components/RootLayout/RootLayout.jsx";
import Home from "./pages/Home.jsx";

function App() {
  // console.log("App render pradzia");
  const [data, setData] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const [sortType, setSortType] = useState(searchParams.get("sort") || "");
  const [filterRegion, setFilterRegion] = useState(
    searchParams.get("filterRegion") || ""
  );
  const [filterSize, setFilterSize] = useState(
    JSON.parse(searchParams.get("filterSize")) || false
  );
  const [currentPage, setCurrentPage] = useState(+searchParams.get("p") || 1);
  const [isLoading, setIsLoading] = useState({
    state: false,
    message: "",
  });

  const contextValues = {
    data,
    setData,
    sortType,
    setSortType,
    filterRegion,
    setFilterRegion,
    filterSize,
    setFilterSize,
    currentPage,
    setCurrentPage,
  };

  //fetching data
  useEffect(() => {
    setIsLoading((currentIsLoading) => {
      return { ...currentIsLoading, state: true };
    });
    const fetchData = async () => {
      try {
        const url = "https://restcountries.com/v2/all?fields=name,region,area";
        const resp = await fetch(url);
        const countriesData = await resp.json();
        setTimeout(() => {
          setIsLoading({ state: false, message: "" });
          setData(countriesData);
        }, 500);
        // console.log("countriesData: ", countriesData);
      } catch (error) {
        console.log(error);
        setIsLoading((currentIsLoading) => {
          return {
            ...currentIsLoading,
            state: true,
            message: "Failed to fetch data. Try again",
          };
        });
      }
    };
    fetchData();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout isLoading={isLoading} />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    )
  );

  return (
    <>
      <MainContext.Provider value={contextValues}>
        <RouterProvider router={router}></RouterProvider>
      </MainContext.Provider>
    </>
  );
}

export default App;
