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
    <Link to={item.path} style={activeLink}>
      {item.title}
    </Link>
  );
};

export default NavLink;
