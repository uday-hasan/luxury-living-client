import { serviceType } from "@/components/Home/services/Services";
import React, { Dispatch, SetStateAction } from "react";
import { useAuth } from "../auth-context/AuthContext";

type ConfirmOrderType = {
  _id: string;
  orders: serviceType[];
  userId: string;
  paymentId: string;
  createdAt: Date;
};
type OrderType = {
  orders: serviceType[];
  setOrders: Dispatch<SetStateAction<serviceType[]>>;
  confirmOrders: ConfirmOrderType[];
  setConfirmOrders: Dispatch<SetStateAction<ConfirmOrderType[]>>;
  message: { type: string; message: string };
  setMessage: Dispatch<SetStateAction<{ type: string; message: string }>>;
  addToCart: (id: string | undefined) => void;
  Delete: (productId: string | undefined) => void;
};

const orderProvider = React.createContext<OrderType>({
  orders: [],
  setOrders: () => {},
  confirmOrders: [],
  setConfirmOrders: () => {},
  message: { message: "", type: "error" },
  setMessage: () => {},
  addToCart: () => {},
  Delete: () => {},
});

export const useOrder = () => React.useContext(orderProvider);

const OrderContext = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [orders, setOrders] = React.useState<serviceType[]>([]);
  const [confirmOrders, setConfirmOrders] = React.useState<ConfirmOrderType[]>(
    []
  );
  const [message, setMessage] = React.useState({
    type: "error",
    message: "",
  });

  //   Add To Cart
  const addToCart = async (id: string | undefined) => {
    try {
      const response = await fetch(`http://localhost:5000/order`, {
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

  //   Delete Order
  async function Delete(productId: string | undefined) {
    const response = await fetch(
      `http://localhost:5000/order/${user?._id}/${productId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    if (result.success) {
      const a = orders.filter((item) => item._id !== productId);
      setOrders(a);
      setMessage({
        type: "success",
        message: result?.message,
      });
    }
  }

  //   Get All Orders
  React.useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`http://localhost:5000/order/${user?._id}`);
      const data = await response.json();
      setOrders(data.data);
    };
    getOrders();
  }, [user?._id]);

  // Get order which is confirmed by payment
  React.useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(
        `http://localhost:5000/confirm-order/${user?._id}`
      );
      const data = await response.json();
      setConfirmOrders(data.data);
    };
    getOrders();
  }, [user?._id]);

  return (
    <orderProvider.Provider
      value={{
        orders,
        setOrders,
        message,
        setMessage,
        addToCart,
        Delete,
        confirmOrders,
        setConfirmOrders,
      }}
    >
      {children}
    </orderProvider.Provider>
  );
};

export default OrderContext;
