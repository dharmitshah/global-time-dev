
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays } from 'date-fns';
import { CalendarIcon, Clock, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TimeZoneSelector from '@/components/TimeZoneSelector';
import { cn } from '@/lib/utils';

// Schema for form validation
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  description: z.string().max(500).optional(),
  date: z.date({ required_error: 'Please select a date' }),
  time: z.string({ required_error: 'Please enter a time' })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Time must be in format HH:MM' }),
  timeZone: z.string().min(1, { message: 'Please select a time zone' }),
  duration: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Helper function to generate a unique event ID
const generateEventId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const EventLinkCreator = () => {
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: addDays(new Date(), 1), // Default to tomorrow
      time: '10:00',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Default to user's time zone
      duration: '60', // 60 minutes
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsGenerating(true);
    
    // Process the form data
    try {
      // In a real app, this would save to a database
      // For now, we'll simulate this with localStorage and URL parameters
      
      const eventId = generateEventId();
      const eventData = {
        ...data,
        id: eventId,
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage for demo purposes
      const events = JSON.parse(localStorage.getItem('syncmyclock_events') || '{}');
      events[eventId] = eventData;
      localStorage.setItem('syncmyclock_events', JSON.stringify(events));
      
      // Generate shareable link
      const baseUrl = window.location.origin;
      const shareableLink = `${baseUrl}/eventlink/view/${eventId}`;
      
      setGeneratedLink(shareableLink);
      
      toast({
        title: "EventLink created!",
        description: "Your time zone-friendly event link is ready to share.",
      });
    } catch (error) {
      toast({
        title: "Error creating EventLink",
        description: "There was a problem creating your event link. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating EventLink:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
        .then(() => {
          toast({
            title: "Link copied!",
            description: "The EventLink URL has been copied to your clipboard.",
          });
        })
        .catch(() => {
          toast({
            title: "Copy failed",
            description: "Could not copy the link. Please try again or copy it manually.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-dark bg-navy-light">
        <CardHeader>
          <CardTitle className="text-xl text-slate-light">Create an EventLink</CardTitle>
          <CardDescription className="text-slate">
            Fill out the details below to create a shareable link for your event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Team Meeting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add details about your event..." 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Add any additional information about your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Zone</FormLabel>
                      <FormControl>
                        <TimeZoneSelector 
                          value={field.value} 
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="5" max="1440" placeholder="60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cyan hover:bg-cyan-dark text-navy font-medium"
                disabled={isGenerating}
              >
                <Clock className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate EventLink'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedLink && (
        <Card className="border-cyan/20 bg-navy-light">
          <CardHeader>
            <CardTitle className="text-lg text-cyan flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your EventLink is Ready!
            </CardTitle>
            <CardDescription className="text-slate">
              Share this link with anyone, and they'll see the event in their own time zone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input 
                value={generatedLink} 
                readOnly 
                className="font-mono text-sm bg-navy-dark"
              />
              <Button onClick={handleCopyLink} variant="outline">
                Copy
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-slate">
            <p>Links are stored in your browser and will be available as long as you don't clear your browser data.</p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EventLinkCreator;
