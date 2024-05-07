import usePendingOrder from "@/hooks/usePendingOrder";

const CheckoutItems = () => {
  const { orders } = usePendingOrder();
  const sum = orders.reduce((total, order) => total + order.price, 0);
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div>
        {orders?.map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between gap-4"
          >
            <img src={order?.image} alt={order.title} className="w-16" />
            <h1 className="font-bold text-xl">{order.title}</h1>
            <h1 className="font-bold">
              Price:
              <span className="font-extrabold text-cBlue"> ${order.price}</span>
            </h1>
          </div>
        ))}
      </div>
      <hr className="border border-cError border-dashed w-full" />
      <div className="font-bold text-cError text-2xl flex  w-full justify-evenly ">
        <h1>Total: ${sum}</h1>
      </div>
    </div>
  );
};

export default CheckoutItems;
