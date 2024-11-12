// src/pages/ProductPage.js
import React, { useState } from 'react';
import ProductDisplay from '../component/ProductDisplay';
import CheckoutButton from '../component/CheckoutButton';

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
