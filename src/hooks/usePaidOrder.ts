import { useAuth } from "@/contexts/auth-context/AuthContext";
import React from "react";
import { toast } from "react-toastify";
type ConfirmOrderType = {
  paymentTime: Date;
  paymentId: string;
  productId: string;
  userId: string;
};
const usePaidOrder = () => {
  const { user, logOut } = useAuth();
  const [confirmOrders, setConfirmOrders] = React.useState<ConfirmOrderType[]>(
    []
  );
  React.useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/order/done/${user?._id}`,
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
      const { orders } = await response.json();
      setConfirmOrders(orders);
    };
    user && getOrders();
  }, [user?._id]);
  return { confirmOrders, setConfirmOrders };
};

export default usePaidOrder;
