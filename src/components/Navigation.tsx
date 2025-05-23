
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/justice', label: 'Justice' },
    { path: '/finance', label: 'Finance' },
    { path: '/health', label: 'Health' },
    { path: '/askbatman', label: 'Ask Batman' },
    { path: '/missions', label: 'Missions' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gotham-black/80 backdrop-blur-md border-b border-gotham-gray">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-bat-yellow rounded-full flex items-center justify-center">
              <span className="text-gotham-black font-batman font-bold text-lg">🦇</span>
            </div>
            <span className="font-batman font-bold text-xl text-bat-yellow">BATCOIN</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-gotham font-medium text-sm uppercase tracking-wide transition-all duration-300 hover:text-bat-yellow ${
                  location.pathname === item.path 
                    ? 'text-bat-yellow border-b border-bat-yellow pb-1' 
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
