import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Demo login - check test credentials
      if (formData.email === 'seller@gemcart.com' && formData.password === 'password') {
        const user = {
          id: 1,
          username: 'Seller',
          email: 'seller@gemcart.com',
          is_seller: true
        };
        dispatch({ type: 'LOGIN', payload: { token: 'demo-token', user } });
        alert('Login successful!');
        navigate('/products');
      } else if (formData.email && formData.password) {
        // Allow any email/password for demo
        const user = {
          id: 2,
          username: formData.email.split('@')[0],
          email: formData.email,
          is_seller: false
        };
        dispatch({ type: 'LOGIN', payload: { token: 'demo-token', user } });
        alert('Login successful!');
        navigate('/products');
      } else {
        alert('Please enter email and password');
      }
    } else {
      // Registration
      if (formData.username && formData.email && formData.password) {
        alert('Registration successful! Please login.');
        setIsLogin(true);
        setFormData({ username: '', email: formData.email, password: '' });
      } else {
        alert('Please fill all fields');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        
        <input 
          type="password" 
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p className="text-sm"><strong>Test Seller Account:</strong></p>
        <p className="text-sm">Email: seller@gemcart.com</p>
        <p className="text-sm">Password: password</p>
      </div>
    </div>
  );
}

export default Login;