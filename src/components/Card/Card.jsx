import React from "react";
import style from "./Card.module.scss";

const Card = ({ country, index, currentPage }) => {
  return (
    <li className={style.card}>
      <p className={style.wrapper}>
        <span className={style.information}>
          {currentPage === 1
            ? index + 1
            : index < 9
            ? currentPage - 1 + `${index + 1}`
            : currentPage + "0"}{" "}
        </span>
      </p>
      <p className={style.wrapper}>
        <span className={style.information}>{country.name}</span>
      </p>
      <p className={style.wrapper}>
        <span className={style.information}>{country.area || "no data"}</span>
      </p>
      <p className={style.wrapper}>
        <span className={style.information}>{country.region}</span>
      </p>
    </li>
  );
};

export default Card;
