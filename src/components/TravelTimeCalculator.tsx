
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TimeZoneCard from '@/components/TimeZoneCard';
import { calculateArrivalTime } from '@/utils/timeZoneUtils';

interface TravelTimeCalculatorProps {
  departureTime: string;
  setDepartureTime: (time: string) => void;
  departureTimeZone: string;
  setDepartureTimeZone: (zone: string) => void;
  arrivalTimeZone: string;
  setArrivalTimeZone: (zone: string) => void;
  onCalculateJetlag: () => void;
}

const TravelTimeCalculator: React.FC<TravelTimeCalculatorProps> = ({
  departureTime,
  setDepartureTime,
  departureTimeZone,
  setDepartureTimeZone,
  arrivalTimeZone,
  setArrivalTimeZone,
  onCalculateJetlag
}) => {
  const [calculatedArrivalTime, setCalculatedArrivalTime] = useState<string>('');
  const { toast } = useToast();

  const handleCalculateArrivalTime = () => {
    if (!departureTime || !departureTimeZone || !arrivalTimeZone) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formattedArrivalTime = calculateArrivalTime(
        departureTime,
        departureTimeZone,
        arrivalTimeZone
      );
      
      setCalculatedArrivalTime(formattedArrivalTime);
      
      // Calculate jetlag as well
      onCalculateJetlag();

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
    <div>
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
          
          <Button 
            className="bg-cyan hover:bg-cyan-dark text-navy font-medium" 
            onClick={handleCalculateArrivalTime}
          >
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
    </div>
  );
};

export default TravelTimeCalculator;
