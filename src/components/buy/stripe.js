import React from "react";
import { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import "./fiat.css";
// import Spinner from '/img/loading.gif';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.

export default function Stripe(props) {

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
  
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      window
        .fetch("/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setClientSecret(data.clientSecret);
        });
    }, []);
  
    const cardStyle = {
      style: {
        base: {
          color: "#fff",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#26e3ff"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };
  
    const handleChange = async (event) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
    };
  
    const handleSubmit = async ev => {
      ev.preventDefault();
      setProcessing(true);
  
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
  
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    };

    const {payOption} = props;
  return (    
    <div className={(payOption=="2")?"hidden":"stripe"}>
      <div>
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement id="card-element" options = {cardStyle} onChange={handleChange} />
          <button disabled={processing || disabled || succeeded} id="submit">
            <span>
              {processing ? (
                <div><img src = '/img/loading.gif' alt = 'loadingGif' width = '10%' /></div>
              ) : (
                "PAY NOW"
              )}
            </span>
          </button>
                {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
                 {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a> Refresh the page to pay again.
          </p>
        </form>
      </div>
    </div>
  );
}
