import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";
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

  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const optionsSort = [
    { value: "A-Z", label: "Ascending" },
    { value: "Z-A", label: "Descending" },
  ];

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

  const handleClearUrl = () => {};

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
  // bandymas
  // const handleUrlParams2 = (value, setState, param) => {
  //   setState(value);
  //   searchParams.set(param, value);
  //   const newUrl = `${location.pathname}?${searchParams.toString()}`;
  //   window.history.pushState({}, "", newUrl);
  // };

  const handleSort = (e) => {
    handleUrlParams(e, setSortType, "sort");
  };

  // bandymas
  // const handleSort2 = (selectedOption) => {
  //   // handleUrlParams(e, setSortType, "sort");
  //   console.log("sort select: ", selectedOption.value);
  //   handleUrlParams2(selectedOption.value, setSortType, "sort");
  // };

  const handleFilterSize = (e) => {
    // console.log("e:", e);
    handleResetPage();
    handleUrlParams(e, setFilterSize, "filterSize");
  };

  const handleFilterRegion = (e) => {
    handleResetPage();
    handleUrlParams(e, setFilterRegion, "filterRegion");
  };

  //check sortType, filter
  // useEffect(() => {
  //   console.log("sortType header dalyje: ", sortType);
  //   console.log("sortType header dalyje typeof: ", typeof sortType);
  // }, [sortType]);
  return (
    <header className={style.header}>
      <Link to="/" className={style.logo} onClick={handleReset}>
        world countries
      </Link>
      {/* <Select
        // defaultValue={sortType}
        onChange={handleSort2}
        options={optionsSort}
        // value={sortType}
        // placeholder="sortable by"
      ></Select> */}
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
        value={filterRegion}
        onChange={(e) => handleFilterRegion(e)}
      >
        <option value=""> fitered by region</option>
        {regionsArr.length > 0 &&
          regionsArr.map((region, i) => (
            <option key={i} value={region}>
              {region}
            </option>
          ))}
      </select>
      {/*  */}
      {/* <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={filterSize} />}
          label="smaller than Lithuania"
        />
      </FormGroup> */}
      {/*  */}
      {/* <div
        className={style["checkbox-wrapper"]}
        onChange={(e) => handleFilterSize(e)}
      >
        <input className={style.input} type="checkbox" id="country" />
        <label className={style.label} htmlFor="country">
          show smaller countries than Lithuania
        </label>
      </div> */}
      {/*  */}
      {/* <div className={style["checkbox-wrapper"]}>
        <input
          className={style.input}
          type="checkbox"
          checked={filterSize}
          onChange={() => setFilterSize(!filterSize)}
        />
        <label>smaller than Lithuania</label>
      </div> */}
      {/*  */}
      <select
        className={style.region}
        value={filterSize}
        onChange={(e) => handleFilterSize(e)}
      >
        <option value=""> fitered smaller than:</option>
        <option value="Lithuania">Lithuania</option>
      </select>
      <button className={style["clear-btn"]} onClick={handleReset}>
        <Link className="">clear</Link>
        
      </button>
    </header>
  );
};

export default Header;
