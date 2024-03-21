import { serviceType } from "@/components/Home/services/Services";
import React from "react";

const useService = (id: string | undefined) => {
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
        const response = await fetch(`http://localhost:5000/services/${id}`);
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
