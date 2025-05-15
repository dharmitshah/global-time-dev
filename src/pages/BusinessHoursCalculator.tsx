
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import TimeZoneCard from '@/components/TimeZoneCard';
import Footer from '@/components/Footer';
import { Building, Clock } from 'lucide-react';

const BusinessHoursCalculator = () => {
  const [timeZone1, setTimeZone1] = useState<string>('');
  const [timeZone2, setTimeZone2] = useState<string>('');
  const [meetingTime, setMeetingTime] = useState<string>('09:00');
  const [availableTimeZones, setAvailableTimeZones] = useState<string[]>([]);
  const [calculatedTime1, setCalculatedTime1] = useState<string>('');
  const [calculatedTime2, setCalculatedTime2] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    // Use a list of common time zones instead of Intl.supportedValuesOf
    const commonTimeZones = [
      "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
      "Europe/London", "Europe/Berlin", "Europe/Moscow", "Asia/Tokyo",
      "Asia/Shanghai", "Asia/Kolkata", "Australia/Sydney", "Pacific/Auckland",
      "America/Toronto", "America/Mexico_City", "America/Sao_Paulo", "Africa/Cairo"
    ];
    
    setAvailableTimeZones(commonTimeZones);
  }, []);

  const calculateTime = () => {
    if (!timeZone1 || !timeZone2 || !meetingTime) {
      toast({
        title: "Error",
        description: "Please select time zones and enter a meeting time.",
        variant: "destructive",
      });
      return;
    }

    const [hours, minutes] = meetingTime.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);

    try {
      const time1 = now.toLocaleString('en-US', { timeZone: timeZone1, hour: '2-digit', minute: '2-digit', hour12: true });
      const time2 = now.toLocaleString('en-US', { timeZone: timeZone2, hour: '2-digit', minute: '2-digit', hour12: true });

      setCalculatedTime1(time1);
      setCalculatedTime2(time2);
    } catch (error) {
      console.error("Error calculating time:", error);
      toast({
        title: "Error",
        description: "Could not calculate time. Please check the selected time zones.",
        variant: "destructive",
      });
      setCalculatedTime1('');
      setCalculatedTime2('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-slate-light flex items-center gap-2">
          <Building className="h-7 w-7 text-cyan" />
          Business Hours Calculator
        </h1>
        <p className="text-slate mb-8">Find overlapping business hours between different time zones for effective collaboration.</p>
        
        <Card className="border-slate-dark bg-navy-light">
          <CardHeader>
            <CardTitle className="text-xl text-slate-light">Select Time Zones and Meeting Time</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone1" className="text-slate">Time Zone 1</Label>
                <Select onValueChange={setTimeZone1}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeZones.map((tz) => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timezone2" className="text-slate">Time Zone 2</Label>
                <Select onValueChange={setTimeZone2}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeZones.map((tz) => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="meetingTime" className="text-slate">Meeting Time (HH:MM)</Label>
              <Input 
                type="time" 
                id="meetingTime" 
                value={meetingTime} 
                onChange={(e) => setMeetingTime(e.target.value)} 
                className="bg-navy-dark border-slate-dark text-slate-light"
              />
            </div>
            
            <Button onClick={calculateTime} className="bg-cyan hover:bg-cyan-dark text-navy font-medium">
              <Clock className="mr-2 h-4 w-4" />
              Calculate Time
            </Button>
          </CardContent>
        </Card>

        <Separator className="my-8 bg-slate-dark" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculatedTime1 && (
            <Card className="border-slate-dark bg-navy-light">
              <CardHeader>
                <CardTitle className="text-xl text-slate-light">Time in {timeZone1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-cyan">{calculatedTime1}</p>
              </CardContent>
            </Card>
          )}

          {calculatedTime2 && (
            <Card className="border-slate-dark bg-navy-light">
              <CardHeader>
                <CardTitle className="text-xl text-slate-light">Time in {timeZone2}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-cyan">{calculatedTime2}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessHoursCalculator;
