
import React from 'react';
import Navigation from '../components/Navigation';
import MissionSection from '../components/missions/MissionSection';
import MissionProtocol from '../components/missions/MissionProtocol';
import { dailyMissions, weeklyMissions, monthlyMissions } from '../data/missionsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';

const Missions = () => {
  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              GOTHAM MISSIONS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Excellence isn't an act, but a habit. These missions will forge you into the person Gotham—and the world—needs."
            </p>
          </div>

          {/* Mission Tabs */}
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gotham-gray/20 mb-8">
              <TabsTrigger 
                value="daily" 
                className="font-batman font-bold text-sm data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black"
              >
                DAILY MISSIONS
              </TabsTrigger>
              <TabsTrigger 
                value="weekly" 
                className="font-batman font-bold text-sm data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black"
              >
                WEEKLY MISSIONS
              </TabsTrigger>
              <TabsTrigger 
                value="monthly" 
                className="font-batman font-bold text-sm data-[state=active]:bg-bat-yellow data-[state=active]:text-gotham-black"
              >
                MONTHLY MISSIONS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="mt-0">
              <ScrollArea className="h-auto">
                <MissionSection 
                  title="DAILY MISSIONS"
                  missions={dailyMissions}
                  inspirationalText="Daily excellence creates lifetime legends"
                  gridCols="md:grid-cols-2 lg:grid-cols-3"
                />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="weekly" className="mt-0">
              <ScrollArea className="h-auto">
                <MissionSection 
                  title="WEEKLY MISSIONS"
                  missions={weeklyMissions}
                  inspirationalText="Weekly consistency builds monthly momentum"
                  gridCols="md:grid-cols-2"
                />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="monthly" className="mt-0">
              <ScrollArea className="h-auto">
                <MissionSection 
                  title="MONTHLY MISSIONS"
                  missions={monthlyMissions}
                  inspirationalText="Monthly transformations create yearly revolutions"
                  gridCols="md:grid-cols-2"
                />
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Motivational Footer */}
          <div className="mt-16">
            <MissionProtocol />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
