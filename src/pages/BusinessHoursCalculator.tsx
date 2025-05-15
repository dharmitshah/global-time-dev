
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TimeZoneSelector from '@/components/TimeZoneSelector';
import { useToast } from '@/hooks/use-toast';
import { format, addHours } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type BusinessHours = {
  start: number; // in hours (0-23)
  end: number; // in hours (0-23)
};

type Region = {
  name: string;
  timeZone: string;
  businessHours: BusinessHours;
  color: string;
};

const BusinessHoursCalculator = () => {
  const { toast } = useToast();
  const [regions, setRegions] = useState<Region[]>([
    { name: 'New York', timeZone: 'America/New_York', businessHours: { start: 9, end: 17 }, color: 'bg-blue-500' },
    { name: 'London', timeZone: 'Europe/London', businessHours: { start: 9, end: 17 }, color: 'bg-green-500' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo', businessHours: { start: 9, end: 17 }, color: 'bg-red-500' },
  ]);
  
  const [newRegion, setNewRegion] = useState<Partial<Region>>({
    name: '',
    timeZone: 'UTC',
    businessHours: { start: 9, end: 17 }
  });
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [overlapHours, setOverlapHours] = useState<{start: Date, end: Date, regions: string[]}[]>([]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    calculateOverlapHours();
  }, [regions, currentTime]);
  
  const formatTimeForTimeZone = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone
    }).format(date);
  };
  
  const addRegion = () => {
    if (!newRegion.name || !newRegion.timeZone) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and time zone for the region.",
        variant: "destructive"
      });
      return;
    }
    
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setRegions([...regions, {
      name: newRegion.name,
      timeZone: newRegion.timeZone,
      businessHours: newRegion.businessHours || { start: 9, end: 17 },
      color: randomColor
    }]);
    
    setNewRegion({
      name: '',
      timeZone: 'UTC',
      businessHours: { start: 9, end: 17 }
    });
    
    toast({
      title: "Region Added",
      description: `${newRegion.name} has been added to the calculator.`
    });
  };
  
  const removeRegion = (index: number) => {
    const newRegions = [...regions];
    newRegions.splice(index, 1);
    setRegions(newRegions);
  };
  
  const isBusinessHour = (region: Region, hour: number): boolean => {
    try {
      const now = new Date();
      const regionTime = new Date(now.toLocaleString('en-US', { timeZone: region.timeZone }));
      const regionHour = regionTime.getHours();
      
      return regionHour >= region.businessHours.start && regionHour < region.businessHours.end;
    } catch (error) {
      console.error(`Error calculating business hours for ${region.name}:`, error);
      return false;
    }
  };
  
  const calculateOverlapHours = () => {
    if (regions.length < 2) {
      setOverlapHours([]);
      return;
    }
    
    // This is a simplified calculation that can be improved
    const overlaps: {start: Date, end: Date, regions: string[]}[] = [];
    
    // Check 24-hour period
    for (let hour = 0; hour < 24; hour++) {
      const regionsActive: string[] = [];
      
      regions.forEach(region => {
        // Convert current time to each region's time
        const now = new Date();
        const baseDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const testTime = addHours(baseDate, hour);
        const regionDate = new Date(testTime.toLocaleString('en-US', { timeZone: region.timeZone }));
        const regionHour = regionDate.getHours();
        
        if (regionHour >= region.businessHours.start && regionHour < region.businessHours.end) {
          regionsActive.push(region.name);
        }
      });
      
      if (regionsActive.length === regions.length) {
        const startTime = addHours(new Date(currentTime), hour);
        const endTime = addHours(new Date(currentTime), hour + 1);
        overlaps.push({
          start: startTime,
          end: endTime,
          regions: regionsActive
        });
      }
    }
    
    setOverlapHours(overlaps);
  };
  
  const handleBusinessHoursChange = (index: number, field: 'start' | 'end', value: number) => {
    const updatedRegions = [...regions];
    updatedRegions[index].businessHours[field] = value;
    setRegions(updatedRegions);
  };
  
  const getCurrentTimeInRegion = (timeZone: string) => {
    return formatTimeForTimeZone(currentTime, timeZone);
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
              <span className="hidden sm:inline text-sm text-slate">Business Hours Calculator</span>
              <Building2 className="h-4 w-4 text-cyan" />
            </div>
          </div>
          <Separator className="my-4 bg-slate-dark" />
          <h1 className="text-3xl font-bold mb-2">Business Hours Calculator</h1>
          <p className="text-slate-light">Find overlapping working hours across global teams and businesses</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="regions">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="regions">Business Regions</TabsTrigger>
                <TabsTrigger value="overlap">Overlap Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="regions">
                <Card className="bg-navy-dark border-slate-dark mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-cyan" />
                      Add New Business Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm mb-2">Region Name</label>
                        <input
                          type="text"
                          className="w-full bg-navy rounded-md border border-slate-dark p-2"
                          placeholder="e.g. San Francisco Office"
                          value={newRegion.name}
                          onChange={(e) => setNewRegion({...newRegion, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Time Zone</label>
                        <TimeZoneSelector
                          selectedTimeZones={regions.map(r => r.timeZone)}
                          onSelect={(zone) => setNewRegion({...newRegion, timeZone: zone})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Business Hours Start</label>
                        <select
                          className="w-full bg-navy rounded-md border border-slate-dark p-2"
                          value={newRegion.businessHours?.start || 9}
                          onChange={(e) => setNewRegion({
                            ...newRegion,
                            businessHours: {
                              ...(newRegion.businessHours || {start: 9, end: 17}),
                              start: parseInt(e.target.value)
                            }
                          })}
                        >
                          {Array.from({length: 24}, (_, i) => i).map((hour) => (
                            <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Business Hours End</label>
                        <select
                          className="w-full bg-navy rounded-md border border-slate-dark p-2"
                          value={newRegion.businessHours?.end || 17}
                          onChange={(e) => setNewRegion({
                            ...newRegion,
                            businessHours: {
                              ...(newRegion.businessHours || {start: 9, end: 17}),
                              end: parseInt(e.target.value)
                            }
                          })}
                        >
                          {Array.from({length: 24}, (_, i) => i).map((hour) => (
                            <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <Button onClick={addRegion} className="w-full bg-cyan hover:bg-cyan-dark text-navy">
                      Add Business Region
                    </Button>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  {regions.map((region, index) => (
                    <Card key={index} className="bg-navy-dark border-slate-dark">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${region.color}`}></span>
                            {region.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {getCurrentTimeInRegion(region.timeZone)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Time Zone:</span>
                              <span className="text-cyan font-mono">{region.timeZone.replace('_', ' ')}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Business Hours:</span>
                              <div className="flex items-center gap-1">
                                <select
                                  className="bg-navy rounded-md border border-slate-dark p-1 text-sm w-16"
                                  value={region.businessHours.start}
                                  onChange={(e) => handleBusinessHoursChange(index, 'start', parseInt(e.target.value))}
                                >
                                  {Array.from({length: 24}, (_, i) => i).map((hour) => (
                                    <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                                  ))}
                                </select>
                                <span>to</span>
                                <select
                                  className="bg-navy rounded-md border border-slate-dark p-1 text-sm w-16"
                                  value={region.businessHours.end}
                                  onChange={(e) => handleBusinessHoursChange(index, 'end', parseInt(e.target.value))}
                                >
                                  {Array.from({length: 24}, (_, i) => i).map((hour) => (
                                    <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Status:</span>
                              {isBusinessHour(region, new Date().getHours()) ? (
                                <Badge className="bg-green-500 text-navy">Open</Badge>
                              ) : (
                                <Badge variant="secondary">Closed</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeRegion(index)}
                            className="text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {regions.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-slate-dark rounded-md">
                      <p className="text-slate">No business regions added yet. Add your first region above.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="overlap">
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>Overlapping Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {overlapHours.length > 0 ? (
                      <div className="space-y-4">
                        {overlapHours.map((overlap, index) => (
                          <div key={index} className="p-3 border border-green-500/30 bg-green-500/10 rounded-md">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {overlap.regions.map(region => {
                                const regionData = regions.find(r => r.name === region);
                                return (
                                  <Badge key={region} className={`${regionData?.color} text-navy`}>
                                    {region}
                                  </Badge>
                                );
                              })}
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-mono text-green-400">{format(overlap.start, 'HH:mm')} - {format(overlap.end, 'HH:mm')} UTC</span>
                              <span className="text-slate-light">{format(overlap.start, 'EEE, MMM d')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 border border-dashed border-slate-dark rounded-md">
                        <p className="text-slate">
                          {regions.length < 2 
                            ? "Add at least two regions to find overlapping business hours."
                            : "No overlapping business hours found between these regions."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-navy-dark border-slate-dark">
              <CardHeader>
                <CardTitle>Business Hours Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {regions.length > 0 ? (
                    <>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Total Regions</span>
                        <span className="font-mono text-cyan">{regions.length}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-2">
                        <span>Currently Open</span>
                        <span className="font-mono text-cyan">
                          {regions.filter(r => isBusinessHour(r, new Date().getHours())).length}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Overlap Windows</span>
                        <span className="font-mono text-cyan">{overlapHours.length}</span>
                      </div>
                      
                      <Separator className="my-3 bg-slate-dark" />
                      
                      <div className="text-sm font-semibold mb-2">Current Time by Region</div>
                      <div className="space-y-2">
                        {regions.map((region, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${region.color}`}></span>
                              <span>{region.name}</span>
                            </div>
                            <span className="font-mono text-slate-light">{getCurrentTimeInRegion(region.timeZone)}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-slate text-center">Add business regions to see summary</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-navy-dark border-slate-dark">
              <CardHeader>
                <CardTitle>Tips for Global Teams</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>
                  For teams spanning multiple time zones, consider these practices:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-light">
                  <li>Schedule recurring meetings during overlap hours</li>
                  <li>Use asynchronous communication tools for non-urgent matters</li>
                  <li>Record important meetings for team members who can't attend</li>
                  <li>Rotate meeting times to share the burden of odd hours</li>
                  <li>Clearly document decisions and action items</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHoursCalculator;
