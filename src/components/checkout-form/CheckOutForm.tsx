import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import React, { useState } from "react";
import usePendingOrder from "@/hooks/usePendingOrder";
import { useAuth } from "@/contexts/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonShared from "../Button/Button";
import "react-toastify/dist/ReactToastify.css";

const CheckOutForm = () => {
  const { user } = useAuth();
  const { orders, loading: isLoading } = usePendingOrder();
  const stripe = useStripe();
  const elements = useElements();

  const [msg, setMsg] = useState<string | undefined>("");

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173",
        },
        redirect: "if_required",
      });
      if (paymentIntent) {
        fetch(`${import.meta.env.VITE_SERVER_URL}/order/${user?._id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ paymentId: paymentIntent.id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              navigate("/");
              toast.success("Successfully purched.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          });
      }
      if (error) {
        setMsg(error.message);
      }
    } catch (err) {
      console.log(err);
      setMsg("Error confirming payment, try later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="py-10 px-4 space-y-4">
        <PaymentElement></PaymentElement>
        {msg && <p className="font-semibold text-cError">{msg}</p>}
        <ButtonShared
          title="PAY"
          type="submit"
          disabled={orders?.length < 1 || loading || isLoading}
        />
      </form>
    </>
  );
};

export default CheckOutForm;
