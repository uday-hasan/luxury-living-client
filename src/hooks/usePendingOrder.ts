import { useAuth } from "@/contexts/auth-context/AuthContext";
import { serviceType } from "@/types/serviceType";
import React from "react";
import { toast } from "react-toastify";

const usePendingOrder = () => {
  const [orders, setOrders] = React.useState<serviceType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user, logOut } = useAuth();
  React.useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/order/pending/${user?._id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("access-token")!
            )}`,
          },
        }
      );
      if (response.status !== 200) {
        logOut();
        toast.error("Something went wrong, please login.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const data = await response.json();
      setOrders(data.data);
      setLoading(false);
    };
    user && getOrders();
  }, [user?._id]);
  return { orders, setOrders, loading };
};

export default usePendingOrder;
