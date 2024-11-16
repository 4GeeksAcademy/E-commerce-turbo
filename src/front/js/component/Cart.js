
import React, { useEffect, useState } from 'react';
import { fetchCart } from '../api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const response = await fetchCart();
      setCartItems(response.data);
    };
    loadCart();
  }, []);

  return (
    <div>
      <h1>Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.product.id}>
            <h2>{item.product.name}</h2>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
