import Loader from "@/components/shared/Loader/Loader";
import { useState, useEffect } from "react";
import CheckoutItems from "./CheckoutItems";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useOrder } from "@/contexts/order-context/OrderContext";
import CheckOutForm from "@/components/checkout-form/CheckOutForm";
const Checkout = () => {
  const { orders } = useOrder();
  const [loading, setLoading] = useState(false);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    () => Promise.resolve(null)
  );
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/payment/config")
      .then((res) => res.json())
      .then((data) => {
        const { publishableKey: pub } = data;
        setStripePromise(loadStripe(pub));
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/payment/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orders,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row justify-around  border-y-cError">
          <div className=" flex-[2] ">
            <CheckoutItems />
          </div>
          {/* <hr className="border-2 h-full " /> */}
          <div className="border mx-2 border-dashed"></div>
          <div className=" flex-[1]">
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm />
              </Elements>
            )}
            {/* {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm />
              </Elements>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
