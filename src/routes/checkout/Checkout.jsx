import { useEffect, useState } from "react";
import { Center, Container, Loader, rem } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from "../../components/paymentForm/PaymentForm";

const Checkout = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { cartTotal } = useSelector((state) => state.cartDetails);

  useEffect(() => {
    fetch("https://concordia-travel-server.onrender.com/config").then(
      async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      }
    );
  }, []);

  useEffect(() => {
    fetch(
      "https://concordia-travel-server.onrender.com/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal * 100 }),
      }
    ).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [cartTotal]);
  return (
    <Container>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      ) : (
        <Center mt={rem(52)}>
          <Loader />
        </Center>
      )}
    </Container>
  );
};

export default Checkout;
