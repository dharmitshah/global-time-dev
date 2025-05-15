
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import TimeZoneCard from '@/components/TimeZoneCard';
import Footer from '@/components/Footer';
import { Plane, Clock } from 'lucide-react';

const TimeZoneTravelPlanner = () => {
  const [departureTime, setDepartureTime] = useState<string>('');
  const [departureTimeZone, setDepartureTimeZone] = useState<string>('');
  const [arrivalTimeZone, setArrivalTimeZone] = useState<string>('');
  const [calculatedArrivalTime, setCalculatedArrivalTime] = useState<string>('');
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
      const departureUTCTime = zonedTimeToUtc(departureDate, departureTimeZone);

      // Convert the UTC time to the arrival time zone
      const arrivalTime = utcToZonedTime(departureUTCTime, arrivalTimeZone);

      // Format the arrival time
      const formattedArrivalTime = format(arrivalTime, 'MMMM dd, yyyy hh:mm:ss a zzz');
      setCalculatedArrivalTime(formattedArrivalTime);

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

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-1 container max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-slate-light flex items-center gap-2">
          <Plane className="h-7 w-7 text-cyan" />
          Time Zone Travel Planner
        </h1>
        <p className="text-slate mb-8">Calculate arrival times across different time zones for your journeys.</p>
        
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
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeZoneTravelPlanner;
