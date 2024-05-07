import { serviceType } from "@/types/serviceType";
import React from "react";

const useService = (id: string) => {
  const [service, setService] = React.useState<serviceType>({
    image: "",
    title: "",
    price: 0,
    desc: "",
    _id: "",
  });
  React.useEffect(
    function () {
      async function getService() {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/services/${id}`
        );
        const data = await response.json();
        setService(data);
      }
      getService();
    },
    [id]
  );
  return { service, setService };
};

export default useService;
