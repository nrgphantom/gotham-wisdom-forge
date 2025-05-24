
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Justice', path: '/justice' },
    { name: 'Finance', path: '/finance' },
    { name: 'Health', path: '/health' },
    { name: 'Ask Batman', path: '/askbatman' },
    { name: 'Missions', path: '/missions' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gotham-black/95 backdrop-blur-sm border-b border-gotham-gray">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-bat-yellow rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-bat-yellow/50">
              <span className="text-gotham-black text-2xl font-batman font-bold transition-transform duration-300 group-hover:scale-110">🦇</span>
            </div>
            <span className="font-batman font-bold text-2xl text-bat-yellow transition-colors duration-300 group-hover:text-white">
              BATCOIN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-batman font-bold uppercase tracking-wide transition-all duration-300 hover:text-bat-yellow ${
                  location.pathname === item.path
                    ? 'text-bat-yellow'
                    : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-bat-yellow hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gotham-gray animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 font-batman font-bold uppercase tracking-wide transition-all duration-300 hover:text-bat-yellow ${
                  location.pathname === item.path
                    ? 'text-bat-yellow'
                    : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
