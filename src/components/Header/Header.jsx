import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MainContext from "../../context/MainContext.js";
import style from "./Header.module.scss";

const Header = () => {
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
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const handleSort = (e) => {
    const value = e.target.value;
    setSortType(value);
    searchParams.set("sort", value);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleFilterSize = (e) => {
    const value = e.target.value;
    setFilterSize(value);
    searchParams.set("size", value);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleFilterRegion = (e) => {
    const value = e.target.value;
    setFilterRegion(value);
    searchParams.set("filter", value);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        world countries
      </Link>
      <select className={style.sorter} onChange={(e) => handleSort(e)}>
        <option value=""> sortable by</option>
        <option value="A-Z">ascending</option>
        <option value="Z-A">descending</option>
      </select>
      <select className={style.region} onChange={(e) => handleFilterSize(e)}>
        <option value=""> fitered smaller than:</option>
        <option value="Lithuania">Lithuania</option>
      </select>
      <select className={style.region} onChange={(e) => handleFilterRegion(e)}>
        <option value=""> fitered by region</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
      </select>
    </header>
  );
};

export default Header;
