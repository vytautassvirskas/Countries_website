import React from "react";
import style from "./Wrapper.module.scss";

const Wrapper = ({ heading, children }) => {
  return (
    <>
      <section className={style.section}>
        <h1 className={style.heading}>{heading}</h1>
        {children}
      </section>
    </>
  );
};

export default Wrapper;
