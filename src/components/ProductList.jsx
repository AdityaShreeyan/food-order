import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import data from '../assets/data.json'

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from data.json
    setProducts(data);
    console.log(data);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Desserts</h1>
      <div className="grid grid-cols-3 gap-12">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
