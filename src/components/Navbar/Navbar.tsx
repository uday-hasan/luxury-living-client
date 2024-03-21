import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import NavLink from "./NavLink";
import NavIcon from "../../assets/images/navicon.png";
import ButtonShared from "../Button/Button";
import { useAuth } from "@/contexts/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const changePath = () => {
    navigate("/dashboard");
  };
  const routes = router.filter((route) =>
    user
      ? route.visible === "always" || route.visible === "signin"
      : route.visible === "always" || route.visible === "signout"
  );

  return (
    <div className=" flex justify-between  items-center   bg-cWhite px-16">
      <div className="p-4">
        <img src={NavIcon} className="w-36" />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6 font-semibold">
            {routes.map((item) => (
              <NavLink item={item} key={item.path} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        {user ? (
          <ButtonShared title="LOGOUT" onclick={logOut}></ButtonShared>
        ) : (
          <ButtonShared title="LOGIN" onclick={changePath}></ButtonShared>
        )}
      </div>
    </div>
  );
};

export default Navbar;
