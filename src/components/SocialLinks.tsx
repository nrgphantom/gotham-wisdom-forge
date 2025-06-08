
import React from 'react';

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-6 mb-16">
      <a 
        href="https://www.instagram.com/batcoinsolana/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 transform hover:scale-110"
      >
        <img 
          src="/lovable-uploads/78bfa5d8-06d0-4ea5-826b-08628ea7e80e.png" 
          alt="Instagram" 
          className="w-6 h-6 object-contain"
        />
      </a>
      <a 
        href="#"
        className="p-3 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 transform hover:scale-110"
      >
        <img 
          src="/lovable-uploads/34235c32-e799-41db-a83b-9234937e64a7.png" 
          alt="X (Twitter)" 
          className="w-6 h-6 object-contain"
        />
      </a>
      <a 
        href="#"
        className="p-3 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 transform hover:scale-110"
      >
        <img 
          src="/lovable-uploads/9d47c3b6-f312-464d-8401-470b8e5ec2ab.png" 
          alt="Telegram" 
          className="w-6 h-6 object-contain"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
