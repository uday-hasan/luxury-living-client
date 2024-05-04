import NavLink from "./NavLink";
import NavIcon from "../../assets/images/navicon.png";
import ButtonShared from "../Button/Button";
import { useAuth } from "@/contexts/auth-context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";

const router = [
  {
    path: "/",
    title: "Home",
    visible: "always",
  },
  {
    path: "/login",
    title: "Login",
    visible: "signout",
  },
  {
    path: "/register",
    title: "Register",
    visible: "signout",
  },
  {
    path: "/services",
    title: "Services",
    visible: "always",
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    visible: "signin",
  },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dashboard, setDashboard] = useState(true);
  const path = useLocation();
  useEffect(() => {
    const ref = window.location.pathname.startsWith("/dashboard");
    setDashboard(ref);
  }, [path]);
  const navigate = useNavigate();
  const changePath = () => {
    navigate("/dashboard");
  };
  const routes = router.filter((route) =>
    user
      ? route.visible === "always" || route.visible === "signin"
      : route.visible === "always" || route.visible === "signout"
  );
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex justify-between  items-center   bg-cWhite px-16 sticky top-0">
      <div className="p-4">
        <img src={NavIcon} className="w-36" />
      </div>
      <ul className="hidden md:flex gap-4">
        {routes.map((route) => (
          <li className="text-xl font-semibold key={route.path} ">
            <NavLink item={route} />
          </li>
        ))}
      </ul>
      <div className="hidden md:flex">
        {user ? (
          <ButtonShared title="LOGOUT" onclick={logOut}></ButtonShared>
        ) : (
          <ButtonShared title="LOGIN" onclick={changePath}></ButtonShared>
        )}
      </div>
      <div className="flex md:hidden relative border">
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? (
            <AiOutlineMenuUnfold size={25} />
          ) : (
            <AiOutlineMenuFold size={25} />
          )}
        </button>
        <div
          className={`fixed flex flex-col text-xl top-0 bg-cBlue  px-10 py-5 text-right  h-screen text-cWhite gap-6 transition-all ${
            open ? "right-0 " : "-right-96 "
          }`}
        >
          <div>
            <button>
              <IoIosCloseCircleOutline
                size={25}
                onClick={() => setOpen(false)}
              />
            </button>
          </div>
          {routes.map((route) => (
            <NavLink item={route} key={route.path} />
          ))}

          {dashboard && (
            <>
              <NavLink
                item={{
                  path: "/dashboard/profile",
                  title: "Profile",
                  visible: "signin",
                }}
              />
              <NavLink
                item={{
                  path: "/dashboard/cart",
                  title: "Cart",
                  visible: "signin",
                }}
              />
              <NavLink
                item={{
                  path: "/dashboard/order-history",
                  title: "Order History",
                  visible: "signin",
                }}
              />
              <NavLink
                item={{
                  path: "/dashboard/review",
                  title: "Review",
                  visible: "signin",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
