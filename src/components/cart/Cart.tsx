import { CiSquareRemove } from "react-icons/ci";
import ButtonShared from "../Button/Button";
import { useNavigate } from "react-router-dom";
import HELMET from "../shared/HELMET/HELMET";
import usePendingOrder from "@/hooks/usePendingOrder";
import Delete from "@/actions/cart/deleteCart";
import { useAuth } from "@/contexts/auth-context/AuthContext";

const Cart = () => {
  const { user } = useAuth();
  const { orders, setOrders } = usePendingOrder();

  let sum = 0;
  orders?.forEach((order) => {
    sum = sum + order.price;
  });
  const navigate = useNavigate();
  const Navigate = () => navigate("/checkout");

  return (
    <div className="flex items-center justify-center  ">
      <HELMET title="CART" />
      {orders?.length ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-center  text-cBlue">Cart</h1>
          <div className="flex  flex-col gap-4">
            {orders?.map((order) => (
              <div
                className="flex items-center justify-between gap-6 border-b py-2"
                key={order._id}
              >
                <div>
                  <img
                    src={order.image}
                    alt={order.title}
                    className="w-[5em]"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg">{order.title}</h1>
                  <h1 className="font-semibold text-sm">
                    Price: ${order.price}
                  </h1>
                </div>
                <div>
                  <button
                    className="transition  rounded-lg hover:text-cBlue "
                    onClick={() =>
                      Delete(order._id, user?._id).then((res) => {
                        if (res.result.success) {
                          const rest = orders.filter(
                            (item) => item._id != order._id
                          );
                          setOrders(rest);
                        }
                      })
                    }
                  >
                    <CiSquareRemove size={35} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">TOTAL: ${sum}</h1>
            <div>
              <ButtonShared
                disabled={sum <= 0}
                title="Checkout"
                onclick={Navigate}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className=" text-cError font-semibold text-3xl">Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
