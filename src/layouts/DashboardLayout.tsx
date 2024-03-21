import Links from "@/pages/dashboard/Links/Links";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-[50vh] transition-all">
      <div className="flex-[1] p-3 bg-cWhite ">
        <Links />
      </div>
      <div className="flex-[3]  p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
