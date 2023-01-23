import React from "react";
import style from "./Card.module.scss";

const Card = ({ country, index, currentPage }) => {
  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <p className={style.information}>
          {currentPage === 1
            ? index + 1
            : index < 9
            ? currentPage - 1 + `${index + 1}`
            : currentPage + "0"}{" "}
        </p>
      </div>
      <div className={style.wrapper}>
        <p className={style.information}>{country.name}</p>
      </div>
      <div className={style.wrapper}>
        <p className={style.information}>{country.area || "no data"}</p>
      </div>
      <div className={style.wrapper}>
        <p className={style.information}>{country.region}</p>
      </div>
    </div>
  );
};

export default Card;
