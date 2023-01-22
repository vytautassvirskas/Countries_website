import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import Card from "../components/Card/Card.jsx";
import style from "./Home.module.scss";

const Home = () => {
  const [data, setData] = useState([]);
  const search = useLocation().search;

  const sortType = new URLSearchParams(search).get("sort");
  const filterType = new URLSearchParams(search).get("filter");

  // console.log(
  //   "visas URLsearchParams objekas",
  //   new URLSearchParams(search).get("filter")
  // );
  
  //fetching data
  useEffect(() => {
    console.log("siunciasi data");
    const fetchData = async () => {
      try {
        const url = "https://restcountries.com/v2/all?fields=name,region,area";
        const resp = await fetch(url);
        const countriesData = await resp.json();
        setData(countriesData);
        console.log(countriesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  //data tikrina po pasikeitimo
  useEffect(() => {
    console.log("data pasikeite");
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
