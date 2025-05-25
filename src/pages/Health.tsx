
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import WisdomCard from '../components/WisdomCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { fetchBatmanWisdom, parseHealthProtocols } from '../utils/batmanWisdom';
import { toast } from "sonner";

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

interface NutritionData {
  product?: {
    product_name?: string;
    nutrition_grades?: string;
    ecoscore_grade?: string;
    nova_group?: number;
    nutriscore_data?: {
      energy?: number;
      fiber?: number;
      proteins?: number;
      salt?: number;
      saturated_fat?: number;
      sodium?: number;
      sugars?: number;
    };
  };
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
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);

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

  const fetchNutritionData = async () => {
    try {
      // Sample product barcode - you can make this dynamic
      const response = await fetch('https://world.openfoodfacts.org/api/v0/product/3017620422003.json');
      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  useEffect(() => {
    fetchHealthContent();
    fetchCovidData();
    fetchWHOData();
    fetchNutritionData();
    
    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchHealthContent();
      fetchCovidData();
      fetchWHOData();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Enhanced health protocols with 10 unique cards
  const defaultHealthProtocols = [
    {
      title: "Physical Foundation",
      quote: "A strong mind needs a strong body. Train daily. Push beyond your limits. Your body is your primary weapon.",
      category: "Fitness",
      icon: "💪"
    },
    {
      title: "Recovery Protocols",
      quote: "Even Batman sleeps. Your body repairs itself in rest. 7-8 hours of quality sleep is non-negotiable.",
      category: "Recovery",
      icon: "😴"
    },
    {
      title: "Mental Discipline",
      quote: "Control your thoughts, control your life. Meditation isn't weakness—it's mental armor against chaos.",
      category: "Mental Health",
      icon: "🧠"
    },
    {
      title: "Nutrition as Fuel",
      quote: "Fuel your body like the machine it is. Clean food, clean mind, clean performance. You are what you eat.",
      category: "Diet",
      icon: "🥗"
    },
    {
      title: "Cardiovascular Mastery",
      quote: "Your heart is your engine. Cardio training builds the endurance to outlast any enemy, including yourself.",
      category: "Cardio",
      icon: "❤️"
    },
    {
      title: "Strength Building",
      quote: "Strength isn't just physical. Every rep builds mental resilience. Lift weights to lift your spirit.",
      category: "Strength",
      icon: "🏋️"
    },
    {
      title: "Flexibility & Mobility",
      quote: "A flexible body houses a flexible mind. Stretch your muscles and stretch your limits.",
      category: "Mobility",
      icon: "🤸"
    },
    {
      title: "Stress Management",
      quote: "Stress is inevitable. How you handle it defines you. Breathe through the chaos, think through the pressure.",
      category: "Stress Relief",
      icon: "🕯️"
    },
    {
      title: "Hydration Protocol",
      quote: "Water is life. Dehydration clouds judgment and weakens resolve. Drink like your mission depends on it.",
      category: "Hydration",
      icon: "💧"
    },
    {
      title: "Injury Prevention",
      quote: "The best injury is the one that never happens. Warm up properly, cool down completely, listen to your body.",
      category: "Prevention",
      icon: "🛡️"
    }
  ];

  const displayHealthProtocols = healthProtocols.length > 0 ? healthProtocols : defaultHealthProtocols;
  const displayChallenge = dailyChallenge || "Complete 100 push-ups today. Break them into sets throughout the day. Your future self will thank you for every single rep.";

  const dailyRoutine = [
    { time: "5:00 AM", activity: "Wake up, no snooze", icon: "⏰" },
    { time: "5:30 AM", activity: "Physical training", icon: "🏃" },
    { time: "7:00 AM", activity: "Meditation/Planning", icon: "🧘" },
    { time: "8:00 AM", activity: "Nutritious breakfast", icon: "🍳" },
    { time: "10:00 PM", activity: "Wind down routine", icon: "📖" },
    { time: "11:00 PM", activity: "Sleep (no devices)", icon: "😴" }
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              BAT-HEALTH PROTOCOL
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Your body is your temple. Your mind is your weapon. Train both with equal dedication."
            </p>
          </div>

          {/* Health Data Tabs */}
          <Tabs defaultValue="protocols" className="mb-16">
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
                
                {nutritionData?.product && (
                  <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20 md:col-span-2 lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="text-bat-yellow font-batman">🥗 Nutrition Analysis Sample</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-gotham-gray p-4 rounded-lg">
                          <p className="text-gray-300 text-sm">Product</p>
                          <p className="text-white font-bold text-sm">{nutritionData.product.product_name || 'Unknown'}</p>
                        </div>
                        <div className="bg-gotham-gray p-4 rounded-lg">
                          <p className="text-gray-300 text-sm">Nutrition Grade</p>
                          <p className="text-bat-yellow font-bold text-xl">{nutritionData.product.nutrition_grades?.toUpperCase() || 'N/A'}</p>
                        </div>
                        <div className="bg-gotham-gray p-4 rounded-lg">
                          <p className="text-gray-300 text-sm">Eco Score</p>
                          <p className="text-green-400 font-bold text-xl">{nutritionData.product.ecoscore_grade?.toUpperCase() || 'N/A'}</p>
                        </div>
                        <div className="bg-gotham-gray p-4 rounded-lg">
                          <p className="text-gray-300 text-sm">Processing Level</p>
                          <p className="text-orange-400 font-bold text-xl">Nova {nutritionData.product.nova_group || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                    <CardTitle className="text-bat-yellow font-batman">📊 Daily Routine</CardTitle>
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
                    <CardTitle className="text-bat-yellow font-batman">🎯 Gotham Strength Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🔥</div>
                        <h3 className="font-batman font-bold text-xl text-white mb-2">
                          DAILY PROTOCOL
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {displayChallenge}
                        </p>
                        <div className="text-gray-400 text-sm">
                          "Discipline is choosing between what you want now and what you want most."
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
