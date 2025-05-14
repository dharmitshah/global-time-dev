
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TimeZoneSelector from './TimeZoneSelector';
import TimeZoneCard from './TimeZoneCard';

// Default common time zones for developers
const DEFAULT_TIMEZONES = [
  'America/Los_Angeles', // US West Coast (Silicon Valley)
  'America/New_York',    // US East Coast
  'Europe/London',       // UK
  'Asia/Kolkata',        // India
  'Asia/Tokyo'           // Japan
];

const TimeConverter = () => {
  const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Try to load from URL params
    const params = new URLSearchParams(window.location.search);
    const tzParam = params.get('tz');
    
    if (tzParam) {
      try {
        // Handle comma-separated list of time zones
        const zones = tzParam.split(',');
        const validZones = zones.filter(zone => {
          try {
            // Quick validation by trying to format a date with this timezone
            Intl.DateTimeFormat('en-US', { timeZone: zone }).format(new Date());
            return true;
          } catch (e) {
            console.warn(`Invalid timezone in URL: ${zone}`);
            return false;
          }
        });
        
        if (validZones.length > 0) {
          setSelectedTimeZones(validZones);
          return; // Skip setting default time zones
        }
      } catch (e) {
        console.error("Error parsing timezones from URL", e);
      }
    }
    
    // Load default time zones if none in URL
    setSelectedTimeZones(DEFAULT_TIMEZONES);
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
    url.searchParams.set('tz', selectedTimeZones.join(','));
    
    // Copy to clipboard
    navigator.clipboard.writeText(url.toString())
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Share this link to show these time zones",
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
  
  return (
    <Card className="border border-slate-dark bg-navy-light">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan" />
            Time Zone Converter
          </CardTitle>
          
          {selectedTimeZones.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan flex items-center gap-1"
              onClick={handleShareLink}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
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
                ? "Add some time zones to start comparing"
                : `Showing ${selectedTimeZones.length} time zone${selectedTimeZones.length === 1 ? '' : 's'}`}
            </div>
          </div>
          
          {selectedTimeZones.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {selectedTimeZones.map((zone, index) => (
                <TimeZoneCard
                  key={zone}
                  timeZone={zone}
                  onRemove={() => handleRemoveTimeZone(index)}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate">
              <div className="mb-2 text-4xl">🕰️</div>
              <p>No time zones selected</p>
              <p className="text-sm mt-1">Use the selector above to add time zones</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeConverter;
