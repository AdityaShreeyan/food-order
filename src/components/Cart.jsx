import React, { useState } from 'react';
import { useCart } from '../useContext/CartContext';
import ConfirmOrderModal from './ConfirmOrderModal';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    clearCart(); // Reset the cart when closing the modal
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-3 text-orange-600">Your Cart ({calculateItemCount()})</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-56">
          <img src="./images/illustration-empty-cart.svg" alt="Empty Cart" className="w-40 mx-auto my-4" />
          <p className="text-[#a0624e] text-center">Your added items will appear here</p>
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
          <button
            className="bg-orange-600 text-white py-2 px-4 rounded-full w-full mt-4"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      )}

      {/* Modal */}
      <ConfirmOrderModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="">
          <img src="./images/icon-order-confirmed.svg" alt="Order Confirmed" className="w-12 mb-4" />
          <h2 className="text-2xl font-bold text-[#3b1b10] mb-2">Order Confirmed</h2>
          <p className="text-gray-600">We hope you enjoy your food!</p>

          <div className="mt-4 bg-[#fff8f0] p-5 rounded-lg">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b text-sm"
              >
                <span className="flex items-center gap-2">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div className='flex-col'>
                    <div>{item.name}</div>
                    <div className='flex space-x-3'><span className="text-orange-500 text-sm">{item.quantity}x</span>
                    <span className="ml-3 text-sm text-[#CAAFA7]">@ ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                </span>
                <span className="font-bold text-[#3b1b10]">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          <div className="mt-6 flex justify-between items-center"><span className='text-sm text-[#b27867]'>Order Total</span><span className='text-xl font-bold'>${calculateTotal()}</span></div>            
          </div>


          <button
            onClick={handleCloseModal}
            className="bg-orange-600 text-white py-2 px-4 rounded-full w-full mt-4"
          >
            Start New Order
          </button>
        </div>
      </ConfirmOrderModal>
    </div>
  );
}

export default Cart;
