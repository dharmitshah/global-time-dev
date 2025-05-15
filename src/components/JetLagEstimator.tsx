
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Moon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TimeZoneSelector from '@/components/TimeZoneSelector';
import { JetlagResult } from '@/utils/timeZoneUtils';

interface JetLagEstimatorProps {
  departureTimeZone: string;
  setDepartureTimeZone: (zone: string) => void;
  arrivalTimeZone: string;
  setArrivalTimeZone: (zone: string) => void;
  travelerAge: string;
  setTravelerAge: (age: string) => void;
  jetlagRecoveryDays: number | null;
  jetlagSeverity: string;
  travelDirection: string;
  onCalculateJetlag: () => void;
}

const JetLagEstimator: React.FC<JetLagEstimatorProps> = ({
  departureTimeZone,
  setDepartureTimeZone,
  arrivalTimeZone,
  setArrivalTimeZone,
  travelerAge,
  setTravelerAge,
  jetlagRecoveryDays,
  jetlagSeverity,
  travelDirection,
  onCalculateJetlag
}) => {
  return (
    <Card className="border-slate-dark bg-navy-light">
      <CardHeader>
        <CardTitle className="text-xl text-slate-light">Jet Lag Estimator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-slate">Estimate how long it will take to recover from jet lag when traveling between time zones.</p>
        
        <div className="grid gap-2">
          <Label htmlFor="departure-timezone-jetlag">Departure Time Zone</Label>
          <TimeZoneSelector 
            value={departureTimeZone}
            onChange={setDepartureTimeZone}
            selectedTimeZones={arrivalTimeZone ? [arrivalTimeZone] : []}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="arrival-timezone-jetlag">Arrival Time Zone</Label>
          <TimeZoneSelector 
            value={arrivalTimeZone}
            onChange={setArrivalTimeZone}
            selectedTimeZones={departureTimeZone ? [departureTimeZone] : []}
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
          onClick={onCalculateJetlag}
        >
          <Moon className="mr-2 h-4 w-4" />
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
  );
};

export default JetLagEstimator;
