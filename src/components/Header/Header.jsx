import React, { useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";
import MainContext from "../../context/MainContext.js";
import style from "./Header.module.scss";
import "./HeaderGlobal.scss";

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

  //all regions from data
  const regionsData = () => {
    const regions = [];
    [...data].forEach((country) => {
      regions.push(country.region);
    });
    return new Set(regions);
  };
  const regionsArr = Array.from(regionsData());

  //sorting react-select options
  const optionsSort = useMemo(() => {
    return [
      { value: "A-Z", label: "Ascending" },
      { value: "Z-A", label: "Descending" },
    ];
  }, []);

  //filtering react-select options
  const optionsRegion = useMemo(() => {
    return regionsArr.map((region) => {
      return {
        value: region,
        label: region,
      };
    });
  }, [data]);

  //sorting value by url
  useEffect(() => {
    const queryValue = searchParams.get("sort");
    const selectedOption = optionsSort.find(
      (option) => option.value === queryValue
    );
    if (selectedOption) setSortType(selectedOption);
  }, [search, optionsSort]);

  //filtering value by url
  useEffect(() => {
    const queryValue = searchParams.get("filterRegion");
    const selectedOption = optionsRegion.find(
      (option) => option.value === queryValue
    );
    if (selectedOption) setFilterRegion(selectedOption);
  }, [search, optionsRegion]);

  //react-select style
  const colorStyles = {
    control: (styles, state) => ({
      ...styles,
      width: "150px",
      marginRight: "10px",
      borderRadius: "10px",
      fontSize: "14px",
      borderColor: state.isFocused ? "hsl(180, 14%, 20%)" : "white",
    }),
    option: (styles, state) => {
      return {
        ...styles,
        color: "hsl(180, 14%, 20%)",
        background: state.isFocused ? "hsl(180, 29%, 50%)" : "white",
      };
    },
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSortType("");
    setFilterSize(false);
    setFilterRegion("");
  };

  const handleResetPage = () => {
    setCurrentPage(1);
    searchParams.set("p", 1);
  };

  const handleUrlParams = (e, setState, param) => {
    const value = param === "filterSize" ? e.target.checked : e;
    setState(value);
    searchParams.set(param, value);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSort = (selectedOption) => {
    if (sortType.value === selectedOption.value) return;
    //to function argument you can pass only "selectedOptions"
    handleUrlParams(selectedOption.value, setSortType, "sort");
  };
  const handleFilterSize = (e) => {
    handleResetPage();
    handleUrlParams(e, setFilterSize, "filterSize");
  };

  const handleFilterRegion = (selectedOption) => {
    if (filterRegion.value === selectedOption.value) return;
    handleResetPage();
    handleUrlParams(selectedOption.value, setFilterRegion, "filterRegion");
  };

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo} onClick={handleReset}>
        world countries
      </Link>
      <FormGroup>
        <StyledEngineProvider injectFirst>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterSize}
                size="small"
                onChange={handleFilterSize}
              />
            }
            label="smaller than Lithuania"
          />
        </StyledEngineProvider>
      </FormGroup>
      <Select
        onChange={handleSort}
        options={optionsSort}
        value={sortType}
        placeholder="sortable by"
        styles={colorStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      ></Select>
      <Select
        onChange={handleFilterRegion}
        options={optionsRegion}
        value={filterRegion}
        placeholder="region"
        styles={colorStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      ></Select>
      <button className={style["clear-btn"]} onClick={handleReset}>
        <Link className="">clear</Link>
      </button>
    </header>
  );
};

export default Header;
