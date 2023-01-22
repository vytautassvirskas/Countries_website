import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import MainContext from "../context/MainContext.js";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import Card from "../components/Card/Card.jsx";
import style from "./Home.module.scss";

const Home = () => {
  const {
    data,
    setData,
    sortType,
    setSortType,
    filterRegion,
    setFilterRegion,
  } = useContext(MainContext);
  const search = useLocation().search;

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

  useEffect(() => {
    setData(data.filter((country) => country.region === filterRegion));
  }, [filterRegion]);

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
