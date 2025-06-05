
import React from 'react';

interface MotionGraphicsProps {
  theme?: 'default' | 'justice' | 'finance' | 'health' | 'batman';
}

const MotionGraphics: React.FC<MotionGraphicsProps> = ({ theme = 'default' }) => {
  const renderHealthElements = () => (
    <>
      {/* DNA Helix */}
      <div className="absolute top-20 left-10 opacity-10">
        <div className="dna-helix">
          <div className="helix-strand"></div>
          <div className="helix-strand helix-strand-2"></div>
        </div>
      </div>

      {/* Heartbeat Lines */}
      <div className="absolute top-40 right-20 opacity-15">
        <div className="heartbeat-line">
          <div className="heartbeat-pulse"></div>
        </div>
      </div>

      {/* Medical Cross */}
      <div className="absolute bottom-40 left-20 opacity-10">
        <div className="medical-cross floating-element">
          <div className="cross-vertical"></div>
          <div className="cross-horizontal"></div>
        </div>
      </div>

      {/* Molecules */}
      <div className="absolute top-60 right-40 opacity-15">
        <div className="molecule floating-element-slow">
          <div className="atom atom-center"></div>
          <div className="atom atom-orbit-1"></div>
          <div className="atom atom-orbit-2"></div>
          <div className="atom atom-orbit-3"></div>
        </div>
      </div>

      {/* Health Icons */}
      <div className="absolute bottom-60 right-10 opacity-10">
        <div className="health-icon floating-element">💊</div>
      </div>

      <div className="absolute top-80 left-40 opacity-10">
        <div className="health-icon floating-element-slow">🏃</div>
      </div>
    </>
  );

  const renderJusticeElements = () => (
    <>
      {/* Scales of Justice */}
      <div className="absolute top-20 right-10 opacity-10">
        <div className="scales-justice floating-element">
          <div className="scale-beam"></div>
          <div className="scale-left"></div>
          <div className="scale-right"></div>
        </div>
      </div>

      {/* Gavel */}
      <div className="absolute bottom-40 left-10 opacity-15">
        <div className="gavel rotating-element-slow">⚖️</div>
      </div>

      {/* Shield */}
      <div className="absolute top-60 left-20 opacity-10">
        <div className="shield floating-element">🛡️</div>
      </div>

      {/* Sword */}
      <div className="absolute bottom-60 right-20 opacity-10">
        <div className="sword rotating-element">⚔️</div>
      </div>
    </>
  );

  const renderFinanceElements = () => (
    <>
      {/* Dollar Signs */}
      <div className="absolute top-20 left-10 opacity-10">
        <div className="dollar-sign floating-element">💰</div>
      </div>

      {/* Stock Chart Lines */}
      <div className="absolute top-40 right-20 opacity-15">
        <div className="stock-chart">
          <div className="chart-line"></div>
        </div>
      </div>

      {/* Coins */}
      <div className="absolute bottom-40 left-20 opacity-10">
        <div className="coin rotating-element">🪙</div>
      </div>

      {/* Graph */}
      <div className="absolute top-60 right-40 opacity-15">
        <div className="graph floating-element-slow">📈</div>
      </div>

      {/* Calculator */}
      <div className="absolute bottom-60 right-10 opacity-10">
        <div className="calculator floating-element">🧮</div>
      </div>
    </>
  );

  const renderBatmanElements = () => (
    <>
      {/* Bat Symbols */}
      <div className="absolute top-20 right-10 opacity-8">
        <div className="bat-symbol floating-element">🦇</div>
      </div>

      <div className="absolute bottom-40 left-10 opacity-8">
        <div className="bat-symbol floating-element-slow">🦇</div>
      </div>

      {/* Gotham Buildings */}
      <div className="absolute top-60 left-20 opacity-5">
        <div className="gotham-building">
          <div className="building-tower"></div>
          <div className="building-base"></div>
        </div>
      </div>

      {/* Utility Belt Items */}
      <div className="absolute bottom-60 right-20 opacity-10">
        <div className="utility-item rotating-element">⚡</div>
      </div>

      {/* Batarang */}
      <div className="absolute top-80 right-40 opacity-10">
        <div className="batarang rotating-element-slow">🌙</div>
      </div>
    </>
  );

  const renderDefaultElements = () => (
    <>
      {/* Bat Symbols */}
      <div className="absolute top-20 right-10 opacity-8">
        <div className="bat-symbol floating-element">🦇</div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute bottom-20 left-40 opacity-5">
        <div className="geometric-pattern">
          <div className="geo-circle geo-circle-1"></div>
          <div className="geo-circle geo-circle-2"></div>
          <div className="geo-circle geo-circle-3"></div>
        </div>
      </div>

      {/* Plus Signs */}
      <div className="absolute top-32 right-60 opacity-10">
        <div className="plus-sign rotating-element">+</div>
      </div>

      <div className="absolute bottom-80 left-60 opacity-10">
        <div className="plus-sign rotating-element-slow">+</div>
      </div>

      {/* Gotham Elements */}
      <div className="absolute bottom-40 left-10 opacity-8">
        <div className="bat-symbol floating-element-slow">🦇</div>
      </div>

      <div className="absolute top-60 left-20 opacity-5">
        <div className="gotham-building">
          <div className="building-tower"></div>
          <div className="building-base"></div>
        </div>
      </div>
    </>
  );

  const getThemeElements = () => {
    switch (theme) {
      case 'health':
        return renderHealthElements();
      case 'justice':
        return renderJusticeElements();
      case 'finance':
        return renderFinanceElements();
      case 'batman':
        return renderBatmanElements();
      default:
        return renderDefaultElements();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {getThemeElements()}
    </div>
  );
};

export default MotionGraphics;
