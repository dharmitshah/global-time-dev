
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, History } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import DailyTimezoneFact from '@/components/DailyTimezoneFact';

const TimeZoneHistory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container max-w-6xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-slate-light flex items-center gap-2">
          <History className="h-7 w-7 text-cyan" />
          Time Zone History & Facts
        </h1>
        <p className="text-slate mb-8">Explore the fascinating history of time zones and how they shape our world.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <DailyTimezoneFact />
          
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-xl text-slate-light">The Origin of Time Zones</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p className="mb-4">
                Before the late nineteenth century, time was a local matter. Each town and city set its own 
                clock according to the sun, resulting in hundreds of local time zones.
              </p>
              <p>
                The introduction of railroads in the 1800s created a need for standardized time. In 1883, 
                U.S. and Canadian railroads established four standard time zones to reduce confusion. 
                The International Meridian Conference of 1884 established Greenwich Mean Time (GMT) as the 
                world's time standard.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 bg-slate-dark" />
        
        <h2 className="text-2xl font-bold mb-6 text-slate-light">Notable Time Zone Facts</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-lg text-slate-light">India's Single Time Zone</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p>
                Despite spanning over 3,000 km from east to west (enough for multiple time zones), 
                India uses a single time zone (UTC+5:30) for the entire country.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-lg text-slate-light">China's One Time Zone</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p>
                China spans five geographical time zones but uses a single official time (UTC+8) called 
                Beijing Time across the entire country.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-lg text-slate-light">Kiribati's Date Line Adjustment</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p>
                In 1995, Kiribati shifted the International Date Line eastward to encompass all its islands, 
                making it the first country to enter each new day.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-lg text-slate-light">Nepal's Unusual Offset</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p>
                Nepal uses a unique time zone offset of UTC+5:45, one of the few countries in the world with a 
                15-minute deviation from standard hourly time zones.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-lg text-slate-light">The Time Zone Island</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p>
                The island of Märket is divided between Finland and Sweden, with two different time zones 
                on an island that measures just 350 meters by 150 meters.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-dark bg-navy-light">
            <CardHeader>
              <CardTitle className="text-lg text-slate-light">Daylight Saving Origins</CardTitle>
            </CardHeader>
            <CardContent className="text-slate">
              <p>
                While Benjamin Franklin is often credited with the idea, modern Daylight Saving Time was first 
                proposed in 1895 by entomologist George Hudson, who wanted more evening light for insect collecting.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeZoneHistory;
