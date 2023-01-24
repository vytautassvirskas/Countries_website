import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import MainContext from "../context/MainContext.js";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import TableHead from "../components/TableHead/TableHead.jsx";
import Card from "../components/Card/Card.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import style from "./Home.module.scss";

const Home = () => {
  const {
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
  } = useContext(MainContext);

  const [countriesPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    let dataCopy = [...data];
    if (filterSize) {
      // const area = dataCopy.find((country) => country.name === filterSize).area;
      const area = dataCopy.find(
        (country) => country.name === "Lithuania"
      ).area;
      dataCopy = dataCopy.filter((country) => country.area < area);
    }

    if (filterRegion) {
      dataCopy = dataCopy.filter(
        (country) => country.region === "filterRegion"
      );
    }

    // apply sort criteria
    if (sortType === "Z-A") {
      dataCopy.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "A-Z") {
      dataCopy.sort((a, b) => a.name.localeCompare(b.name));
    }

    // console.log("dataCopy:", dataCopy);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    setTotalPages(Math.ceil(dataCopy.length / countriesPerPage));
    setPaginatedData(dataCopy.slice(indexOfFirstCountry, indexOfLastCountry));
  }, [currentPage, filterSize, sortType, filterRegion, data]);

  //data tikrina po pasikeitimo
  useEffect(() => {
    console.log("paginatedData pasikeite:", paginatedData);
  }, [paginatedData]);

  //total page change
  // useEffect(() => {
  //   console.log("totalPages pasikeite home komponente", totalPages);
  // }, [totalPages]);

  console.log("HOme componentas renderinasi");
  return (
    <Wrapper heading={"Countries list"}>
      <TableHead></TableHead>
      <ol>
        {paginatedData.map((country, i) => (
          <Card
            key={i}
            country={country}
            index={i}
            currentPage={currentPage}
          ></Card>
        ))}
      </ol>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        countriesPerPage={countriesPerPage}
      ></Pagination>
    </Wrapper>
  );
};

export default Home;
