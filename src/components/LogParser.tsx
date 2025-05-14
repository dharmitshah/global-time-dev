
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { CalendarClock, Copy } from 'lucide-react';

// Common timestamp patterns found in logs
const TIMESTAMP_PATTERNS = [
  // ISO 8601 (2023-05-14T15:30:45.123Z)
  /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2}))/g,
  // Unix timestamp (1621022400)
  /\b(\d{10,13})\b/g,
  // Common log formats (14/May/2023:15:30:45 +0000)
  /(\d{1,2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4})/g,
  // RFC 3339 (2023-05-14 15:30:45)
  /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d{1,6})?)/g,
  // Simple date time (05/14/2023 15:30:45)
  /(\d{1,2}\/\d{1,2}\/\d{2,4} \d{2}:\d{2}:\d{2})/g,
  // Simple time (15:30:45)
  /(\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?)/g,
];

interface TimestampMatch {
  timestamp: string;
  converted: Date | null;
  isoString: string;
  unixTimestamp: number;
  valid: boolean;
}

const LogParser = () => {
  const [logInput, setLogInput] = useState('');
  const [timestamps, setTimestamps] = useState<TimestampMatch[]>([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const { toast } = useToast();

  // Get default user timezone
  const getUserTimeZone = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      console.error("Could not get user timezone:", error);
      return "UTC";
    }
  };

  useEffect(() => {
    setSelectedTimeZone(getUserTimeZone());
  }, []);

  const parseLog = () => {
    if (!logInput.trim()) {
      toast({
        title: "Empty input",
        description: "Please paste a log snippet containing timestamps",
        variant: "destructive",
      });
      return;
    }

    const matches: TimestampMatch[] = [];
    const today = new Date();
    const thisYear = today.getFullYear();
    
    // Try each pattern
    TIMESTAMP_PATTERNS.forEach(pattern => {
      const found = [...logInput.matchAll(pattern)];
      
      found.forEach(match => {
        const timestamp = match[1];
        let converted: Date | null = null;
        let valid = false;
        
        try {
          // Try to parse as ISO format first
          converted = new Date(timestamp);
          
          // If that fails, try as Unix timestamp
          if (isNaN(converted.getTime())) {
            if (/^\d{10,13}$/.test(timestamp)) {
              // Check if it's milliseconds (13 digits) or seconds (10 digits)
              const multiplier = timestamp.length <= 10 ? 1000 : 1;
              converted = new Date(parseInt(timestamp) * multiplier);
            }
          }
          
          // If parsing worked, it's a valid date
          valid = !isNaN(converted.getTime());
          
          // Handle relative timestamps (just time without date)
          if (/^\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?$/.test(timestamp)) {
            const [hours, minutes, secondsWithMs] = timestamp.split(':');
            const seconds = secondsWithMs.split('.')[0];
            const ms = secondsWithMs.includes('.') ? secondsWithMs.split('.')[1] : '0';
            
            converted = new Date();
            converted.setHours(parseInt(hours));
            converted.setMinutes(parseInt(minutes));
            converted.setSeconds(parseInt(seconds));
            converted.setMilliseconds(parseInt(ms.padEnd(3, '0')));
            
            valid = true;
          }
        } catch (error) {
          console.error(`Could not parse timestamp: ${timestamp}`, error);
          valid = false;
        }
        
        if (valid && converted) {
          // Ensure we don't add duplicate timestamps
          const isDuplicate = matches.some(
            m => m.timestamp === timestamp || 
                (m.valid && m.converted && 
                 m.converted.getTime() === converted!.getTime())
          );
          
          if (!isDuplicate) {
            matches.push({
              timestamp,
              converted,
              isoString: converted.toISOString(),
              unixTimestamp: Math.floor(converted.getTime() / 1000),
              valid
            });
          }
        }
      });
    });
    
    if (matches.length === 0) {
      toast({
        title: "No timestamps found",
        description: "Could not identify any timestamps in the log",
      });
    } else {
      setTimestamps(matches);
      
      toast({
        title: `Found ${matches.length} timestamp${matches.length === 1 ? '' : 's'}`,
        description: "Scroll down to see the converted results",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({ title: "Copied to clipboard" });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy failed",
          variant: "destructive",
        });
      });
  };

  const formatInTimeZone = (date: Date, timeZone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(date);
    } catch (error) {
      console.error(`Error formatting date ${date} for zone ${timeZone}:`, error);
      return 'Invalid format';
    }
  };

  return (
    <Card className="border border-slate-dark bg-navy-light">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-cyan" />
          Log Timestamp Parser
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="log-input" className="text-sm text-slate-light mb-1 block">
              Paste log snippet containing timestamps:
            </Label>
            <Textarea
              id="log-input"
              placeholder="Paste your log here..."
              className="font-mono text-xs h-32 bg-navy-dark border-slate-dark text-slate-light resize-none"
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button 
                onClick={parseLog}
                className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
              >
                Parse Timestamps
              </Button>
            </div>
          </div>
          
          {timestamps.length > 0 && (
            <>
              <Separator className="my-4 bg-slate-dark" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-light">
                    Found {timestamps.length} timestamp{timestamps.length === 1 ? '' : 's'}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="timezone-select" className="text-xs text-slate whitespace-nowrap">
                      Display in:
                    </Label>
                    <select
                      id="timezone-select"
                      value={selectedTimeZone}
                      onChange={(e) => setSelectedTimeZone(e.target.value)}
                      className="text-xs bg-navy-dark border border-slate-dark rounded p-1 text-slate-light"
                    >
                      <option value={getUserTimeZone()}>Local Time</option>
                      <option value="UTC">UTC</option>
                      {timestamps[0]?.valid && TIMESTAMP_PATTERNS.some(p => p.test(timestamps[0].timestamp)) && (
                        <option value="original">Original Format</option>
                      )}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 code-block">
                  {timestamps.map((match, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-slate-dark last:border-0">
                      <div className="flex flex-col mb-2 sm:mb-0">
                        <span className="text-xs text-slate">Original: <code className="text-slate-light">{match.timestamp}</code></span>
                        
                        {match.valid ? (
                          <span className="text-xs text-slate mt-1">
                            Converted: <code className="text-cyan-light">
                              {selectedTimeZone === 'original' 
                                ? match.timestamp 
                                : formatInTimeZone(match.converted!, selectedTimeZone)}
                            </code>
                          </span>
                        ) : (
                          <span className="text-xs text-red-400 mt-1">Invalid timestamp</span>
                        )}
                      </div>
                      
                      {match.valid && (
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan flex items-center gap-1"
                            onClick={() => copyToClipboard(match.isoString)}
                          >
                            <Copy className="h-3 w-3" />
                            <span>ISO</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan flex items-center gap-1"
                            onClick={() => copyToClipboard(match.unixTimestamp.toString())}
                          >
                            <Copy className="h-3 w-3" />
                            <span>Unix</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan flex items-center gap-1"
                            onClick={() => copyToClipboard(formatInTimeZone(match.converted!, selectedTimeZone))}
                          >
                            <Copy className="h-3 w-3" />
                            <span>Formatted</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LogParser;
