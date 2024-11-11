// src/components/CheckoutButton.js
import React from 'react';
import axios from 'axios';

function CheckoutButton({ product }) {
    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-checkout-session', {
                product_name: product.name,
                price: product.price,
                quantity: product.quantity,
            });
            const { id } = response.data;
            window.location = `https://checkout.stripe.com/pay/${id}`;
        } catch (error) {
            console.error('Error al crear la sesión de pago:', error);
        }
    };

    return <button onClick={handleCheckout}>Pagar</button>;
}

export default CheckoutButton;
