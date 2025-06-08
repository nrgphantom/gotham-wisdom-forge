import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import BatSignal from '../components/BatSignal';
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      title: "Justice Protocols",
      description: "Life guidance from Gotham's protector",
      icon: "⚖️",
      path: "/justice",
      color: "from-bat-yellow/20 to-bat-yellow/5"
    },
    {
      title: "Gotham Finance",
      description: "Strategic wealth management wisdom",
      icon: "💰",
      path: "/finance",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      title: "Bat-Health Protocol",
      description: "Physical and mental conditioning",
      icon: "💪",
      path: "/health",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      title: "Ask Batman",
      description: "Direct counsel from the Dark Knight",
      icon: "🦇",
      path: "/askbatman",
      color: "from-bat-crimson/20 to-bat-crimson/5"
    }
  ];

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <BatSignal />
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <img 
                src="/lovable-uploads/bb67fb31-0dc2-4b9e-8027-8461a0dfc6fc.png" 
                alt="Batcoin Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="font-batman font-black text-5xl md:text-7xl text-bat-yellow mb-4">
              BATCOIN
            </h1>
            <p className="font-batman text-xl md:text-2xl text-gray-300 mb-2 tracking-wider">
              WISDOM FORGE
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              "Forged in darkness. Built to guide."
            </p>
            <p className="text-gray-400 leading-relaxed">
              Access the wisdom of Gotham's greatest protector. Get guidance on justice, finance, 
              health, and life itself from Batman's proven methodologies.
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border-4 border-bat-yellow/30 bg-gradient-to-br from-gotham-gray/20 to-gotham-black/40 p-2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gotham-black">
                  <iframe
                    src="https://www.youtube.com/embed/TsLEolNcXug?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=TsLEolNcXug"
                    title="Batcoin Introduction"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gotham-black/20 via-transparent to-gotham-black/20 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* BATPAPER Button - Above all others */}
          <div className="flex justify-center mb-8">
            <a 
              href="https://drive.google.com/file/d/1PcFeIn5dJT3p5im3NOcHWsOmALlEBLEh/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="batman-button px-8 py-4 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide"
            >
              BATPAPER
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/askbatman" 
              className="batman-button px-8 py-4 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide"
            >
              Consult Batman
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/tools"
              className="px-8 py-4 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold uppercase tracking-wide"
            >
              TOOLS
            </Link>
            <Link 
              to="/donate" 
              className="px-8 py-4 rounded-full border-2 border-bat-yellow text-bat-yellow hover:bg-bat-yellow hover:text-gotham-black transition-all duration-300 font-batman font-bold uppercase tracking-wide"
            >
              Donate
            </Link>
          </div>

          {/* Launch Announcement Card */}
          <div className="max-w-md mx-auto mb-8">
            <div className="gotham-card p-6 rounded-lg bg-gradient-to-br from-bat-yellow/20 to-bat-yellow/5 border-2 border-bat-yellow/30 hover:border-bat-yellow/50 hover:bg-gradient-to-br hover:from-bat-yellow/30 hover:to-bat-yellow/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-bat-yellow/20">
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-batman font-bold text-xl text-bat-yellow mb-2">
                  LAUNCHING SOON
                </h3>
                <p className="text-gray-300 font-semibold mb-1">
                  BATCOIN ($BAT)
                </p>
                <p className="text-bat-yellow font-batman font-bold text-lg">
                  18 NOV 2025
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
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
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gotham-dark">
        <div className="container mx-auto px-6">
          <h2 className="font-batman font-bold text-3xl md:text-4xl text-center text-bat-yellow mb-4">
            PROTOCOLS
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Four pillars of wisdom to guide you through life's challenges
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.path}
                className="group"
              >
                <div className={`gotham-card p-6 rounded-lg h-full hover:transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.color}`}>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-batman font-bold text-xl text-bat-yellow mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
