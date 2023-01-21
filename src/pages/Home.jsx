import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import Card from "../components/Card/Card.jsx";
import style from "./Home.module.scss";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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

  return (
    <Wrapper heading={"All countries MAIN langas"}>
      {data.map((country, i) => (
        <Card key={i} country={country} index={i}></Card>
      ))}
    </Wrapper>
  );
};

export default Home;
