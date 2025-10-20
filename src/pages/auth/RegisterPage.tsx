import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    console.log('Google signup');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Coffee Image */}
      <div className="w-full lg:w-1/2 h-48 lg:h-auto relative">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=1000&fit=crop"
          alt="Coffee"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Logo Overlay on Mobile */}
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white text-3xl">☕</span>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-800 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md py-4">
          {/* Logo - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">☕</span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              create account,
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              sign up to get started
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Choose a username"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-white text-gray-800 text-sm sm:text-base font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg mt-4 sm:mt-6"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400">or</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-2.5 sm:py-3 bg-transparent border border-gray-600 text-white text-sm sm:text-base font-medium rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              sign up with google
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-3 sm:mt-4 text-center pb-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-400 text-xs sm:text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
