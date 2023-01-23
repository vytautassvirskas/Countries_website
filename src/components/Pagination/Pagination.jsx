import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./Pagination.module.scss";
import toPrev from "../../assets/images/angle-left.svg";
import toNext from "../../assets/images/angle-right.svg";

const Pagination = (props) => {
  const { totalPages, currentPage, setCurrentPage, countriesPerPage } = props;
  //rodo visus page is karto
  //   const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
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
      console.log("jau VEIKIA");
      return new Array(totalPages - start)
        .fill()
        .map((number, index) => start + index + 1);
    }
    return new Array(countriesPerPage)
      .fill()
      .map((number, index) => start + index + 1);
  };
  const pageNumbers = getPaginationGroup();
  // console.log("pageNumbers pagination componente", pageNumbers);

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
              onClick={() => setCurrentPage(pgNumber)}
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
