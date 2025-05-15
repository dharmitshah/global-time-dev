
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import TimeZoneCard from '@/components/TimeZoneCard';
import Footer from '@/components/Footer';
import { Plane, Clock, ZZZ } from 'lucide-react';

const TimeZoneTravelPlanner = () => {
  const [departureTime, setDepartureTime] = useState<string>('');
  const [departureTimeZone, setDepartureTimeZone] = useState<string>('');
  const [arrivalTimeZone, setArrivalTimeZone] = useState<string>('');
  const [calculatedArrivalTime, setCalculatedArrivalTime] = useState<string>('');
  const [jetlagRecoveryDays, setJetlagRecoveryDays] = useState<number | null>(null);
  const [jetlagSeverity, setJetlagSeverity] = useState<string>('');
  const [travelerAge, setTravelerAge] = useState<string>('adult');
  const [travelDirection, setTravelDirection] = useState<string>('eastward');
  const { toast } = useToast();

  // We've removed the time zones fetch that was causing the error

  const calculateArrivalTime = () => {
    if (!departureTime || !departureTimeZone || !arrivalTimeZone) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Parse the departure time string into a Date object
      const departureDate = new Date(departureTime);
      
      // Check if the date is valid
      if (isNaN(departureDate.getTime())) {
        toast({
          title: "Error",
          description: "Invalid departure time format. Please use a valid date and time.",
          variant: "destructive",
        });
        return;
      }

      // Convert the departure time to UTC
      const departureUTCTime = fromZonedTime(departureDate, departureTimeZone);

      // Convert the UTC time to the arrival time zone
      const arrivalTime = toZonedTime(departureUTCTime, arrivalTimeZone);

      // Format the arrival time
      const formattedArrivalTime = format(arrivalTime, 'MMMM dd, yyyy hh:mm:ss a zzz');
      setCalculatedArrivalTime(formattedArrivalTime);

      // Calculate time zone difference to estimate jetlag
      calculateJetlag(departureTimeZone, arrivalTimeZone);

      toast({
        title: "Arrival Time Calculated",
        description: `Arrival time in ${arrivalTimeZone}: ${formattedArrivalTime}`,
      });
    } catch (error: any) {
      console.error("Error calculating arrival time:", error);
      toast({
        title: "Error",
        description: `Failed to calculate arrival time: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const calculateJetlag = (fromZone: string, toZone: string) => {
    try {
      // Get current date
      const now = new Date();
      
      // Get the current time in both zones
      const fromZoneDate = new Date(now.toLocaleString('en-US', { timeZone: fromZone }));
      const toZoneDate = new Date(now.toLocaleString('en-US', { timeZone: toZone }));
      
      // Calculate the raw time difference in hours
      let hourDifference = Math.round((toZoneDate.getTime() - fromZoneDate.getTime()) / (1000 * 60 * 60));
      
      // Adjust for day boundaries (e.g., if difference is more than 12 hours, it's actually shorter going the other way)
      if (hourDifference > 12) {
        hourDifference = hourDifference - 24;
      } else if (hourDifference < -12) {
        hourDifference = hourDifference + 24;
      }
      
      const absHourDifference = Math.abs(hourDifference);
      
      // Direction-based adjustment (eastward travel is typically harder on the body)
      const direction = hourDifference > 0 ? 'eastward' : 'westward';
      setTravelDirection(direction);
      
      // Calculate estimated recovery days (roughly 1 day per 1-2 time zones crossed)
      let recoveryDays = 0;
      
      if (absHourDifference <= 2) {
        recoveryDays = 1;
        setJetlagSeverity('minimal');
      } else if (absHourDifference <= 5) {
        recoveryDays = direction === 'eastward' ? Math.ceil(absHourDifference * 0.8) : Math.ceil(absHourDifference * 0.6);
        setJetlagSeverity('moderate');
      } else if (absHourDifference <= 8) {
        recoveryDays = direction === 'eastward' ? Math.ceil(absHourDifference * 0.9) : Math.ceil(absHourDifference * 0.7);
        setJetlagSeverity('significant');
      } else {
        recoveryDays = direction === 'eastward' ? Math.ceil(absHourDifference) : Math.ceil(absHourDifference * 0.8);
        setJetlagSeverity('severe');
      }
      
      // Age-based adjustment
      if (travelerAge === 'child') {
        recoveryDays = Math.max(1, Math.floor(recoveryDays * 0.8)); // Children adapt a bit faster
      } else if (travelerAge === 'senior') {
        recoveryDays = Math.ceil(recoveryDays * 1.5); // Seniors adapt slower
      }
      
      setJetlagRecoveryDays(recoveryDays);
    } catch (error) {
      console.error("Error calculating jetlag:", error);
      setJetlagRecoveryDays(null);
      setJetlagSeverity('');
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
              <ZZZ className="mr-2 h-4 w-4" /> 
              Jet Lag Estimator
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="travel-details">
            <Card className="border-slate-dark bg-navy-light">
              <CardHeader>
                <CardTitle className="text-xl text-slate-light">Travel Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="departure-time">Departure Time</Label>
                  <Input
                    type="datetime-local"
                    id="departure-time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="departure-timezone">Departure Time Zone</Label>
                  <Input
                    type="text"
                    id="departure-timezone"
                    placeholder="Enter departure time zone (e.g. America/New_York)"
                    value={departureTimeZone}
                    onChange={(e) => setDepartureTimeZone(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="arrival-timezone">Arrival Time Zone</Label>
                  <Input
                    type="text"
                    id="arrival-timezone"
                    placeholder="Enter arrival time zone (e.g. Europe/London)"
                    value={arrivalTimeZone}
                    onChange={(e) => setArrivalTimeZone(e.target.value)}
                  />
                </div>
                
                <Button className="bg-cyan hover:bg-cyan-dark text-navy font-medium" onClick={calculateArrivalTime}>
                  <Clock className="mr-2 h-4 w-4" />
                  Calculate Arrival Time
                </Button>
                
                {calculatedArrivalTime && (
                  <div className="mt-4">
                    <Separator className="my-4 bg-slate-dark" />
                    <h2 className="text-lg font-semibold text-slate-light">Calculated Arrival Time:</h2>
                    <p className="text-slate">{calculatedArrivalTime}</p>
                  </div>
                )}
              </CardContent>
            </Card>
        
            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6">
                <span className="text-cyan">&lt;</span> Time Zone Cards <span className="text-cyan">/&gt;</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departureTimeZone && (
                  <TimeZoneCard timeZone={departureTimeZone} />
                )}
                {arrivalTimeZone && (
                  <TimeZoneCard timeZone={arrivalTimeZone} />
                )}
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="jetlag">
            <Card className="border-slate-dark bg-navy-light">
              <CardHeader>
                <CardTitle className="text-xl text-slate-light">Jet Lag Estimator</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-slate">Estimate how long it will take to recover from jet lag when traveling between time zones.</p>
                
                <div className="grid gap-2">
                  <Label htmlFor="departure-timezone-jetlag">Departure Time Zone</Label>
                  <Input
                    type="text"
                    id="departure-timezone-jetlag"
                    placeholder="Enter departure time zone (e.g. America/New_York)"
                    value={departureTimeZone}
                    onChange={(e) => setDepartureTimeZone(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="arrival-timezone-jetlag">Arrival Time Zone</Label>
                  <Input
                    type="text"
                    id="arrival-timezone-jetlag"
                    placeholder="Enter arrival time zone (e.g. Europe/London)"
                    value={arrivalTimeZone}
                    onChange={(e) => setArrivalTimeZone(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="traveler-age">Traveler Age Group</Label>
                  <Select value={travelerAge} onValueChange={setTravelerAge}>
                    <SelectTrigger id="traveler-age">
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child (under 18)</SelectItem>
                      <SelectItem value="adult">Adult (18-65)</SelectItem>
                      <SelectItem value="senior">Senior (65+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
                  onClick={() => calculateJetlag(departureTimeZone, arrivalTimeZone)}
                >
                  <ZZZ className="mr-2 h-4 w-4" />
                  Calculate Jet Lag
                </Button>
                
                {jetlagRecoveryDays !== null && (
                  <div className="mt-4 p-4 bg-navy-dark rounded-md border border-slate-dark">
                    <h3 className="font-semibold text-cyan mb-2">Jet Lag Estimate</h3>
                    <div className="space-y-2">
                      <p className="text-slate flex items-center">
                        <span className="font-medium mr-2">Time zone difference:</span> 
                        {travelDirection === 'eastward' ? 'Eastward travel' : 'Westward travel'}
                      </p>
                      <p className="text-slate flex items-center">
                        <span className="font-medium mr-2">Severity:</span> 
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          jetlagSeverity === 'minimal' ? 'bg-green-900/20 text-green-500' : 
                          jetlagSeverity === 'moderate' ? 'bg-yellow-900/20 text-yellow-500' : 
                          jetlagSeverity === 'significant' ? 'bg-orange-900/20 text-orange-500' : 
                          'bg-red-900/20 text-red-500'
                        }`}>{jetlagSeverity}</span>
                      </p>
                      <p className="text-slate">
                        <span className="font-medium">Estimated recovery days:</span> 
                        <span className="text-cyan ml-2 font-semibold">{jetlagRecoveryDays} {jetlagRecoveryDays === 1 ? 'day' : 'days'}</span>
                      </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-navy rounded-md border border-slate-dark text-sm">
                      <h4 className="font-medium text-slate-light mb-1">Travel Tips:</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate text-xs">
                        <li>Adjust your sleep schedule a few days before travel</li>
                        <li>Stay hydrated during your flight</li>
                        <li>Try to adapt to local meal times immediately</li>
                        <li>{travelDirection === 'eastward' ? 'Eastward travel is typically harder to adjust to' : 'Westward travel is usually easier to adjust to'}</li>
                        <li>Spend time outdoors during daylight at your destination</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeZoneTravelPlanner;
