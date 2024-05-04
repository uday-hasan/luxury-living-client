import { serviceType } from "@/types/serviceType";
import React from "react";

const useServices = () => {
  const [services, setServices] = React.useState<serviceType[]>([]);
  React.useEffect(() => {
    async function getServices() {
      const response = await fetch(
        "https://luxury-living-server-o99b.onrender.com/services"
      );
      const data = await response.json();
      setServices(data);
    }
    getServices();
  }, []);
  return { services, setServices };
};

export default useServices;
