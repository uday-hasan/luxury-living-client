import ButtonShared from "@/components/Button/Button";
import { useOrder } from "@/contexts/order-context/OrderContext";
import useService from "@/hooks/useService";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";

const SingleService = () => {
  const { id } = useParams();
  const { service } = useService(id);
  const { addToCart, message, setMessage } = useOrder();
  const navigate = useNavigate();
  const Navigate = () => navigate("/dashboard/cart");

  return (
    <div className="flex  flex-col md:flex-row gap-2">
      <div className="flex-[1] flex flex-col gap-2 border items-center justify-center px-4 py-8">
        <img src={service.image} alt={service.title} className="w-[10em]" />
        <h1 className="text-2xl font-bold">{service.title}</h1>
        <p className="text-lg">{service.desc}</p>
        <p className="text-cError text-2xl font-semibold">
          Price: ${service.price}
        </p>
        {message?.type === "success" && message.message && (
          <p className="text-cError font-bold text-sm flex  gap-2 items-center ">
            <span>{message.message}</span>
            <button
              className="border p-1 rounded-lg"
              onClick={() => setMessage({ ...message, message: "" })}
            >
              X
            </button>
          </p>
        )}
        {message?.type === "error" && message.message && (
          <p className="text-cError font-bold text-sm flex  gap-2 items-center ">
            <span>{message.message}</span>
            <button
              className="border p-1 rounded-lg"
              onClick={() => setMessage({ ...message, message: "" })}
            >
              X
            </button>
          </p>
        )}
        <div className="flex gap-4">
          <ButtonShared
            title="Add Cart"
            onclick={() => addToCart(service._id)}
          />
          <ButtonShared title="Go to cart" onclick={Navigate} />
        </div>
      </div>
      <div className="flex-[1]  border">
        <Comments productId={id} serviceName={service?.title} />
      </div>
    </div>
  );
};

export default SingleService;
