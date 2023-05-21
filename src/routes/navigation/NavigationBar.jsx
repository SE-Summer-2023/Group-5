import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavigationBar;
