import React from 'react';
import style from "./TableHead.module.scss"

const TableHead = () => {
  return (
    <div className={style.head}>
    <div className={style.wrapper}>
      <p className={style.title}>No.</p>
    </div>
    <div className={style.wrapper}>
      <p className={style.title}> Name</p>
    </div>
    <div className={style.wrapper}>
      <p className={style.title}>
        Area, m<sup>2</sup>
      </p>
    </div>
    <div className={style.wrapper}>
      <p className={style.title}>Region</p>
    </div>
  </div>
  )
}

export default TableHead