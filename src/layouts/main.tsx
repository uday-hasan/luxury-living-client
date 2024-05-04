import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  return (
    <HelmetProvider>
      <div className=" flex flex-col min-h-screen justify-between ">
        <Navbar />
        <div className="min-h-[50vh] overflow-auto">
          <Outlet />
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </HelmetProvider>
  );
};

export default Main;
