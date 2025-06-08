
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-gotham-black border-t border-gotham-gray">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-bat-yellow rounded-full flex items-center justify-center mr-3">
            <img 
              src="/lovable-uploads/bb67fb31-0dc2-4b9e-8027-8461a0dfc6fc.png" 
              alt="Batcoin Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="font-batman font-bold text-bat-yellow">BATCOIN</span>
        </div>
        <p className="text-gray-500 text-sm">
          "It's not who I am underneath, but what I do that defines me."
        </p>
      </div>
    </footer>
  );
};

export default Footer;
