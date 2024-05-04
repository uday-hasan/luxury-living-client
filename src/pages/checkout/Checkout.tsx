import CheckOutForm from "@/components/checkout-form/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutItems from "./CheckoutItems";
import { useOrder } from "@/contexts/order-context/OrderContext";
import Loader from "@/components/shared/Loader/Loader";
const Checkout = () => {
  const { orders } = useOrder();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    () => Promise.resolve(null)
  );
  useEffect(() => {
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://luxury-living-server-o99b.onrender.com/payment/config`)
      .then((res) => res.json())
      .then((data) => {
        const { publishableKey } = data;
        setStripePromise(loadStripe(publishableKey));
      });
  }, []);
  useEffect(() => {
    const sum = orders.reduce((s, order) => s + order.price, 0);
    fetch(
      `https://luxury-living-server-o99b.onrender.com/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: sum }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data?.clientSecret);
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
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
