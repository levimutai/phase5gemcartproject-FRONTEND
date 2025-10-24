import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { state: cartState, dispatch, cartTotal } = useCart();
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya'
  });

  const [mpesaPhone, setMpesaPhone] = useState('');

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate M-Pesa payment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart and show success
      dispatch({ type: 'CLEAR_CART' });
      setOrderComplete(true);
      setStep(3);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartState.items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful jewelry to get started!</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-serif font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all"
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed successfully. You will receive a confirmation SMS shortly.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all"
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">🔒 Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">📦 Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                  <select
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg font-bold hover:from-teal-700 hover:to-teal-800 transition-all"
                >
                  Continue to Payment →
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">📱 M-Pesa Payment</h2>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                  <span className="font-bold text-green-800">M-Pesa Secure Payment</span>
                </div>
                <p className="text-sm text-green-700">Pay securely with your M-Pesa mobile money account</p>
              </div>
              
              <form onSubmit={handleMpesaPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">M-Pesa Phone Number</label>
                  <input
                    type="tel"
                    placeholder="254XXXXXXXXX"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    pattern="254[0-9]{9}"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter your M-Pesa registered phone number</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Payment Instructions:</h3>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. Click "Pay with M-Pesa" below</li>
                    <li>2. You'll receive an M-Pesa prompt on your phone</li>
                    <li>3. Enter your M-Pesa PIN to complete payment</li>
                    <li>4. You'll receive a confirmation SMS</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
                >
                  {loading ? '⏳ Processing Payment...' : `📱 Pay KSH ${(parseFloat(cartTotal) * 110).toFixed(0)} with M-Pesa`}
                </button>
              </form>
              
              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Shipping
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
          <h3 className="text-2xl font-bold mb-4">📋 Order Summary</h3>
          <div className="space-y-3 mb-4">
            {cartState.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total (USD):</span>
              <span>${cartTotal}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-green-600">
              <span>Total (KSH):</span>
              <span>KSH {(parseFloat(cartTotal) * 110).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;