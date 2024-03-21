import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className=" flex flex-col min-h-screen justify-between gap-6">
      <Navbar />
      <div className="min-h-[50vh] overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
