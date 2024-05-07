import { serviceType } from "@/types/serviceType";
import React from "react";

const useServices = () => {
  const [services, setServices] = React.useState<serviceType[]>([]);
  React.useEffect(() => {
    async function getServices() {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/services`
      );
      const data = await response.json();
      setServices(data);
    }
    getServices();
  }, []);
  return { services, setServices };
};

export default useServices;
