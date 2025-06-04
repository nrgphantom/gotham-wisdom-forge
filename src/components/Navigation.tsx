
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu } from 'lucide-react';

interface NavigationProps {
  isRestricted?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isRestricted = false }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const allNavItems = [
    { path: '/', label: 'Home' },
    { path: '/justice', label: 'Justice' },
    { path: '/finance', label: 'Finance' },
    { path: '/health', label: 'Health' },
    { path: '/askbatman', label: 'Ask Batman' },
    { path: '/tools', label: 'Tools' },
    { path: '/donate', label: 'Donate' }
  ];

  // Show only Home when restricted
  const navItems = isRestricted ? [{ path: '/', label: 'Home' }] : allNavItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gotham-black/80 backdrop-blur-md border-b border-gotham-gray">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img 
                src="/lovable-uploads/bb67fb31-0dc2-4b9e-8027-8461a0dfc6fc.png" 
                alt="Batcoin Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="font-batman font-bold text-xl text-bat-yellow group-hover:text-white transition-colors duration-300">BATCOIN</span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation */}
          {isMobile && (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="md:hidden p-2 text-bat-yellow hover:text-white transition-colors">
                <Menu size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-gotham-black border-gotham-gray shadow-xl"
              >
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={`w-full px-4 py-3 text-sm font-gotham uppercase tracking-wide transition-colors ${
                        location.pathname === item.path 
                          ? 'text-bat-yellow bg-gotham-gray/20' 
                          : 'text-gray-300 hover:text-bat-yellow hover:bg-gotham-gray/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
