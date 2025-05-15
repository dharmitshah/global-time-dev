
import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface EventData {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  timeZone: string;
  duration?: string;
  createdAt: string;
}

interface EventLinkViewerProps {
  eventId: string;
}

const EventLinkViewer: React.FC<EventLinkViewerProps> = ({ eventId }) => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localEventTime, setLocalEventTime] = useState<Date | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      // In a real app, this would be an API call
      // For now, we'll retrieve from localStorage
      const events = JSON.parse(localStorage.getItem('syncmyclock_events') || '{}');
      const eventData = events[eventId];
      
      if (!eventData) {
        setError('Event not found. The link may be invalid or the event has been removed.');
        return;
      }
      
      // Parse the date
      const parsedEvent = {
        ...eventData,
        date: new Date(eventData.date),
      };
      
      setEvent(parsedEvent);
      
      // Calculate the local time for the event
      const eventDateTime = new Date(parsedEvent.date);
      const [hours, minutes] = parsedEvent.time.split(':').map(Number);
      eventDateTime.setHours(hours, minutes, 0, 0);
      
      // Convert from event timezone to local timezone
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const eventOptions = { timeZone: parsedEvent.timeZone };
      const localOptions = { timeZone: userTimeZone };
      
      // Get the time difference between event timezone and local timezone
      const eventTime = new Date(eventDateTime.toLocaleString('en-US', eventOptions));
      const localTime = new Date(eventDateTime.toLocaleString('en-US', localOptions));
      const timeDiff = localTime.getTime() - eventTime.getTime();
      
      // Apply the difference to get the correct local time
      const adjustedLocalTime = new Date(eventDateTime.getTime() + timeDiff);
      setLocalEventTime(adjustedLocalTime);
      
    } catch (error) {
      console.error('Error loading event:', error);
      setError('There was a problem loading the event details.');
    }
  }, [eventId]);
  
  const handleGoBack = () => {
    navigate('/eventlink');
  };
  
  const handleAddToCalendar = () => {
    if (!event || !localEventTime) return;
    
    try {
      // Format for Google Calendar
      const startTime = format(localEventTime, "yyyyMMdd'T'HHmmss");
      const endTime = format(
        new Date(localEventTime.getTime() + parseInt(event.duration || '60') * 60000),
        "yyyyMMdd'T'HHmmss"
      );
      
      const eventTitle = encodeURIComponent(event.title);
      const eventDesc = encodeURIComponent(event.description || '');
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDesc}&dates=${startTime}/${endTime}`;
      
      window.open(googleCalendarUrl, '_blank');
      
      toast({
        title: "Opening Google Calendar",
        description: "Add this event to your calendar.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not generate calendar link.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <Card className="border-red-500/20 bg-navy-light">
        <CardHeader>
          <CardTitle className="text-red-500">Event Not Found</CardTitle>
          <CardDescription>
            {error}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!event || !localEventTime) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to EventLink
      </Button>
      
      <Card className="border-slate-dark bg-navy-light">
        <div className="relative">
          <AspectRatio ratio={3/1} className="bg-gradient-to-r from-cyan/30 to-navy-dark">
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="h-12 w-12 text-cyan opacity-50" />
            </div>
          </AspectRatio>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-navy-dark text-cyan">
              Event
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="text-2xl text-slate-light">{event.title}</CardTitle>
          {event.description && (
            <CardDescription className="text-slate whitespace-pre-line">
              {event.description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-light">Event Time (Your Local Time)</h3>
              <div className="flex items-center space-x-2 text-slate">
                <CalendarIcon className="h-4 w-4 text-cyan" />
                <span>{format(localEventTime, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate">
                <Clock className="h-4 w-4 text-cyan" />
                <span>{format(localEventTime, 'h:mm a')}</span>
                <Badge variant="outline" className="ml-2">
                  {Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ')}
                </Badge>
              </div>
              {event.duration && (
                <div className="text-sm text-slate">
                  Duration: {event.duration} minutes
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-light">Original Time Zone</h3>
              <div className="flex items-center space-x-2 text-slate">
                <Clock className="h-4 w-4 text-cyan" />
                <span>
                  {format(event.date, 'MMMM d, yyyy')} at {event.time}
                </span>
              </div>
              <div className="text-sm text-slate">
                <Badge variant="outline">
                  {event.timeZone.replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row items-center gap-4">
          <Button 
            className="w-full sm:w-auto bg-cyan hover:bg-cyan-dark text-navy font-medium"
            onClick={handleAddToCalendar}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Created with EventLink by SyncMyClock
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventLinkViewer;
