import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./Pagination.module.scss";
import toPrev from "../../assets/images/angle-left.svg";
import toNext from "../../assets/images/angle-right.svg";

const Pagination = (props) => {
  const { totalPages, currentPage, setCurrentPage, countriesPerPage } = props;
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const handleUrlParams = (pgNumber, param) => {
    searchParams.set(param, pgNumber);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        handleUrlParams(prevPage - 1, "p");
        return prevPage - 1;
      });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        handleUrlParams(prevPage + 1, "p");
        return prevPage + 1;
      });
    }
  };

  const handleCurrentPage = (pgNumber) => {
    setCurrentPage(pgNumber);
    handleUrlParams(pgNumber, "p");
  };

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / countriesPerPage) * countriesPerPage;
    let startLastPage =
      Math.floor((totalPages - 1) / countriesPerPage) * countriesPerPage;

    if (totalPages <= countriesPerPage) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }
    if (start >= startLastPage && start + countriesPerPage > totalPages) {
      return new Array(totalPages - start)
        .fill()
        .map((number, index) => start + index + 1);
    }
    return new Array(countriesPerPage)
      .fill()
      .map((number, index) => start + index + 1);
  };
  const pageNumbers = getPaginationGroup();
  
  if (pageNumbers.length <= 1) return null;
  return (
    <nav className={style.pagination}>
      <ul className={style.list}>
        <li className={style.item} onClick={prevPage}>
          <button className={style.link}>
            <img src={toPrev} alt="previous page" className={style.img} />
          </button>
        </li>

        {pageNumbers.map((pgNumber) => {
          return (
            <li
              key={pgNumber}
              className={
                pgNumber === currentPage ? style["item--active"] : style.item
              }
              onClick={() => handleCurrentPage(pgNumber)}
            >
              <button className={style.link}>{pgNumber}</button>
            </li>
          );
        })}

        <li className={style.item} onClick={nextPage}>
          <button className={style.link}>
            <img src={toNext} alt="next page" className={style.img} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
