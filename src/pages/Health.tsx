import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import MotionGraphics from '../components/MotionGraphics';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { fetchBatmanWisdom, parseHealthProtocols } from '../utils/batmanWisdom';
import { toast } from "sonner";
import '../styles/motionGraphics.css';

interface CovidData {
  cases: number;
  deaths: number;
  recovered: number;
  updated: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  affectedCountries: number;
}

interface WHOData {
  value: Array<{
    SpatialDim: string;
    TimeDim: number;
    Dim1: string;
    NumericValue: number;
    Value: string;
  }>;
}

const Health = () => {
  const [healthProtocols, setHealthProtocols] = useState<Array<{
    title: string;
    quote: string;
    category: string;
    icon: string;
  }>>([]);
  const [dailyChallenge, setDailyChallenge] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [covidData, setCovidData] = useState<CovidData | null>(null);
  const [whoHealthData, setWhoHealthData] = useState<WHOData | null>(null);

  const fetchHealthContent = async () => {
    setLoading(true);
    try {
      // Fetch health protocols
      const protocolsResponse = await fetchBatmanWisdom("healthProtocols");
      const parsedProtocols = parseHealthProtocols(protocolsResponse);
      if (parsedProtocols.length > 0) {
        setHealthProtocols(parsedProtocols);
      }
      
      // Fetch health challenge
      const challengeResponse = await fetchBatmanWisdom("healthChallenge");
      if (challengeResponse) {
        setDailyChallenge(challengeResponse);
      }
    } catch (error) {
      console.error("Error fetching health content:", error);
      toast.error("Failed to communicate with the Batcomputer. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCovidData = async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      const data = await response.json();
      setCovidData(data);
    } catch (error) {
      console.error("Error fetching COVID data:", error);
    }
  };

  const fetchWHOData = async () => {
    try {
      const response = await fetch('https://ghoapi.azureedge.net/api/WHOSIS_000001');
      const data = await response.json();
      setWhoHealthData(data);
    } catch (error) {
      console.error("Error fetching WHO data:", error);
    }
  };

  const handleTabChange = (value: string) => {
    // Auto-scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchHealthContent();
    fetchCovidData();
    fetchWHOData();
    
    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchHealthContent();
      fetchCovidData();
      fetchWHOData();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Updated health protocols with fresh content
  const defaultHealthProtocols = [
    {
      title: "Physical Excellence",
      quote: "Your body is your primary weapon and defense system. Train it daily with the respect it deserves—strength, endurance, flexibility.",
      category: "Physical Training",
      icon: "💪"
    },
    {
      title: "Recovery Mastery",
      quote: "Elite performance requires elite recovery. 7-9 hours of quality sleep isn't luxury—it's mission-critical maintenance.",
      category: "Sleep & Recovery",
      icon: "😴"
    },
    {
      title: "Mental Fortification",
      quote: "A clear mind cuts through chaos like a blade through shadow. Daily meditation builds unshakeable mental resilience.",
      category: "Mental Health",
      icon: "🧠"
    },
    {
      title: "Nutritional Intelligence",
      quote: "Fuel your body like the high-performance machine it is. Every meal is either medicine or poison—choose wisely.",
      category: "Nutrition",
      icon: "🥗"
    },
    {
      title: "Cardiovascular Dominance",
      quote: "Your heart pumps life through your veins. Cardio training builds the endurance to never give up when it matters most.",
      category: "Cardio Fitness",
      icon: "❤️"
    },
    {
      title: "Strength Foundation",
      quote: "Physical strength builds mental strength. Every rep in the gym prepares you for battles beyond the gym.",
      category: "Strength Training",
      icon: "🏋️"
    },
    {
      title: "Mobility & Flexibility",
      quote: "A flexible body houses a flexible mind. Daily stretching prevents injury and maintains peak physical readiness.",
      category: "Flexibility",
      icon: "🤸"
    },
    {
      title: "Stress Transformation",
      quote: "Stress is inevitable, but suffering is optional. Learn to transform pressure into power through breathing and mindfulness.",
      category: "Stress Management",
      icon: "🕯️"
    },
    {
      title: "Hydration Protocol",
      quote: "Water is life's most essential resource. Proper hydration sharpens focus, boosts energy, and optimizes every bodily function.",
      category: "Hydration",
      icon: "💧"
    },
    {
      title: "Injury Prevention",
      quote: "The best fight is the one you avoid. Warm up properly, listen to your body, and prevent injuries before they happen.",
      category: "Injury Prevention",
      icon: "🛡️"
    }
  ];

  const displayHealthProtocols = healthProtocols.length > 0 ? healthProtocols : defaultHealthProtocols;
  const displayChallenge = dailyChallenge || "Complete a 30-minute workout today. It doesn't matter what kind—push-ups, running, yoga. Your future self depends on what you do today.";

  const dailyRoutine = [
    { time: "5:00 AM", activity: "Rise with purpose, no snooze", icon: "⏰" },
    { time: "5:30 AM", activity: "Physical training session", icon: "🏃" },
    { time: "7:00 AM", activity: "Meditation & planning", icon: "🧘" },
    { time: "8:00 AM", activity: "High-protein breakfast", icon: "🍳" },
    { time: "10:00 PM", activity: "Technology shutdown", icon: "📖" },
    { time: "11:00 PM", activity: "Quality sleep begins", icon: "😴" }
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="min-h-screen bg-gotham-black relative">
      <Navigation />
      <MotionGraphics />
      
      <div className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              BAT-HEALTH PROTOCOL
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Take care of your body. It's the only place you have to live. Make it a fortress, not a weakness."
            </p>
          </div>

          {/* Health Data Tabs */}
          <Tabs defaultValue="protocols" className="mb-16" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 bg-gotham-gray">
              <TabsTrigger value="protocols" className="text-white data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black">Health Protocols</TabsTrigger>
              <TabsTrigger value="global" className="text-white data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black">Global Health</TabsTrigger>
              <TabsTrigger value="monitoring" className="text-white data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black">Health Monitor</TabsTrigger>
            </TabsList>

            <TabsContent value="protocols">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayHealthProtocols.map((protocol, index) => (
                    <div key={index} className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <WisdomCard
                        title={protocol.title}
                        quote={protocol.quote}
                        category={protocol.category}
                        icon={protocol.icon}
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="global">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {covidData && (
                  <>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">🦠 Global COVID Cases</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-white mb-2">{formatNumber(covidData.cases)}</p>
                        <p className="text-green-400 text-sm mb-1">Today: +{formatNumber(covidData.todayCases)}</p>
                        <p className="text-gray-400 text-sm">Total confirmed cases worldwide</p>
                        <p className="text-bat-yellow text-xs mt-2">Per Million: {formatNumber(covidData.casesPerOneMillion)}</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">💚 Recovered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-green-400 mb-2">{formatNumber(covidData.recovered)}</p>
                        <p className="text-green-300 text-sm mb-1">Today: +{formatNumber(covidData.todayRecovered)}</p>
                        <p className="text-gray-400 text-sm">Total recoveries worldwide</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">⚠️ Deaths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-red-400 mb-2">{formatNumber(covidData.deaths)}</p>
                        <p className="text-red-300 text-sm mb-1">Today: +{formatNumber(covidData.todayDeaths)}</p>
                        <p className="text-gray-400 text-sm">Total deaths worldwide</p>
                        <p className="text-bat-yellow text-xs mt-2">Per Million: {formatNumber(covidData.deathsPerOneMillion)}</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">🔴 Active Cases</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-orange-400 mb-2">{formatNumber(covidData.active)}</p>
                        <p className="text-gray-400 text-sm">Currently active cases</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">🏥 Critical</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-red-500 mb-2">{formatNumber(covidData.critical)}</p>
                        <p className="text-gray-400 text-sm">Critical condition</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">🌍 Countries Affected</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-blue-400 mb-2">{formatNumber(covidData.affectedCountries)}</p>
                        <p className="text-gray-400 text-sm">Countries with reported cases</p>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {whoHealthData && whoHealthData.value && whoHealthData.value.length > 0 && (
                  <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20 md:col-span-2 lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="text-bat-yellow font-batman">🌍 WHO Health Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {whoHealthData.value.slice(0, 6).map((stat, index) => (
                          <div key={index} className="bg-gotham-gray p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
                            <p className="text-gray-300 text-sm">{stat.SpatialDim}</p>
                            <p className="text-white font-bold">{stat.Value || stat.NumericValue}</p>
                            <p className="text-gray-400 text-xs">{stat.TimeDim}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="monitoring">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                  <CardHeader>
                    <CardTitle className="text-bat-yellow font-batman">📊 Optimal Daily Routine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailyRoutine.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gotham-gray rounded-lg transform transition-all duration-300 hover:scale-105">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <span className="font-batman font-bold text-bat-yellow text-sm">{item.time}</span>
                            <p className="text-gray-300">{item.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                  <CardHeader>
                    <CardTitle className="text-bat-yellow font-batman">🎯 Today's Health Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🔥</div>
                        <h3 className="font-batman font-bold text-xl text-white mb-2">
                          DAILY HEALTH MISSION
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {displayChallenge}
                        </p>
                        <div className="text-gray-400 text-sm">
                          "Every day you don't train, someone else is getting stronger. Don't let that someone be your competition."
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Health;
