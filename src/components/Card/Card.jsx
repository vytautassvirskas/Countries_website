import React from "react";
import style from "./Card.module.scss";

const Card = ({ country, index }) => {
  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <p className={style.title}>No.</p>
        <p className={style.information}>{index + 1}</p>
      </div>
      <div className={style.wrapper}>
        <p className={style.title}> Name:</p>
        <p className={style.information}>{country.name}</p>
      </div>
      <div className={style.wrapper}>
        <p className={style.title}>
          Area, sq.m<sup>2</sup>:
        </p>
        <p className={style.information}>{country.area}</p>
      </div>
      <div className={style.wrapper}>
        <p className={style.title}>Region:</p>
        <p className={style.information}>{country.region}</p>
      </div>
    </div>
  );
};

export default Card;
