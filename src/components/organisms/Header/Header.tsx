import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import logo from '../../../assets/coffeelogo1.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-white/60 backdrop-blur-sm'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-900 to-amber-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <img src={logo} alt="CafeConnect Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              CafeConnect
            </span>
          </Link>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/cafes" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium relative group"
            >
              Menu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium relative group"
            >
              News
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-amber-700 transition-colors font-medium relative group"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate('/login')}
              className="bg-white/50 backdrop-blur-sm border border-amber-200 hover:bg-white/80 text-gray-700"
            >
              Login
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
