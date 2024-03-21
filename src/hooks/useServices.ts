import { serviceType } from "@/components/Home/services/Services";
import React from "react";

const useServices = () => {
  const [services, setServices] = React.useState<serviceType[]>([]);
  React.useEffect(() => {
    async function getServices() {
      const response = await fetch("http://localhost:5000/services");
      const data = await response.json();
      setServices(data);
    }
    getServices();
  }, []);
  return { services, setServices };
};

export default useServices;
