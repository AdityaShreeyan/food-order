import React from 'react';
import { useCart } from '../useContext/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-orange-600">Your Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <div>
          <img src="./images/illustration-empty-cart.svg" alt="Empty Cart" className="w-24 mx-auto my-4" />
          <p className="text-gray-500 mt-4">Your added items will appear here</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div>
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                <img src="/images/icon-remove-item.svg" alt="Remove" className="w-5 h-5" />
              </button>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <p className="text-xl font-bold text-red-600">Total: ${calculateTotal()}</p>
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
