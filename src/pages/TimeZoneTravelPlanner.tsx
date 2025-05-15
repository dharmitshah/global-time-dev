
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeZoneSelector from '@/components/TimeZoneSelector';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const TimeZoneTravelPlanner = () => {
  const [departureZone, setDepartureZone] = useState('UTC');
  const [destinationZone, setDestinationZone] = useState('America/New_York');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [flightHours, setFlightHours] = useState(8);
  const [jetlagDays, setJetlagDays] = useState(3);

  const calculateRecoveryDays = () => {
    const departure = new Date(departureDate);
    const hourDiff = getTimezoneOffsetHours(destinationZone) - getTimezoneOffsetHours(departureZone);
    const absoluteHourDiff = Math.abs(hourDiff);
    
    // Common rule: 1 day of recovery per 1-2 timezone hours crossed
    return Math.ceil(absoluteHourDiff / 2);
  };

  const getTimezoneOffsetHours = (timezone: string) => {
    // This is a simplified calculation
    const now = new Date();
    const tzString = now.toLocaleString('en-US', { timeZone: timezone });
    const tzDate = new Date(tzString);
    const hoursDiff = (tzDate.getHours() - now.getUTCHours()) % 24;
    return hoursDiff < -12 ? hoursDiff + 24 : (hoursDiff > 12 ? hoursDiff - 24 : hoursDiff);
  };

  const handlePlanTrip = () => {
    const recoveryDays = calculateRecoveryDays();
    toast({
      title: "Trip Plan Created",
      description: `Allow ${recoveryDays} days to adjust to the new time zone.`,
    });
  };

  const getJetlagSeverity = () => {
    const hourDiff = Math.abs(getTimezoneOffsetHours(destinationZone) - getTimezoneOffsetHours(departureZone));
    if (hourDiff <= 3) return "Mild";
    if (hourDiff <= 6) return "Moderate";
    return "Severe";
  };

  const getTravelDirection = () => {
    const hourDiff = getTimezoneOffsetHours(destinationZone) - getTimezoneOffsetHours(departureZone);
    if (hourDiff > 0) return "East";
    if (hourDiff < 0) return "West";
    return "Same timezone";
  };

  const getSleepTips = () => {
    const direction = getTravelDirection();
    if (direction === "East") return "Try sleeping earlier a few days before your trip";
    if (direction === "West") return "Try staying awake longer a few days before your trip";
    return "No adjustment needed";
  };

  return (
    <div className="min-h-screen bg-navy py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-cyan" />
              <h1 className="text-xl font-bold tracking-tight">DevTimeZone</h1>
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate">Time Zone Travel Planner</span>
              <Plane className="h-4 w-4 text-cyan" />
            </div>
          </div>
          <Separator className="my-4 bg-slate-dark" />
          <h1 className="text-3xl font-bold mb-2">Time Zone Travel Planner</h1>
          <p className="text-slate-light">Plan your travel across time zones and minimize jet lag</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-navy-dark border-slate-dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-cyan" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2">Departure Location</label>
                    <TimeZoneSelector
                      value={departureZone}
                      onChange={zone => setDepartureZone(zone)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Destination Location</label>
                    <TimeZoneSelector
                      value={destinationZone}
                      onChange={zone => setDestinationZone(zone)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Departure Date</label>
                    <input
                      type="date"
                      className="w-full bg-navy rounded-md border border-slate-dark p-2"
                      value={departureDate.toISOString().split('T')[0]}
                      onChange={(e) => setDepartureDate(new Date(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Flight Duration (hours): {flightHours}</label>
                    <Slider
                      value={[flightHours]}
                      min={1}
                      max={24}
                      step={1}
                      onValueChange={(value) => setFlightHours(value[0])}
                    />
                  </div>
                </div>
                
                <Separator className="my-6 bg-slate-dark" />
                
                <Button onClick={handlePlanTrip} className="w-full bg-cyan hover:bg-cyan-dark text-navy">
                  Generate Travel Plan
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Tabs defaultValue="jetlag">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="jetlag">Jet Lag</TabsTrigger>
                <TabsTrigger value="tips">Travel Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="jetlag">
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>Jet Lag Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Time Zone Difference</span>
                        <span className="text-cyan font-mono">
                          {Math.abs(getTimezoneOffsetHours(destinationZone) - getTimezoneOffsetHours(departureZone))} hours
                        </span>
                      </div>
                      <Progress value={Math.abs(getTimezoneOffsetHours(destinationZone) - getTimezoneOffsetHours(departureZone)) * (100/24)} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Expected Recovery Time</span>
                        <span className="text-cyan font-mono">{calculateRecoveryDays()} days</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Jet Lag Severity</span>
                        <span className={`font-mono ${getJetlagSeverity() === "Severe" ? "text-red-400" : 
                                            getJetlagSeverity() === "Moderate" ? "text-yellow-400" : 
                                            "text-green-400"}`}>
                          {getJetlagSeverity()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Travel Direction</span>
                        <span className="text-cyan font-mono">{getTravelDirection()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tips">
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>Travel Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Before Your Trip</h3>
                      <p className="text-sm text-slate-light">{getSleepTips()}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">During Your Flight</h3>
                      <p className="text-sm text-slate-light">
                        {flightHours > 8 
                          ? "Try to sleep according to the destination time zone" 
                          : "Stay hydrated and avoid alcohol for better recovery"}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Upon Arrival</h3>
                      <p className="text-sm text-slate-light">
                        Spend time in natural light during daytime hours at your destination
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Adjustment Period</h3>
                      <p className="text-sm text-slate-light">
                        Allow {calculateRecoveryDays()} days to fully adjust to the new time zone
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneTravelPlanner;
