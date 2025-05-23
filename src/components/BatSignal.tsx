
import React from 'react';

const BatSignal = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative">
        <div className="w-64 h-64 rounded-full bg-gradient-radial from-bat-yellow/20 via-bat-yellow/10 to-transparent animate-bat-signal"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-bat-yellow/30">🦇</div>
        </div>
      </div>
    </div>
  );
};

export default BatSignal;
