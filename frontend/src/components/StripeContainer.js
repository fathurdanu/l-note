import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LFAisLh7HemWGMnK9nIY9CefEMQHHiwGBKEwSUSW8fUEcLCDPdNhbB7WDj0ciC6WWjfdgLlDsZjuoQInqhqkO3w00LvqtDURn";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  const totalDue = props.totalDue
  const setIsPaid = props.setIsPaid 
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm setIsPaid={setIsPaid} totalDue={totalDue} />
    </Elements>
  );
}
