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
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterSize, setFilterSize] = useState("");

  const contextValues = {
    data,
    setData,
    sortType,
    setSortType,
    filterRegion,
    setFilterRegion,
    filterSize,
    setFilterSize,
  };

  //fetching data
  useEffect(() => {
    console.log("siunciasi data");
    const fetchData = async () => {
      try {
        const url = "https://restcountries.com/v2/all?fields=name,region,area";
        const resp = await fetch(url);
        const countriesData = await resp.json();
        setData(countriesData);
        console.log("countriesData: ", countriesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [regionsArr, setRegionsArr] = useState([]);

  //regions array from data reikia perkelti i APP useefecta, kad ten is karto parsiuntus data, kad sukurtu array
  // useEffect(() => {
  //   console.log("header component useEffect veikia");
  // }, [data]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
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
