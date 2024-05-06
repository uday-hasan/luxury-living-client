import { NavLink as Link } from "react-router-dom";

const Links = [
  {
    title: "Profile",
    href: "profile",
  },
  {
    title: "Cart",
    href: "cart",
  },
  {
    title: "Order History",
    href: "order-history",
  },
  // {
  //   title: "Review",
  //   href: "review",
  // },
];
const isActiveLink = ({ isActive }: { isActive: boolean }) => {
  return {
    textDecoration: isActive ? "underline" : "none",
  };
};

const DashBoardLinks = () => {
  return (
    <div className="flex flex-col gap-3  bg-cWhite">
      {Links?.map((link, index) => (
        <Link
          style={isActiveLink}
          className={`text-xl font-semibold text-cBlue`}
          key={index}
          to={`/dashboard/${link.href}`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default DashBoardLinks;
