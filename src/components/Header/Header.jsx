import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MainContext from "../../context/MainContext.js";
import style from "./Header.module.scss";

const Header = () => {
  const {
    data,
    setData,
    sortType,
    setSortType,
    filterRegion,
    setFilterRegion,
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

  const handleFilter = (e) => {
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
      <div>
        <label htmlFor=""></label>
        <input type="text" />
      </div>
      <select className={style.region} onChange={(e) => handleFilter(e)}>
        <option value=""> sortable by</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
      </select>
    </header>
  );
};

export default Header;
