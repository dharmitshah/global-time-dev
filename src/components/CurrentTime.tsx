
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

interface CurrentTimeProps {
  className?: string;
}

const CurrentTime = ({ className }: CurrentTimeProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [localTimeZone, setLocalTimeZone] = useState('');
  
  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Get timezone name
    try {
      setLocalTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (error) {
      console.error("Could not get local timezone:", error);
      setLocalTimeZone("Unknown");
    }
    
    return () => clearInterval(interval);
  }, []);
  
  // Format the current time in various formats
  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const utcString = currentTime.toUTCString();
  const isoString = currentTime.toISOString();
  const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
  
  return (
    <Card className={`border border-slate-dark bg-navy-light ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-5 w-5 text-cyan" />
          <h2 className="text-lg font-medium">Current Local Time</h2>
          <Badge variant="outline" className="ml-auto border-cyan text-cyan text-xs">
            {localTimeZone}
          </Badge>
        </div>
        
        <div className="text-4xl font-bold tracking-tight text-cyan mb-2 blinking-cursor">
          {timeString}
        </div>
        
        <div className="text-sm text-slate mb-4">
          {dateString}
        </div>
        
        <div className="grid gap-2 code-block text-xs">
          <div className="flex justify-between">
            <span className="text-slate-dark">UTC:</span>
            <span className="text-slate-light">{utcString}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-dark">ISO 8601:</span>
            <span className="text-slate-light">{isoString}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-dark">Unix Timestamp:</span>
            <span className="text-slate-light">{unixTimestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentTime;
