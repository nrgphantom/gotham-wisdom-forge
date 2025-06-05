
import React from 'react';

const MotionGraphics = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating DNA Helix */}
      <div className="absolute top-20 left-10 opacity-10">
        <div className="dna-helix">
          <div className="helix-strand"></div>
          <div className="helix-strand helix-strand-2"></div>
        </div>
      </div>

      {/* Floating Heart Beat Lines */}
      <div className="absolute top-40 right-20 opacity-15">
        <div className="heartbeat-line">
          <div className="heartbeat-pulse"></div>
        </div>
      </div>

      {/* Floating Medical Cross */}
      <div className="absolute bottom-40 left-20 opacity-10">
        <div className="medical-cross floating-element">
          <div className="cross-vertical"></div>
          <div className="cross-horizontal"></div>
        </div>
      </div>

      {/* Floating Molecules */}
      <div className="absolute top-60 right-40 opacity-15">
        <div className="molecule floating-element-slow">
          <div className="atom atom-center"></div>
          <div className="atom atom-orbit-1"></div>
          <div className="atom atom-orbit-2"></div>
          <div className="atom atom-orbit-3"></div>
        </div>
      </div>

      {/* Floating Health Icons */}
      <div className="absolute bottom-60 right-10 opacity-10">
        <div className="health-icon floating-element">💊</div>
      </div>

      <div className="absolute top-80 left-40 opacity-10">
        <div className="health-icon floating-element-slow">🏃</div>
      </div>

      {/* Geometric Health Patterns */}
      <div className="absolute bottom-20 left-40 opacity-5">
        <div className="geometric-pattern">
          <div className="geo-circle geo-circle-1"></div>
          <div className="geo-circle geo-circle-2"></div>
          <div className="geo-circle geo-circle-3"></div>
        </div>
      </div>

      {/* Floating Plus Signs */}
      <div className="absolute top-32 right-60 opacity-10">
        <div className="plus-sign rotating-element">+</div>
      </div>

      <div className="absolute bottom-80 left-60 opacity-10">
        <div className="plus-sign rotating-element-slow">+</div>
      </div>
    </div>
  );
};

export default MotionGraphics;
