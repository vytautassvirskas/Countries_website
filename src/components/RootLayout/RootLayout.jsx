import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import style from "./RootLayout.module.scss";

const RootLayout = (props) => {
  const { sortType, setSortType, filterRegion, setFilterRegion } = props;
  return (
    <>
      <Header
        sortType={sortType}
        setSortType={setSortType}
        filterRegion={filterRegion}
        setFilterRegion={setFilterRegion}
      />
      <main className={style.main}>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
