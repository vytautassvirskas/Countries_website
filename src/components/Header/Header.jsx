import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MainContext from "../../context/MainContext.js";
import style from "./Header.module.scss";

const Header = () => {
  const {
    data,
    sortType,
    setSortType,
    filterRegion,
    setFilterRegion,
    filterSize,
    setFilterSize,
    setCurrentPage,
  } = useContext(MainContext);
  // const [regionsArr, setRegionsArr] = useState([]);
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const regionsData = () => {
    const regions = [];
    [...data].forEach((country) => {
      regions.push(country.region);
    });
    return new Set(regions);
  };

  const regionsArr = Array.from(regionsData());

  console.log("regionsArr: ", regionsArr);
  console.log("regionsArr typeof: ", typeof regionsArr);

  const handleReset = () => {
    setCurrentPage(1);
    setSortType("");
    setFilterSize("");
    setFilterRegion("");
  };

  const handleResetPage = () => {
    setCurrentPage(1);
    searchParams.set("p", 1);
  };

  const handleUrlParams = (e, setState, param) => {
    const value = e.target.value;
    setState(value);
    searchParams.set(param, value);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSort = (e) => {
    handleUrlParams(e, setSortType, "sort");
  };

  const handleFilterSize = (e) => {
    handleResetPage();
    handleUrlParams(e, setFilterSize, "filterSize");
  };

  const handleFilterRegion = (e) => {
    handleResetPage();
    handleUrlParams(e, setFilterRegion, "filterRegion");
  };

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo} onClick={handleReset}>
        world countries
      </Link>
      <select
        className={style.sorter}
        value={sortType}
        onChange={(e) => handleSort(e)}
      >
        <option value=""> sortable by</option>
        <option value="A-Z">ascending</option>
        <option value="Z-A">descending</option>
      </select>
      <select
        className={style.region}
        value={filterSize}
        onChange={(e) => handleFilterSize(e)}
      >
        <option value=""> fitered smaller than:</option>
        <option value="Lithuania">Lithuania</option>
      </select>
      <select
        className={style.region}
        value={filterRegion}
        onChange={(e) => handleFilterRegion(e)}
      >
        <option value=""> fitered by region</option>
        {regionsArr.length > 0 &&
          regionsArr.map((region, i) => {
            console.log("speju nemapina duomenu");
            return (
              <option key={i} value={region}>
                {region}
              </option>
            );
          })}
      </select>
    </header>
  );
};

export default Header;
