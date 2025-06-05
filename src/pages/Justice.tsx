import React from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import MotionGraphics from '../components/MotionGraphics';

const Justice = () => {
  const justiceWisdom = [
    "The night is darkest just before the dawn. But I promise you, the dawn is coming.",
    "It's not who I am underneath, but what I do that defines me.",
    "Sometimes the truth isn't good enough, sometimes people deserve more. Sometimes people deserve to have their faith rewarded.",
    "A hero can be anyone. Even a man doing something as simple and reassuring as putting a coat around a young boy's shoulders to let him know that the world hadn't ended.",
    "Why do we fall? So we can learn to pick ourselves back up.",
    "All men have limits. They learn what they are and learn not to exceed them. I ignore mine.",
    "Criminals aren't complicated, Alfred. Just have to figure out what they're after.",
    "If you make yourself more than just a man, if you devote yourself to an ideal, and if they can't stop you, then you become something else entirely.",
    "It is not our abilities that show what we truly are… it is our choices.",
    "You either die a hero or live long enough to see yourself become the villain."
  ];

  const getRandomWisdom = () => {
    return justiceWisdom[Math.floor(Math.random() * justiceWisdom.length)];
  };

  return (
    <div className="min-h-screen bg-gotham-black">
      <MotionGraphics theme="justice" />
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-bat-yellow blur-lg opacity-20 rounded-full"></div>
              <h1 className="relative font-batman font-black text-4xl md:text-6xl text-bat-yellow">
                JUSTICE PROTOCOLS
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "In the pursuit of justice, one must sometimes walk a path of darkness."
            </p>
          </div>

          {/* Wisdom Card */}
          <WisdomCard wisdom={getRandomWisdom()} />

          {/* Footer Quote */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">
              "Justice is balance. Justice is a shield."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Justice;
