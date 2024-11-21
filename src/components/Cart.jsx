import React from 'react';
import { useCart } from '../useContext/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-3 text-orange-600">Your Cart ({calculateItemCount()})</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-56">
          <img src="./images/illustration-empty-cart.svg" alt="Empty Cart" className="w-40 mx-auto my-4" />
          <p className="text-[#a0624e]">Your added items will appear here</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <h3 className="text-sm">{item.name}</h3>
                <span className="text-orange-500 text-sm">{item.quantity}x</span>
                <span className="ml-3 text-sm text-[#CAAFA7]">@ ${item.price.toFixed(2)}</span>
                <span className="ml-2 text-sm text-[#a0624e]">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="rounded-full border-2 border-[#CAAFA7] w-6 h-6"
              >
                <img
                  src="/images/icon-remove-item.svg"
                  alt="Remove"
                  className="w-[14px] h-[14px] ml-[3px]"
                />
              </button>
            </div>
          ))}
          
          <div className="mt-4 pt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">Order Total</span>
            <span className="text-2xl font-bold text-[#3b1b10]">${calculateTotal()}</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-center items-center gap-2 bg-[#fff8f0] py-3">
              <img
                src="./images/icon-carbon-neutral.svg"
                alt="Carbon Neutral Icon"
                className="w-5 h-5"
              />
              <p className='text-sm'>This is a <span className='font-bold'>carbon-neutral</span> delivery</p>
            </div>
          </div>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-full w-full mt-4">
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
