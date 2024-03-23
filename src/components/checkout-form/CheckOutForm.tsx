import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useOrder } from "@/contexts/order-context/OrderContext";
import { useAuth } from "@/contexts/auth-context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecet, setClientSecret] = React.useState("");
  const navigate = useNavigate();
  const { orders } = useOrder();
  const { user } = useAuth();
  const sum = orders.reduce((sum, order) => sum + order.price, 0);

  React.useEffect(() => {
    const fetchStripe = async () => {
      const response = await fetch(
        "http://localhost:5000/checkout/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 126tbadsgy3q7gw`,
          },
          body: JSON.stringify({
            price: sum,
          }),
        }
      );
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };
    fetchStripe();
  }, [user, sum, orders]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",

      card,
    });
    if (error) {
      console.log("error", error);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecet, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      if (paymentIntent.id) {
        const fetchPostOrder = async () => {
          const response = await fetch(`http://localhost:5000/confirm-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orders,
              paymentId: paymentIntent.id,
              userId: user?._id,
            }),
          });
          const res = await response.json();
          if (res?.success) {
            const deleteOrder = async () => {
              const Res = await fetch(
                `http://localhost:5000/order/${user?._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              await Res.json();
            };
            deleteOrder();
          }
        };
        fetchPostOrder();
        navigate("/");
      }
    }
  };
  return (
    <form className="flex flex-col border w-full " onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
                lineHeight: "5em",
                padding: "5em",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;
