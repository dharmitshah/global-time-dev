
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const TimeZoneHistory = () => {
  return (
    <div className="min-h-screen bg-navy py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-cyan" />
              <h1 className="text-xl font-bold tracking-tight">DevTimeZone</h1>
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate">Time Zone History & Facts</span>
              <BookOpen className="h-4 w-4 text-cyan" />
            </div>
          </div>
          <Separator className="my-4 bg-slate-dark" />
          <h1 className="text-3xl font-bold mb-2">Time Zone History & Facts</h1>
          <p className="text-slate-light">The fascinating story of how we organize time across the globe</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="history">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="facts">Interesting Facts</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="mt-4 space-y-6">
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>The Birth of Time Zones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Prior to the late 19th century, time was a local matter. Each city or town set their clocks according to local solar time, 
                      which meant that time could vary by several minutes between neighboring towns. This wasn't a major issue when travel was 
                      slow and communication limited.
                    </p>
                    
                    <p>
                      However, with the development of railroads and the telegraph, the differences in local time became problematic. Train schedules 
                      were particularly confusing, with the same train arriving and departing at different "local times" as it moved across the country.
                    </p>
                    
                    <p>
                      In 1879, Canadian Sir Sandford Fleming proposed the system of worldwide time zones that we essentially still use today. 
                      His idea was to divide the world into 24 time zones, each one hour apart, based on the prime meridian (0° longitude) passing 
                      through Greenwich, London.
                    </p>
                    
                    <p>
                      On November 18, 1883, American and Canadian railroads implemented a standard time system, and within a year, most states 
                      had adopted one of the four standard time zones for the continental United States.
                    </p>
                    
                    <p>
                      The International Meridian Conference held in Washington, D.C. in 1884 established Greenwich as the prime meridian and 
                      recommended that the world adopt a system of 24 hour time zones.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>The Evolution of Daylight Saving Time</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      The concept of daylight saving time (DST) was first proposed by Benjamin Franklin in 1784, but it wasn't implemented 
                      until much later. The first countries to adopt DST were Germany and Austria-Hungary in 1916, as a way to conserve coal 
                      during World War I.
                    </p>
                    
                    <p>
                      The United States adopted DST in 1918, but it was so unpopular that it was repealed the following year. During World War II, 
                      President Franklin Roosevelt instituted year-round DST, called "War Time," which lasted from 1942 to 1945.
                    </p>
                    
                    <p>
                      After the war, states and localities were free to choose when and if they observed DST, creating significant confusion. 
                      The Uniform Time Act of 1966 standardized the start and end dates for DST, but allowed states to exempt themselves if they passed laws to do so.
                    </p>
                    
                    <p>
                      Today, DST is observed in about 70 countries worldwide, affecting over a billion people. However, many countries near 
                      the equator do not change their clocks, as daylight hours are similar throughout the year.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="facts" className="mt-4">
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>Fascinating Time Zone Facts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>China spans 5 geographical time zones but uses only one</AccordionTrigger>
                        <AccordionContent>
                          Despite spanning a territory wide enough to cover five time zones, China has used a single time zone (UTC+8) since 1949. 
                          This means that in the westernmost parts of China, the sun rises at around 10:00 AM in the winter.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Nepal is the only country with a 45-minute offset</AccordionTrigger>
                        <AccordionContent>
                          Most time zones differ by whole hours, but some have 30-minute offsets. Nepal, however, is unique in using a 45-minute offset 
                          from UTC (UTC+5:45).
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>The International Date Line has some odd zigzags</AccordionTrigger>
                        <AccordionContent>
                          The International Date Line (IDL) isn't a straight line - it zigzags around territories to keep countries and island groups 
                          in the same day. In 2011, Samoa moved from the east of the IDL to the west, skipping December 30, 2011 entirely, to align 
                          its workweek better with Australia and New Zealand.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Some places observe daylight saving time year-round</AccordionTrigger>
                        <AccordionContent>
                          While most regions either observe daylight saving time seasonally or not at all, some places like Argentina, Iceland, Russia, 
                          and Belarus effectively observe it year-round by adopting the time zone to their east.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5">
                        <AccordionTrigger>France has the most time zones of any country</AccordionTrigger>
                        <AccordionContent>
                          Due to its overseas territories spread across the globe, France observes 12 different time zones, more than any other country.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-6">
                        <AccordionTrigger>Some places have 30-minute offsets</AccordionTrigger>
                        <AccordionContent>
                          India, Iran, Afghanistan, Myanmar, Sri Lanka, the Canadian province of Newfoundland, and parts of Australia use time zones with 
                          half-hour offsets from UTC.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-4">
                <Card className="bg-navy-dark border-slate-dark">
                  <CardHeader>
                    <CardTitle>Timeline of Time Standardization</CardTitle>
                  </CardHeader>
                  <CardContent className="relative border-l-2 border-cyan pl-6 space-y-8 py-4">
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 bg-navy-dark border-2 border-cyan rounded-full"></div>
                      <div className="mb-1 text-cyan">1847</div>
                      <h3 className="font-semibold">Railway Time</h3>
                      <p className="text-sm text-slate-light">
                        Great Britain's railway companies standardize their schedules using Greenwich Mean Time.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 bg-navy-dark border-2 border-cyan rounded-full"></div>
                      <div className="mb-1 text-cyan">1879</div>
                      <h3 className="font-semibold">Global Time Zone Proposal</h3>
                      <p className="text-sm text-slate-light">
                        Sir Sandford Fleming proposes worldwide standard time zones at 15° intervals.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 bg-navy-dark border-2 border-cyan rounded-full"></div>
                      <div className="mb-1 text-cyan">1883</div>
                      <h3 className="font-semibold">North American Railroad Time</h3>
                      <p className="text-sm text-slate-light">
                        U.S. and Canadian railroads implement the standard time zone system.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 bg-navy-dark border-2 border-cyan rounded-full"></div>
                      <div className="mb-1 text-cyan">1884</div>
                      <h3 className="font-semibold">International Meridian Conference</h3>
                      <p className="text-sm text-slate-light">
                        Greenwich is established as the Prime Meridian, creating the basis for world time zones.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 bg-navy-dark border-2 border-cyan rounded-full"></div>
                      <div className="mb-1 text-cyan">1916</div>
                      <h3 className="font-semibold">First Daylight Saving Time</h3>
                      <p className="text-sm text-slate-light">
                        Germany and Austria-Hungary implement DST to conserve energy during WWI.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[33px] w-6 h-6 bg-navy-dark border-2 border-cyan rounded-full"></div>
                      <div className="mb-1 text-cyan">1972</div>
                      <h3 className="font-semibold">Coordinated Universal Time (UTC)</h3>
                      <p className="text-sm text-slate-light">
                        UTC replaces Greenwich Mean Time as the world's time standard.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="bg-navy-dark border-slate-dark">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan" />
                  Did You Know?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border border-slate-dark bg-navy rounded-md">
                  <h3 className="font-semibold mb-1 text-cyan">Greenwich Observatory</h3>
                  <p className="text-sm text-slate-light">
                    At the Royal Observatory in Greenwich, you can stand with one foot in the Eastern Hemisphere and one in the Western Hemisphere, 
                    straddling the Prime Meridian (0° longitude).
                  </p>
                </div>
                
                <div className="p-3 border border-slate-dark bg-navy rounded-md">
                  <h3 className="font-semibold mb-1 text-cyan">The 'Lost Day'</h3>
                  <p className="text-sm text-slate-light">
                    When crossing the International Date Line from west to east, you 'gain' a day. Conversely, traveling east to west, you 'lose' a day.
                  </p>
                </div>
                
                <div className="p-3 border border-slate-dark bg-navy rounded-md">
                  <h3 className="font-semibold mb-1 text-cyan">Kiribati's Time Jump</h3>
                  <p className="text-sm text-slate-light">
                    In 1995, the island nation of Kiribati moved the International Date Line to include all of its territory in the same day, 
                    creating the earliest time zone in the world (UTC+14).
                  </p>
                </div>
                
                <div className="p-3 border border-slate-dark bg-navy rounded-md">
                  <h3 className="font-semibold mb-1 text-cyan">North Korea's Time Change</h3>
                  <p className="text-sm text-slate-light">
                    In 2015, North Korea created its own time zone, "Pyongyang Time," which is 30 minutes behind South Korea.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneHistory;
