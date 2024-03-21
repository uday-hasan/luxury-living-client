import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";
import { NavLink as Link } from "react-router-dom";

type routerType = {
  path: string;
  title: string;
  visible: string;
};

const activeLink = ({ isActive }: { isActive: boolean }) => {
  return {
    textDecoration: isActive ? "underline" : "none",
  };
};
const NavLink = ({ item }: { item: routerType }) => {
  return (
    <NavigationMenuItem className="flex gap-8">
      <Link to={item.path} style={activeLink}>
        <NavigationMenuLink> {item.title}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default NavLink;
