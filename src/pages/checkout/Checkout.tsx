import { useState, useEffect } from "react";
import CheckoutItems from "./CheckoutItems";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "@/components/checkout-form/CheckOutForm";
import usePendingOrder from "@/hooks/usePendingOrder";
import Loader from "@/components/shared/Loader/Loader";
const Checkout = () => {
  const { orders, loading: isLoading } = usePendingOrder();
  console.log(orders);
  const [loading, setLoading] = useState(false);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    () => Promise.resolve(null)
  );
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setLoading(true);
    async function stripePublishableKey() {
      const res = await fetch(
        `https://luxury-living-server-o99b.onrender.com/payment/config`
      );
      const data = await res.json();
      setStripePromise(loadStripe(data.publishableKey));
    }
    stripePublishableKey();
  }, []);

  useEffect(() => {
    async function stripePayment() {
      const res = await fetch(
        `https://luxury-living-server-o99b.onrender.com/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orders,
          }),
        }
      );
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setLoading(false);
    }
    !isLoading && stripePayment();
  }, [orders]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row justify-around  border-y-cError">
          <div className=" flex-[2] ">
            <CheckoutItems />
          </div>
          <div className="border mx-2 border-dashed"></div>
          <div className=" flex-[1]">
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm />
              </Elements>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
