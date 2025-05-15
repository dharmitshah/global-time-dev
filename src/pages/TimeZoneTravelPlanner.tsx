
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Clock, Moon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import TravelTimeCalculator from '@/components/TravelTimeCalculator';
import JetLagEstimator from '@/components/JetLagEstimator';
import { calculateJetlag } from '@/utils/timeZoneUtils';

const TimeZoneTravelPlanner = () => {
  const [departureTime, setDepartureTime] = useState<string>('');
  const [departureTimeZone, setDepartureTimeZone] = useState<string>('');
  const [arrivalTimeZone, setArrivalTimeZone] = useState<string>('');
  const [jetlagRecoveryDays, setJetlagRecoveryDays] = useState<number | null>(null);
  const [jetlagSeverity, setJetlagSeverity] = useState<string>('');
  const [travelerAge, setTravelerAge] = useState<string>('adult');
  const [travelDirection, setTravelDirection] = useState<string>('eastward');
  const { toast } = useToast();

  const handleCalculateJetlag = () => {
    try {
      if (!departureTimeZone || !arrivalTimeZone) {
        toast({
          title: "Error",
          description: "Please fill in both time zones.",
          variant: "destructive",
        });
        return;
      }

      const result = calculateJetlag(departureTimeZone, arrivalTimeZone, travelerAge);
      
      setJetlagRecoveryDays(result.recoveryDays);
      setJetlagSeverity(result.severity);
      setTravelDirection(result.travelDirection);
    } catch (error) {
      console.error("Error calculating jetlag:", error);
      setJetlagRecoveryDays(null);
      setJetlagSeverity('');
      
      toast({
        title: "Error",
        description: "Failed to calculate jet lag. Please check your time zones.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-1 container max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-slate-light flex items-center gap-2">
          <Plane className="h-7 w-7 text-cyan" />
          Time Zone Travel Planner
        </h1>
        <p className="text-slate mb-8">Calculate arrival times across different time zones for your journeys and estimate jet lag recovery time.</p>
        
        <Tabs defaultValue="travel-details">
          <TabsList className="mb-6">
            <TabsTrigger value="travel-details">
              <Clock className="mr-2 h-4 w-4" /> 
              Travel Time Calculator
            </TabsTrigger>
            <TabsTrigger value="jetlag">
              <Moon className="mr-2 h-4 w-4" /> 
              Jet Lag Estimator
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="travel-details">
            <TravelTimeCalculator 
              departureTime={departureTime}
              setDepartureTime={setDepartureTime}
              departureTimeZone={departureTimeZone}
              setDepartureTimeZone={setDepartureTimeZone}
              arrivalTimeZone={arrivalTimeZone}
              setArrivalTimeZone={setArrivalTimeZone}
              onCalculateJetlag={handleCalculateJetlag}
            />
          </TabsContent>
          
          <TabsContent value="jetlag">
            <JetLagEstimator 
              departureTimeZone={departureTimeZone}
              setDepartureTimeZone={setDepartureTimeZone}
              arrivalTimeZone={arrivalTimeZone}
              setArrivalTimeZone={setArrivalTimeZone}
              travelerAge={travelerAge}
              setTravelerAge={setTravelerAge}
              jetlagRecoveryDays={jetlagRecoveryDays}
              jetlagSeverity={jetlagSeverity}
              travelDirection={travelDirection}
              onCalculateJetlag={handleCalculateJetlag}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeZoneTravelPlanner;
