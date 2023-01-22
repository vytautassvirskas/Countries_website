import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import MainContext from "../context/MainContext.js";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import Card from "../components/Card/Card.jsx";
import style from "./Home.module.scss";

const Home = () => {
  const {
    dataApi,
    setDataApi,
    sortType,
    setSortType,
    filterRegion,
    setFilterRegion,
    filterSize,
    setFilterSize,
  } = useContext(MainContext);
  const [data, setData] = useState([]);
  const search = useLocation().search;
  useEffect(() => {
    setData(dataApi);
  }, [dataApi]);

  //   check is it sorted
  useEffect(() => {
    //sorted by Z-A
    if (sortType === "Z-A") {
      const sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
      // console.log(sortedData);
      setData(sortedData);
      return;
    }

    //sorted by A-Z
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setData(sortedData);
  }, [sortType]);

  //filter by region
  useEffect(() => {
    setData(dataApi.filter((country) => country.region === filterRegion));
  }, [filterRegion]);

  //filter by size
  useEffect(() => {
    if (filterSize) {
      console.log(
        "lithuania size: ",
        dataApi.find((country) => country.name === filterSize).area
      );
      const area = dataApi.find((country) => country.name === filterSize).area;
      console.log("area", area);
      setData(dataApi.filter((country) => country.area < area));
    }
  }, [filterSize]);

  //data tikrina po pasikeitimo
  useEffect(() => {
    console.log("data pasikeite:", data);
  }, [data]);

  console.log("HOme componentas renderinasi");
  return (
    <Wrapper heading={"All countries MAIN langas"}>
      {data.map((country, i) => (
        <Card key={i} country={country} index={i}></Card>
      ))}
    </Wrapper>
  );
};

export default Home;
