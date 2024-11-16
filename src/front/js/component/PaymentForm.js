import React, { useState } from 'react';

const PaymentForm = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_name: productName,
                price: parseFloat(price),
                quantity: parseInt(quantity),
            }),
        });

        const data = await response.json();
        if (data.id) {
            // Redirigir al usuario a Stripe Checkout con la sesión creada
            window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
        } else {
            console.error('Error creating checkout session:', data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">Proceed to Checkout</button>
            </div>
        </form>
    );
};

export default PaymentForm;
