import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { state: cartState, dispatch, cartTotal } = useCart();
  const { state: authState } = useAuth();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    } else {
      dispatch({ 
        type: 'ADD_ITEM', 
        payload: { 
          id, 
          quantity: newQuantity - cartState.items.find(item => item.id === id).quantity 
        } 
      });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  if (cartState.items.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Discover our luxury collection of jewelry and watches</p>
          <Link 
            to="/products" 
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all"
          >
            🛍️ Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">🛒 Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartState.items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  💎
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">💰 ${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">💵 ${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border h-fit">
          <h3 className="text-2xl font-bold mb-4">📋 Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>💰 ${cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">🚚 FREE</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>💵 ${cartTotal}</span>
            </div>
          </div>
          
          <Link 
            to="/checkout"
            className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-serif font-bold text-center hover:from-yellow-600 hover:to-yellow-700 transition-all"
          >
            🔒 Proceed to Checkout
          </Link>
          {!authState.isAuthenticated && (
            <p className="text-sm text-gray-600 text-center mt-2">
              💡 You can checkout as guest or <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-semibold">login</Link> for faster checkout
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;