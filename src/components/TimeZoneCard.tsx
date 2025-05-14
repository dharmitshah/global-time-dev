
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Copy, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TimeZoneCardProps {
  timeZone: string;
  baseTime?: Date;
  onRemove: () => void;
}

const TimeZoneCard = ({ timeZone, baseTime = new Date(), onRemove }: TimeZoneCardProps) => {
  const [time, setTime] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Format the time based on the given timezone
  const formatTimeForZone = () => {
    try {
      return time.toLocaleString('en-US', { 
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.error(`Error formatting time for zone ${timeZone}:`, error);
      return 'Invalid timezone';
    }
  };

  const formatDateForZone = () => {
    try {
      return time.toLocaleDateString('en-US', { 
        timeZone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error(`Error formatting date for zone ${timeZone}:`, error);
      return 'Invalid timezone';
    }
  };
  
  // Get common city name from timezone
  const getSimplifiedName = (timeZone: string) => {
    const parts = timeZone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  };
  
  // Handle copy to clipboard
  const handleCopy = () => {
    const formattedTime = formatTimeForZone();
    const formattedDate = formatDateForZone();
    
    navigator.clipboard.writeText(`${formattedTime} ${timeZone} (${formattedDate})`)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: `Time for ${getSimplifiedName(timeZone)} has been copied`,
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy failed",
          description: "Could not copy time to clipboard",
          variant: "destructive",
        });
      });
  };
  
  return (
    <Card className="border border-slate-dark bg-navy-light animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan" />
            <h3 className="font-medium">{getSimplifiedName(timeZone)}</h3>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:text-cyan hover:bg-navy-dark"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-slate hover:text-red-400 hover:bg-navy-dark"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-2xl font-bold text-slate-light">
          {formatTimeForZone()}
        </div>
        
        <div className="text-xs text-slate mb-2">
          {formatDateForZone()}
        </div>
        
        <Badge variant="outline" className="text-xs text-slate">
          {timeZone}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default TimeZoneCard;
