import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import style from "./RootLayout.module.scss";

const RootLayout = (props) => {
  const { isLoading } = props;
  return (
    <>
      <Header />
      <main className={!isLoading.state ? style.main : style["main--center"]}>
        {isLoading.state ? <Loader message={isLoading.message}></Loader> : null}
        {!isLoading.state ? <Outlet /> : null}
      </main>
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
