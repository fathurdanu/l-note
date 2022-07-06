import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import base_url from "../helpers/base_url";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const totalDue = props.totalDue;
  const setIsPaid = props.setIsPaid

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(base_url + "/payment", {
          amount: totalDue * 100,
          id: id,
        });
        if (response.data.success) {
          console.log(response.data.message);
          setSuccess(true);
          setIsPaid(true);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        })
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-lg font-semibold">
            Input your Credit / Debit Card Number
          </h1>
          <fieldset className="FormGroup pb-5">
            <div className="FormRow text-darkColor border border-darkColor rounded-lg py-4">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <div className="w-full flex justify-center">
            <button className="bg-darkColor rounded-lg text-lightColor text-2xl px-3 py-1">PAY</button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-bold text-darkColor text-center">
            Payment Success!
          </h2>
        </div>
      )}
    </>
  );
}
