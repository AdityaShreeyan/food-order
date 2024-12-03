import React from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { CartProvider } from './useContext/CartContext';

function App() {
  return (
    <CartProvider>
    <div className="flex flex-col md:flex-row min-h-screen p-16 bg-[#fff8f0]">
      {/* Product List Section */}
      <div className="w-3/4 pr-8">
        <ProductList />
      </div>

      {/* Cart Section */}
      <div className="w-1/4">
        <Cart />
      </div>
    </div>
    </CartProvider>
  );
}

export default App;