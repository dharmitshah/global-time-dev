
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, X, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TimeZoneSelector from './TimeZoneSelector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 17,  // 5 PM
};

const MeetingScheduler = () => {
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workingHours, setWorkingHours] = useState(WORKING_HOURS);
  const { toast } = useToast();
  
  useEffect(() => {
    // Try to load from URL params
    const params = new URLSearchParams(window.location.search);
    const tzParam = params.get('meeting-tz');
    
    if (tzParam) {
      try {
        const zones = tzParam.split(',');
        const validZones = zones.filter(zone => {
          try {
            Intl.DateTimeFormat('en-US', { timeZone: zone }).format(new Date());
            return true;
          } catch (e) {
            return false;
          }
        });
        
        if (validZones.length > 0) {
          setSelectedTimeZones(validZones);
        }
      } catch (e) {
        console.error("Error parsing timezones from URL", e);
      }
    }
  }, []);

  const handleAddTimeZone = (timeZone: string) => {
    if (selectedTimeZones.includes(timeZone)) {
      toast({
        title: "Already added",
        description: `${timeZone} is already in your list`,
      });
      return;
    }
    
    setSelectedTimeZones([...selectedTimeZones, timeZone]);
  };

  const handleRemoveTimeZone = (index: number) => {
    const newTimeZones = [...selectedTimeZones];
    newTimeZones.splice(index, 1);
    setSelectedTimeZones(newTimeZones);
  };
  
  const handleShareLink = () => {
    // Create URL with current time zones
    const url = new URL(window.location.href);
    url.searchParams.set('meeting-tz', selectedTimeZones.join(','));
    
    // Copy to clipboard
    navigator.clipboard.writeText(url.toString())
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Share this link with your team members",
        });
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
        toast({
          title: "Copy failed",
          description: "Could not copy link to clipboard",
          variant: "destructive",
        });
      });
  };

  // Generate hours for the schedule table (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Format hour for display (e.g., "05:00" or "17:00")
  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  
  // Check if time is within working hours for a timezone
  const isWorkingHour = (hour: number, timeZone: string) => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      timeZone,
      hour: 'numeric',
      hour12: false
    };
    
    // Get current hour in the timezone
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    const tzHour = parseInt(parts.find(part => part.type === 'hour')?.value || '0', 10);
    
    // Calculate the offset between local and timezone hours
    const offset = (tzHour - date.getHours() + 24) % 24;
    
    // Calculate the hour in the timezone
    const hourInTz = (hour + offset + 24) % 24;
    
    return hourInTz >= workingHours.start && hourInTz < workingHours.end;
  };
  
  // Function to determine the best meeting times
  const getBestMeetingTimes = () => {
    if (selectedTimeZones.length === 0) return [];
    
    // Count how many timezones have each hour as a working hour
    const hourScores = hours.map(hour => ({
      hour,
      score: selectedTimeZones.filter(tz => isWorkingHour(hour, tz)).length
    }));
    
    // Sort by score (highest first)
    return hourScores.sort((a, b) => b.score - a.score);
  };
  
  const bestTimes = getBestMeetingTimes();
  
  // Get the simplified name for a timezone (e.g., "Los_Angeles" from "America/Los_Angeles")
  const getSimplifiedName = (timeZone: string) => {
    const parts = timeZone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  };
  
  return (
    <Card className="border border-slate-dark bg-navy-light">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan" />
            Meeting Time Finder
          </CardTitle>
          
          {selectedTimeZones.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan"
              onClick={handleShareLink}
            >
              Share Schedule
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2 items-start">
            <TimeZoneSelector 
              onSelect={handleAddTimeZone} 
              selectedTimeZones={selectedTimeZones}
            />
            
            <div className="text-xs text-slate mt-1 sm:mt-2 ml-1">
              {selectedTimeZones.length === 0
                ? "Add team member timezones to find optimal meeting times"
                : `Showing ${selectedTimeZones.length} time zone${selectedTimeZones.length === 1 ? '' : 's'}`}
            </div>
          </div>
          
          {/* Display selected timezones as badges */}
          {selectedTimeZones.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTimeZones.map((zone, index) => (
                <Badge 
                  key={zone} 
                  variant="secondary"
                  className="flex items-center gap-1 bg-navy-dark px-3 py-1"
                >
                  <span>{getSimplifiedName(zone)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 text-slate p-0 hover:text-red-400 hover:bg-transparent"
                    onClick={() => handleRemoveTimeZone(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
          
          {selectedTimeZones.length > 0 ? (
            <div className="rounded-md border border-slate-dark overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px]">Hour (UTC)</TableHead>
                    {selectedTimeZones.map(zone => (
                      <TableHead key={zone} className="text-xs">
                        {getSimplifiedName(zone)}
                      </TableHead>
                    ))}
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bestTimes.slice(0, 12).map(({ hour, score }) => (
                    <TableRow 
                      key={hour} 
                      className={
                        score === selectedTimeZones.length 
                          ? "bg-green-900/20 hover:bg-green-900/30" 
                          : score >= selectedTimeZones.length / 2 
                            ? "bg-yellow-900/10 hover:bg-yellow-900/20"
                            : ""
                      }
                    >
                      <TableCell className="font-mono">{formatHour(hour)}</TableCell>
                      {selectedTimeZones.map(zone => (
                        <TableCell key={zone} className="text-center px-1">
                          {isWorkingHour(hour, zone) ? (
                            <span className="inline-block w-5 h-5 bg-green-700/30 rounded-full"></span>
                          ) : (
                            <span className="inline-block w-5 h-5 bg-red-700/30 rounded-full"></span>
                          )}
                        </TableCell>
                      ))}
                      <TableCell className="text-right">
                        <Badge variant={
                          score === selectedTimeZones.length 
                            ? "default" 
                            : score >= selectedTimeZones.length / 2 
                              ? "secondary" 
                              : "outline"
                        }>
                          {score}/{selectedTimeZones.length}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-slate">
              <div className="mb-2 text-4xl">👥</div>
              <p>No time zones selected</p>
              <p className="text-sm mt-1">Add team member time zones to find optimal meeting times</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingScheduler;
