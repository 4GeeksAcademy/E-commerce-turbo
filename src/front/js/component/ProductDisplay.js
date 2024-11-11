// src/components/ProductDisplay.js
import React from 'react';

function ProductDisplay({ product }) {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>Precio: ${product.price}</p>
            <p>Cantidad: {product.quantity}</p>
        </div>
    );
}

export default ProductDisplay;
