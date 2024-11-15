// src/components/Product.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, addToCart } from '../api';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetchProductById(id);
      setProduct(response.data);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(id);
    alert('Producto añadido al carrito');
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Añadir al carrito</button>
    </div>
  );
}

export default Product;
