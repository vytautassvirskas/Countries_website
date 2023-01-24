import React from "react";
import style from "./Loader.module.scss";

const Loader = ({ message }) => {
  return (
    <div className={style["loader-wrapper"]}>
      <div className={style.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={style.message}>{message}</p>
    </div>
  );
};

export default Loader;
