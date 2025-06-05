
import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Wave Layers */}
      <div className="absolute inset-0">
        {/* Wave 1 */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
              fill="#FACC15"
              className="animate-wave-slow"
            />
          </svg>
        </div>

        {/* Wave 2 */}
        <div className="absolute bottom-0 left-0 w-full h-24 opacity-15">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C200,40 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z"
              fill="#FACC15"
              className="animate-wave-medium"
            />
          </svg>
        </div>

        {/* Wave 3 */}
        <div className="absolute bottom-0 left-0 w-full h-20 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C150,80 350,60 500,80 C650,100 850,60 1000,80 C1100,90 1150,70 1200,80 L1200,120 L0,120 Z"
              fill="#FACC15"
              className="animate-wave-fast"
            />
          </svg>
        </div>

        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full h-20 opacity-5 transform rotate-180">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,20 600,100 900,60 C1050,40 1150,80 1200,60 L1200,0 L0,0 Z"
              fill="#FACC15"
              className="animate-wave-reverse"
            />
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-bat-yellow rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-bat-yellow rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-bat-yellow rounded-full opacity-25 animate-float"></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-bat-yellow rounded-full opacity-15 animate-float-slow"></div>
        <div className="absolute bottom-60 right-10 w-2 h-2 bg-bat-yellow rounded-full opacity-20 animate-float"></div>
      </div>
    </div>
  );
};

export default WaveBackground;
