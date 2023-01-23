import React from "react";
import style from "./Footer.module.scss";
import globe from "../../assets/images/earth-globe.svg";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <a href="https://restcountries.com" target="_blank">
        <div className={style["logo-wrapper"]}>
          <img className={style.logo} src={globe} alt="globe" />
        </div>
      </a>
    </footer>
  );
};

export default Footer;
