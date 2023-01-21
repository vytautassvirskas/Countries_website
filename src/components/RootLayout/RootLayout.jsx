import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import style from "./RootLayout.module.scss";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
