import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className=" flex flex-col ">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
