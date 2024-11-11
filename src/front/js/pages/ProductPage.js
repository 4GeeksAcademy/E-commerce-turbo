// src/pages/ProductPage.js
import React, { useState } from 'react';
import ProductDisplay from '../components/ProductDisplay';
import CheckoutButton from '../components/CheckoutButton';

function ProductPage() {
    const [product] = useState({
        name: 'Producto de Ejemplo',
        price: 20, // en dólares
        quantity: 1,
    });

    return (
        <div className="App">
            <ProductDisplay product={product} />
            <CheckoutButton product={product} />
        </div>
    );
}

export default ProductPage;
