import { useAuth } from "@/contexts/auth-context/AuthContext";
import usePendingOrder from "@/hooks/usePendingOrder";
import React from "react";

const addCart = () => {
  const { user } = useAuth();
  const { orders, setOrders } = usePendingOrder();
  const [message, setMessage] = React.useState({
    type: "error",
    message: "",
  });

  //   Add To Cart
  const addToCart = async (id: string | undefined) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          userId: user?._id,
        }),
      });
      const data = await response.json();
      if (data?.success) {
        const a = [...orders, data.data];
        setOrders(a);
        setMessage({
          type: "success",
          message: data.message,
        });
      } else {
        setMessage({ type: "error", message: data.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { addToCart, message, setMessage };
};

export default addCart;
