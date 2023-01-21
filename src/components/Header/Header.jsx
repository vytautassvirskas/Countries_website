import React from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./Header.module.scss";

const Header = () => {
  const handleSort = (e) => {};
  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        world countries
      </Link>
      <select className={style.sorter} onChange={(e) => handleSort(e)}>
        <option value=""> sortable by</option>
        <option value="1">ascending</option>
        <option value="2">descending</option>
      </select>
    </header>
  );
};

export default Header;
