import React from "react";
import Card from "../../components/Card/Card.jsx";
import style from "./CardsWrapper.module.scss";

const CardsWrapper = (props) => {
  const { paginatedData, currentPage, data } = props;
  return (
    <>
      {paginatedData.length > 0 ? (
        <ol>
          {paginatedData.map((country, i) => (
            <Card
              key={i}
              country={country}
              index={i}
              currentPage={currentPage}
            ></Card>
          ))}
        </ol>
      ) : null}
      {paginatedData.length === 0 && data.length > 0 ? (
        <div className={style["message-wrapper"]}>
          <p className={style.message}>
            No data found according to selected filter settings
          </p>
        </div>
      ) : null}
    </>
  );
};

export default CardsWrapper;
