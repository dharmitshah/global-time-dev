import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, X, Users, Share2, CalendarClock, Info, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TimeZoneSelector from './TimeZoneSelector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { format, addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz'; // This import is fine as is

// Default working hours (9 AM to 5 PM)
const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 17,  // 5 PM
};

const MeetingScheduler = () => {
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workingHours, setWorkingHours] = useState(WORKING_HOURS);
  const [showAllHours, setShowAllHours] = useState(false);
  const [selectedMeetingTime, setSelectedMeetingTime] = useState<{hour: number, date: Date} | null>(null);
  const { toast } = useToast();
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
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
    
    toast({
      title: "Time zone added",
      description: `${getSimplifiedName(timeZone)} has been added to your scheduler`,
    });
  };

  const handleRemoveTimeZone = (index: number) => {
    const newTimeZones = [...selectedTimeZones];
    const removed = newTimeZones.splice(index, 1)[0];
    setSelectedTimeZones(newTimeZones);
    
    toast({
      title: "Time zone removed",
      description: `${getSimplifiedName(removed)} has been removed from your scheduler`,
    });
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

  const updateWorkingHours = (type: 'start' | 'end', value: string) => {
    const numValue = parseInt(value, 10);
    setWorkingHours(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  // Generate hours for the schedule table (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Format hour for display (e.g., "05:00" or "17:00")
  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  
  // Format hour for display with AM/PM
  const formatHourAMPM = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
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

  // Get the city and current time for a timezone
  const getTimeZoneInfo = (timeZone: string) => {
    const now = new Date();
    // No need to change this as formatInTimeZone still works the same way
    const timeString = formatInTimeZone(now, timeZone, 'h:mm a');
    const dateString = formatInTimeZone(now, timeZone, 'EEE, MMM d');
    
    return { 
      city: getSimplifiedName(timeZone),
      currentTime: timeString,
      currentDate: dateString
    };
  };
  
  // Get the meeting time in a specific timezone
  const getMeetingTimeInZone = (utcHour: number, timeZone: string) => {
    if (!selectedMeetingTime) return "";
    
    // Create a date for tomorrow at the selected UTC hour
    const meetingDate = new Date();
    meetingDate.setUTCHours(utcHour, 0, 0, 0);
    
    // Use formatInTimeZone to get the time in the target timezone
    return formatInTimeZone(meetingDate, timeZone, 'h:mm a');
  };
  
  // Handle selecting a meeting time
  const handleSelectMeetingTime = (hour: number) => {
    // Create a date for tomorrow at this hour (UTC)
    const meetingDate = new Date();
    meetingDate.setDate(meetingDate.getDate() + 1); // Tomorrow
    meetingDate.setUTCHours(hour, 0, 0, 0);
    
    setSelectedMeetingTime({
      hour,
      date: meetingDate
    });
    
    toast({
      title: "Meeting time selected",
      description: `Meeting time set for ${formatHour(hour)} UTC tomorrow`,
    });
  };
  
  // Display a limited number of hours if not showing all
  const displayedHours = showAllHours ? bestTimes : bestTimes.slice(0, 8);
  
  return (
    
    <Card className="border border-slate-dark bg-navy-light">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan" />
            Team Meeting Planner
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {selectedTimeZones.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan flex gap-2"
                onClick={handleShareLink}
              >
                <Share2 className="h-4 w-4" />
                Share Schedule
              </Button>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan"
                >
                  <Info className="h-4 w-4 mr-1" />
                  Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-navy-light border-slate-dark text-slate-light">
                <DialogHeader>
                  <DialogTitle className="text-cyan">How to use the Meeting Planner</DialogTitle>
                  <DialogDescription className="text-slate">
                    <ol className="list-decimal list-inside space-y-2 mt-2">
                      <li>Add team members' time zones using the dropdown</li>
                      <li>View the table showing optimal meeting times</li>
                      <li>Green cells indicate working hours in each time zone</li>
                      <li>Higher scores mean more team members are available</li>
                      <li>Click on any row to select that meeting time</li>
                      <li>Share your schedule using the Share button</li>
                    </ol>
                    
                    <div className="mt-4 p-3 bg-navy-dark rounded-md border border-slate-dark">
                      <h4 className="text-sm font-medium mb-1 text-cyan">Understanding the colors:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-700/30">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-xs">Available - This person is within their working hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-700/30">
                            <X className="h-3 w-3" />
                          </div>
                          <span className="text-xs">Unavailable - Outside of this person's working hours</span>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium mt-3 mb-1 text-cyan">Table background colors:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-900/20 rounded"></div>
                          <span className="text-xs">Perfect time - Everyone is available (100%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-yellow-900/10 rounded"></div>
                          <span className="text-xs">Good time - More than half the team is available</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-slate-dark" />
                    
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Working Hours:</p>
                      <div className="flex items-center gap-2 text-sm">
                        <p>From:</p>
                        <Select 
                          defaultValue={workingHours.start.toString()}
                          onValueChange={(value) => updateWorkingHours('start', value)}
                        >
                          <SelectTrigger className="w-24 h-8 text-xs bg-navy-dark border-slate-dark">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent className="bg-navy-dark border-slate-dark">
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={i.toString()} className="text-xs">
                                {formatHourAMPM(i)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <p>To:</p>
                        <Select 
                          defaultValue={workingHours.end.toString()}
                          onValueChange={(value) => updateWorkingHours('end', value)}
                        >
                          <SelectTrigger className="w-24 h-8 text-xs bg-navy-dark border-slate-dark">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent className="bg-navy-dark border-slate-dark">
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={i.toString()} className="text-xs">
                                {formatHourAMPM(i)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
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
                ? "Add team members' time zones to find the best meeting times"
                : `${selectedTimeZones.length} time zone${selectedTimeZones.length === 1 ? '' : 's'} selected`}
            </div>
          </div>
          
          {/* Display selected timezones as badges */}
          {selectedTimeZones.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTimeZones.map((zone, index) => {
                const { city, currentTime, currentDate } = getTimeZoneInfo(zone);
                return (
                  <Badge 
                    key={zone} 
                    variant="secondary"
                    className="flex items-center gap-1 bg-navy-dark px-3 py-1"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center">
                            <span>{city}</span>
                            <Clock className="h-3 w-3 ml-1 text-cyan" />
                            <span className="ml-1 text-xs text-cyan">{currentTime}</span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{zone}</p>
                          <p className="text-xs text-slate">{currentDate}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 text-slate p-0 hover:text-red-400 hover:bg-transparent"
                      onClick={() => handleRemoveTimeZone(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          )}
          
          {/* Selected meeting time display */}
          {selectedMeetingTime && selectedTimeZones.length > 0 && (
            <div className="p-3 bg-navy-dark rounded-lg border border-cyan/20 mb-2">
              <h4 className="text-sm font-medium mb-2 text-cyan flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                Selected Meeting Time
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan" />
                  <span className="text-sm">
                    {format(selectedMeetingTime.date, "EEEE, MMMM d")} at {formatHour(selectedMeetingTime.hour)} UTC
                  </span>
                </div>
                
                <div className="text-xs text-slate">
                  <span className="block mb-1">Local times:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {selectedTimeZones.map(zone => (
                      <div key={zone} className="flex items-center justify-between">
                        <span>{getSimplifiedName(zone)}:</span>
                        <span className="font-medium text-cyan">{getMeetingTimeInZone(selectedMeetingTime.hour, zone)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedTimeZones.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium flex items-center gap-2 text-cyan">
                  <CalendarClock className="h-4 w-4" />
                  Best Meeting Times
                </h3>
                {bestTimes.length > 8 && (
                  <Button 
                    variant="link" 
                    className="text-xs p-0 h-auto text-cyan"
                    onClick={() => setShowAllHours(!showAllHours)}
                  >
                    {showAllHours ? "Show Top 8 Only" : "Show All Hours"}
                  </Button>
                )}
              </div>
              
              {/* Legend for the table */}
              <div className="mb-2 flex flex-wrap gap-3 text-xs text-slate p-2 bg-navy-dark/50 rounded-md">
                <div className="flex items-center gap-1">
                  <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-700/30">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-700/30">
                    <X className="h-3 w-3" />
                  </div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-900/20 rounded"></div>
                  <span>Perfect time (100%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-900/10 rounded"></div>
                  <span>Good time (&gt;50%)</span>
                </div>
              </div>
              
              <div className="rounded-md border border-slate-dark overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[100px]">
                        <span className="flex items-center gap-1">
                          Time (UTC) 
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-slate" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Coordinated Universal Time</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </TableHead>
                      {selectedTimeZones.map(zone => (
                        <TableHead key={zone} className="text-xs whitespace-nowrap">
                          {getSimplifiedName(zone)}
                        </TableHead>
                      ))}
                      <TableHead className="text-right">
                        <span className="flex items-center justify-end gap-1">
                          Available
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-slate" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Number of team members available</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedHours.map(({ hour, score }) => (
                      <TableRow 
                        key={hour} 
                        className={`cursor-pointer ${
                          selectedMeetingTime?.hour === hour 
                            ? "bg-cyan/10 hover:bg-cyan/20" 
                            : score === selectedTimeZones.length 
                              ? "bg-green-900/20 hover:bg-green-900/30" 
                              : score >= selectedTimeZones.length / 2 
                                ? "bg-yellow-900/10 hover:bg-yellow-900/20"
                                : "hover:bg-navy-dark/50"
                        }`}
                        onClick={() => handleSelectMeetingTime(hour)}
                      >
                        <TableCell className="font-mono">
                          <span className="font-semibold">{formatHour(hour)}</span>
                          <span className="text-xs text-slate block">{formatHourAMPM(hour)}</span>
                        </TableCell>
                        {selectedTimeZones.map(zone => {
                          const isWorking = isWorkingHour(hour, zone);
                          return (
                            <TableCell key={zone} className="text-center px-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${isWorking ? 'bg-green-700/30' : 'bg-red-700/30'}`}>
                                      {isWorking ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="font-medium">{isWorking ? 'Available' : 'Unavailable'}</p>
                                    <p className="text-xs">
                                      {formatHour(hour)} UTC is {isWorking ? 'within' : 'outside'} {getSimplifiedName(zone)}'s working hours
                                      ({formatHourAMPM(workingHours.start)} - {formatHourAMPM(workingHours.end)})
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          );
                        })}
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
              {selectedTimeZones.length > 2 && bestTimes.some(item => item.score === selectedTimeZones.length) && (
                <div className="text-sm bg-green-900/10 border border-green-900/20 rounded-md p-3 mt-2">
                  <p className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Perfect match!</span> We found times when all team members are available.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-slate">
              <div className="mb-4 bg-navy-dark rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-cyan" />
              </div>
              <h3 className="text-lg font-medium mb-2">No time zones selected</h3>
              <p className="text-sm mt-1">Add team member time zones to find optimal meeting times</p>
              <p className="text-xs mt-4 max-w-md mx-auto text-slate">
                Select time zones from the dropdown above to see the best meeting times.
                The scheduler will show when team members are available based on their local working hours.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingScheduler;
