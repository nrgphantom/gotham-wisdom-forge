
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
}

interface ClinicalTrial {
  protocolSection: {
    identificationModule: {
      briefTitle: string;
      officialTitle?: string;
    };
    statusModule: {
      overallStatus: string;
    };
    designModule?: {
      studyType: string;
    };
  };
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
  const [clinicalTrials, setClinicalTrials] = useState<ClinicalTrial[]>([]);
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

  const fetchClinicalTrials = async () => {
    try {
      const response = await fetch('https://clinicaltrials.gov/api/v2/studies?query.cond=Health&countTotal=true&pageSize=5&format=json');
      const data = await response.json();
      setClinicalTrials(data.studies || []);
    } catch (error) {
      console.error("Error fetching clinical trials:", error);
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

  useEffect(() => {
    fetchHealthContent();
    fetchCovidData();
    fetchClinicalTrials();
    fetchWHOData();
    
    // Set up content refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchHealthContent();
      fetchCovidData();
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
            <TabsList className="grid w-full grid-cols-4 bg-gotham-gray">
              <TabsTrigger value="protocols" className="text-white data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black">Health Protocols</TabsTrigger>
              <TabsTrigger value="global" className="text-white data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black">Global Health</TabsTrigger>
              <TabsTrigger value="research" className="text-white data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black">Research</TabsTrigger>
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
                    <div key={index} className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
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
                        <p className="text-gray-400 text-sm">Total confirmed cases worldwide</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">💚 Recovered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-green-400 mb-2">{formatNumber(covidData.recovered)}</p>
                        <p className="text-gray-400 text-sm">Total recoveries worldwide</p>
                      </CardContent>
                    </Card>
                    <Card className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                      <CardHeader>
                        <CardTitle className="text-bat-yellow font-batman">⚠️ Deaths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-red-400 mb-2">{formatNumber(covidData.deaths)}</p>
                        <p className="text-gray-400 text-sm">Total deaths worldwide</p>
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
                          <div key={index} className="bg-gotham-gray p-4 rounded-lg">
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

            <TabsContent value="research">
              <div className="grid gap-6">
                <h3 className="text-2xl font-batman text-bat-yellow mb-4">🔬 Latest Clinical Trials</h3>
                {clinicalTrials.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {clinicalTrials.slice(0, 4).map((trial, index) => (
                      <Card key={index} className="gotham-card transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-bat-yellow/20">
                        <CardHeader>
                          <CardTitle className="text-bat-yellow font-batman text-lg">
                            {trial.protocolSection.identificationModule.briefTitle}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-gray-300 text-sm">
                              <span className="text-bat-yellow">Status:</span> {trial.protocolSection.statusModule.overallStatus}
                            </p>
                            {trial.protocolSection.designModule && (
                              <p className="text-gray-300 text-sm">
                                <span className="text-bat-yellow">Type:</span> {trial.protocolSection.designModule.studyType}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="gotham-card">
                    <CardContent className="p-6">
                      <p className="text-gray-400">Loading clinical trials data...</p>
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
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gotham-gray rounded-lg">
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
