
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TimeZoneCardProps {
  timeZone?: string;
  timezone?: string; // For backward compatibility
  onRemove?: () => void;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ 
  timeZone, 
  timezone, 
  onRemove 
}) => {
  // Use either timeZone or timezone prop (for backward compatibility)
  const tzValue = timeZone || timezone || '';
  
  const [currentTime, setCurrentTime] = React.useState<string>('');
  const [currentDate, setCurrentDate] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: tzValue,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        
        const dateOptions: Intl.DateTimeFormatOptions = {
          timeZone: tzValue,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        
        setCurrentTime(now.toLocaleTimeString(undefined, options));
        setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      } catch (error) {
        console.error("Error formatting time:", error);
        setCurrentTime("Invalid timezone");
        setCurrentDate("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [tzValue]);

  const getOffset = () => {
    try {
      const now = new Date();
      const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tzValue }));
      const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
      
      return `UTC${offset >= 0 ? '+' : ''}${offset}`;
    } catch (error) {
      return "Unknown offset";
    }
  };

  return (
    <Card className="bg-navy-light border-slate-dark w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-slate-light">{tzValue}</h3>
            <p className="text-sm text-slate mb-1">{getOffset()}</p>
            <p className="text-2xl font-bold text-cyan">{currentTime}</p>
            <p className="text-xs text-slate mt-1">{currentDate}</p>
          </div>
          {onRemove && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRemove}
              className="h-8 w-8 p-0 text-slate hover:text-red-500"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeZoneCard;
