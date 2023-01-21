import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header.jsx";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
