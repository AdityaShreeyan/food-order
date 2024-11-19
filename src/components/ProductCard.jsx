import React, { useState, useEffect } from 'react';
import { useCart } from '../useContext/CartContext';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.id === product.id);
    if (!itemInCart) {
      setQuantity(0); // Reset quantity if item is removed from cart
    }
  }, [cartItems, product.id]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(product, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    addToCart(product, newQuantity);
  };

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <img
          src={product.image.desktop}
          alt={product.name}
          className={`w-full h-[250px] object-cover shadow-lg rounded-lg ${quantity > 0 ? 'border-2 border-orange-500' : ''}`}
        />

        {quantity === 0 ? (
          <button
            onClick={handleIncrement}
            className="absolute w-40 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 hover:border-orange-500 hover:text-orange-500 bg-white border border-gray-500 rounded-full px-5 py-2 flex items-center justify-center"
          >
            <img src="/images/icon-add-to-cart.svg" alt="Add to Cart" className="mr-1" />
            Add to Cart
          </button>
        ) : (
          <div className="absolute w-40 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-orange-500 text-white border border-orange-500 rounded-full px-5 py-2 flex items-center justify-between">
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center w-8 h-8 bg-orange-500 border border-white rounded-full text-white hover:bg-white hover:text-orange-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M19 13H5v-2h14v2z" />
              </svg>
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-8 h-8 bg-orange-500 border border-white rounded-full text-white hover:bg-white hover:text-orange-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 mt-3">
        <p className="text-sm text-gray-500">{product.category}</p>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-xl font-bold text-red-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;
