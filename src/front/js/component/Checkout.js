import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";
import { stripePublicKey, backendUrl } from "./config"; 
import '../styles/Checkout.css';


// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe(stripePublicKey);

const Checkout = () => {
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Crear el PaymentIntent llamando al backend
 const createPaymentIntent = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/create-payment-intent`, {
        amount: 2000,  // $20.00 en centavos
      });
      setPaymentIntentId(response.data.id);
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      setErrorMessage('Error al crear el PaymentIntent');
    }
  };

  // Manejar el proceso de pago
  const handleCheckout = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return; 
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(paymentIntentId, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Cliente de prueba",
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Pago realizado con éxito:", paymentIntent);
      // Redirigir al usuario a la página de éxito
      window.location.href = "/success";
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <div className="checkout-container">
      <h2>Formulario de Pago</h2>
      <form onSubmit={handleCheckout}>
        <div>
          <label>Detalles de la tarjeta:</label>
          <CardElement 
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          />
        </div>

        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Checkout;