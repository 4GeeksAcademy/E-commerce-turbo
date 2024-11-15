// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data);
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
