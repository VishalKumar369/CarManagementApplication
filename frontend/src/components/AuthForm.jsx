import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '../api/index'
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Add your auth logic here
  //   toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
  //   navigate('/dashboard');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (isLogin) {
        // Call the login API
        response = await api.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Call the signup API
        response = await api.signup({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      // Handle response - check if login/signup was successful
      if (response.success) {
        setAuth(response.user, response.token);
        toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
  
        // Store the token (assuming response contains a token)
        localStorage.setItem('token', response.token);
  
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        // Handle any errors from the server
        toast.error(response.message || 'An error occurred.');
      }
    } catch (error) {
      // Catch and display any unexpected errors
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm