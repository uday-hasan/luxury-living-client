import HELMET from "@/components/shared/HELMET/HELMET";
import usePaidOrder from "@/hooks/usePaidOrder";
import useServices from "@/hooks/useServices";

const OrderHistory = () => {
  const { confirmOrders } = usePaidOrder();
  const { services } = useServices();
  return (
    <div className="flex flex-col gap-4 bg-cWhite p-4">
      <HELMET title="HISTORY" />
      {confirmOrders?.map((order) => {
        const date = new Date(order.paymentTime).toLocaleDateString();
        const product = services.find((item) => item._id === order.productId);
        return (
          <div key={order.userId}>
            <h1>{product?.title}</h1>
            <h1>Payment: {date}</h1>
            <h1>Payment Id: {order.paymentId}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
