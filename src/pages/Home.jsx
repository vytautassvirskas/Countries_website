import React, { useState, useEffect, useContext } from "react";
import MainContext from "../context/MainContext.js";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import TableHead from "../components/TableHead/TableHead.jsx";
import CardsWrapper from "../components/CardsWrapper/CardsWrapper.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
import style from "./Home.module.scss";

const Home = () => {
  const {
    data,
    sortType,
    filterRegion,
    filterSize,
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
      const area = dataCopy.find(
        (country) => country.name === "Lithuania"
      ).area;
      dataCopy = dataCopy.filter((country) => country.area < area);
    }

    if (filterRegion.value) {
      dataCopy = dataCopy.filter(
        (country) => country.region === filterRegion.value
      );
    }

    // apply sort criteria
    if (sortType.value === "Z-A") {
      dataCopy.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === "A-Z") {
      dataCopy.sort((a, b) => a.name.localeCompare(b.name));
    }

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    setTotalPages(Math.ceil(dataCopy.length / countriesPerPage));
    setPaginatedData(dataCopy.slice(indexOfFirstCountry, indexOfLastCountry));
  }, [currentPage, filterSize, sortType, filterRegion, data]);

  return (
    <Wrapper heading={"Countries list"}>
      <TableHead></TableHead>
      <CardsWrapper
        data={data}
        paginatedData={paginatedData}
        currentPage={currentPage}
      ></CardsWrapper>
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
