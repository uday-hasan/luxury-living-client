import { useOrder } from "@/contexts/order-context/OrderContext";

const OrderHistory = () => {
  const { confirmOrders } = useOrder();
  return (
    <div className="flex flex-col gap-4 bg-cWhite p-4">
      {confirmOrders?.map((order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        return order?.orders?.map((item) => (
          <div key={order.paymentId} className="bg-cWhite">
            <h1 className="text-2xl font-semibold">{item.title}</h1>
            <h1 className="text-lg font-light ">Payment on: {date}</h1>
            <h1 className="text-lg font-light ">
              Payment Id: {order.paymentId}
            </h1>
          </div>
        ));
      })}
    </div>
  );
};

export default OrderHistory;
