import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Globe, CalendarClock, Users, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import CurrentTime from '@/components/CurrentTime';
import TimeConverter from '@/components/TimeConverter';
import LogParser from '@/components/LogParser';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import EmbedCodeGenerator from '@/components/EmbedCodeGenerator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section with proper H1 tag */}
      <section className="py-8 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-light mb-4">
            Time Zone <span className="text-cyan terminal-prompt">Converter & World Clock</span>
          </h1>
          <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
            Convert timestamps across global time zones, calculate time differences, and collaborate seamlessly with distributed teams. Free UTC to EST, UTC to IST converter.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
              onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Clock className="mr-2 h-4 w-4" />
              Convert Time Zones
            </Button>
            <Link to="/meeting-scheduler">
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-dark hover:bg-navy-dark hover:text-cyan hover:border-cyan"
              >
                <Users className="mr-2 h-4 w-4" />
                Schedule Team Meetings
              </Button>
            </Link>
            <Button 
              variant="secondary"
              size="lg" 
              className="border-slate-dark bg-navy-dark hover:bg-navy hover:text-cyan"
              onClick={() => document.getElementById('parser')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              Parse Log Timestamps
            </Button>
          </div>
        </div>
      </section>
      
      {/* Enhanced SEO Content Section with internal links */}
      <section className="mb-12 bg-navy-light border border-slate-dark rounded-lg p-6 text-left">
        <h2 className="text-2xl font-bold mb-4 text-slate-light">Why Use Sync My Clock Timezone Converter?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate mb-4">
              <strong className="text-cyan">Sync My Clock</strong> is the ultimate free timezone conversion tool designed specifically for developers, remote teams, and global professionals who need accurate time synchronization across multiple regions.
            </p>
            <p className="text-slate mb-4">
              Our comprehensive <Link to="/world-clock-sync-tool" className="text-cyan hover:underline">world clock</Link> and timezone converter eliminates the confusion of working across different timezones, whether you're converting <Link to="/utc-to-ist" className="text-cyan hover:underline">UTC to IST</Link>, <Link to="/utc-to-est" className="text-cyan hover:underline">UTC to EST</Link>, scheduling international meetings, or parsing timestamps from logs.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-cyan mr-2" />
                <span className="text-slate-light">Instant timezone conversion for 200+ global regions</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-cyan mr-2" />
                <Link to="/world-clock-sync-tool" className="text-slate-light hover:text-cyan">Real-time world clock with custom timezone selection</Link>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-cyan mr-2" />
                <Link to="/time-zone-converter-for-developers" className="text-slate-light hover:text-cyan">Advanced log timestamp parser for developers</Link>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-cyan mr-2" />
                <Link to="/meeting-scheduler" className="text-slate-light hover:text-cyan">Team meeting scheduler across multiple timezones</Link>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-slate-light">How to Use Our Timezone Converter</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate">
              <li>Select your source timezone (e.g., UTC, GMT, EST, IST)</li>
              <li>Choose your target timezone for conversion</li>
              <li>Enter the time you want to convert or use current time</li>
              <li>Get instant, accurate timezone conversion results</li>
            </ol>
            <p className="mt-4 text-slate">
              Whether you're coordinating software releases, scheduling international video calls, or simply need to check what time it is across the world, our timezone conversion tools provide the accuracy and simplicity you need.
            </p>
            <div className="mt-6">
              <Link to="/time-zone-converter-for-developers">
                <Button variant="outline" className="border-cyan text-cyan hover:bg-navy-dark">
                  Learn More About Our Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Tools Quick Links for better internal linking */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-light text-center">Popular Time Zone Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/utc-to-ist">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors">
              <CardContent className="p-4 text-center">
                <LinkIcon className="h-6 w-6 text-cyan mx-auto mb-2" />
                <h3 className="font-medium">UTC to IST</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/utc-to-est">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors">
              <CardContent className="p-4 text-center">
                <LinkIcon className="h-6 w-6 text-cyan mx-auto mb-2" />
                <h3 className="font-medium">UTC to EST</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/meeting-scheduler">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors">
              <CardContent className="p-4 text-center">
                <LinkIcon className="h-6 w-6 text-cyan mx-auto mb-2" />
                <h3 className="font-medium">Meeting Planner</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/business-hours-calculator">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors">
              <CardContent className="p-4 text-center">
                <LinkIcon className="h-6 w-6 text-cyan mx-auto mb-2" />
                <h3 className="font-medium">Business Hours</h3>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
      
      {/* SEO Rich Content */}
      <section className="mb-8 bg-navy-light border border-slate-dark rounded-lg p-6 text-left animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-slate-light">Free Online Time Zone Converter & World Clock</h2>
        <p className="text-slate mb-4">
          Sync My Clock is the best free online timezone converter designed for developers, remote teams, digital nomads, and global professionals. 
          Whether you're converting time between UTC, EST, IST, PST, GMT, or JST – our global time zone calculator helps you stay synced across the world. 
          Stop Googling "time difference between UTC and EST" and start converting instantly.
        </p>
        <p className="text-slate mb-4">
          Our timezone conversion tools include a powerful <Link to="/time-zone-converter-for-developers" className="text-cyan hover:underline">log timestamp parser</Link>, 
          international <Link to="/meeting-scheduler" className="text-cyan hover:underline">meeting scheduler</Link>, and intuitive 
          <Link to="/world-clock-sync-tool" className="text-cyan hover:underline"> world clock app</Link>
          to eliminate confusion when working across different regions. Perfect for software development teams, project managers, and digital nomads 
          who need accurate time conversion between EST, PST, UTC, GMT, IST and all major global timezones.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/utc-to-ist">
            <Badge variant="outline" className="hover:bg-navy-dark cursor-pointer">UTC to IST Converter</Badge>
          </Link>
          <Link to="/utc-to-est">
            <Badge variant="outline" className="hover:bg-navy-dark cursor-pointer">UTC to EST Converter</Badge>
          </Link>
          <Link to="/time-zone-converter-for-developers">
            <Badge variant="outline" className="hover:bg-navy-dark cursor-pointer">Developer Timezone Tools</Badge>
          </Link>
          <Link to="/world-clock-sync-tool">
            <Badge variant="outline" className="hover:bg-navy-dark cursor-pointer">World Clock Sync</Badge>
          </Link>
          <Link to="/time-zone-history">
            <Badge variant="outline" className="hover:bg-navy-dark cursor-pointer">Time Zone History</Badge>
          </Link>
          <Link to="/time-zone-travel-planner">
            <Badge variant="outline" className="hover:bg-navy-dark cursor-pointer">Travel Planner</Badge>
          </Link>
        </div>
      </section>
      
      {/* Current time card */}
      <section className="mb-12">
        <CurrentTime className="max-w-md mx-auto" />
      </section>
      
      {/* Embed Code Generator section - NEW SECTION */}
      <section className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center flex items-center justify-center gap-2">
          <LinkIcon className="h-6 w-6 text-cyan" />
          <span>Embed Tools In Your Workspace</span>
        </h2>
        <EmbedCodeGenerator />
      </section>
      
      {/* Features section */}
      <section id="features" className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
          <span className="text-cyan">&lt;</span> Time Zone Tools <span className="text-cyan">/&gt;</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Link to="/world-clock-sync-tool" className="block">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="text-lg font-medium mb-2">World Clock & Time Zone Converter</h3>
                <p className="text-sm text-slate">
                  Instantly convert times between multiple global time zones. UTC to EST, UTC to IST, and all major time zones supported.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/time-zone-converter-for-developers" className="block">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <CalendarClock className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="text-lg font-medium mb-2">Log Timestamp Parser</h3>
                <p className="text-sm text-slate">
                  Extract and convert timestamps from log files in various formats, including ISO 8601, Unix timestamps, and more.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/meeting-scheduler" className="block">
            <Card className="border border-slate-dark bg-navy-light hover:bg-navy-dark transition-colors h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="text-lg font-medium mb-2">Global Meeting Planner</h3>
                <p className="text-sm text-slate">
                  Find the perfect meeting time for your global team by visualizing overlapping working hours across time zones.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
      
      {/* Newsletter signup */}
      <section className="py-8 md:py-12">
        <NewsletterSignup />
      </section>
      
      <Separator className="my-10 bg-slate-dark" />
      
      {/* Time zone converter section */}
      <section id="converter" className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
          <Clock className="h-6 w-6 text-cyan" />
          <span>Time Zone Converter & Calculator</span>
        </h2>
        <TimeConverter />
      </section>
      
      {/* Log parser section */}
      <section id="parser" className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
          <CalendarClock className="h-6 w-6 text-cyan" />
          <span>Log Timestamp Parser</span>
        </h2>
        <LogParser />
      </section>
      
      {/* User Cases Section for SEO */}
      <section className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
          Who Uses Our Timezone Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">Remote Development Teams</h3>
              <p className="text-slate">
                Software engineers and tech leads use our timezone tools to coordinate releases, schedule standups, and manage deployment windows across distributed teams. The timestamp parser helps debug logs from different regions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">Global Project Managers</h3>
              <p className="text-slate">
                Project managers rely on Sync My Clock to schedule international meetings, track deadlines across regions, and ensure clear communication about timing with stakeholders worldwide.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">Digital Nomads & Travelers</h3>
              <p className="text-slate">
                Remote workers and travelers use our world clock to keep track of time back home, schedule calls with clients across time zones, and adapt to new local times while working internationally.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Meeting scheduler call to action */}
      <section className="py-8 md:py-12">
        <div className="bg-navy-dark border border-slate-dark rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center">
            <Users className="h-6 w-6 text-cyan" />
            <span>International Meeting Scheduler</span>
          </h2>
          <p className="text-slate mb-6 max-w-2xl mx-auto">
            Managing a distributed team? Find the best meeting times that work for everyone with our Meeting Scheduler tool.
          </p>
          <Link to="/meeting-scheduler">
            <Button
              size="lg"
              className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
            >
              <Users className="mr-2 h-4 w-4" />
              Schedule Global Team Meetings
            </Button>
          </Link>
        </div>
      </section>
      
      {/* FAQ code snippets */}
      <section className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
          <span className="text-cyan">#</span> Developer Time Zone Tools <span className="text-cyan">#</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="code-block">
            <div className="text-sm text-slate-light mb-2 terminal-prompt">Convert ISO to Unix timestamp</div>
            <pre className="text-xs text-slate overflow-x-auto"><code>
{`# JavaScript
const isoDate = "2023-05-14T15:30:45.123Z";
const unixTimestamp = Math.floor(new Date(isoDate).getTime() / 1000);
console.log(unixTimestamp); // 1684079445`}
            </code></pre>
          </div>
          
          <div className="code-block">
            <div className="text-sm text-slate-light mb-2 terminal-prompt">Format date in specific timezone</div>
            <pre className="text-xs text-slate overflow-x-auto"><code>
{`# JavaScript
const date = new Date();
const options = { 
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};
console.log(date.toLocaleString('en-US', options));`}
            </code></pre>
          </div>
        </div>
      </section>
      
      {/* SEO FAQ Section */}
      <section className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
          Time Zone Converter FAQ
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">How do I convert UTC to local time?</h3>
              <p className="text-slate">
                To convert UTC to your local time, simply select your timezone from our converter tool above. 
                Enter the UTC time you want to convert, and our tool will instantly display the equivalent time in your local timezone.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">What is the difference between GMT and UTC?</h3>
              <p className="text-slate">
                GMT (Greenwich Mean Time) is a time zone, while UTC (Coordinated Universal Time) is a time standard. 
                For most practical purposes they are the same, but UTC is maintained by atomic clocks and is used as the global reference point.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">How do I schedule meetings with teams in different time zones?</h3>
              <p className="text-slate">
                Use our <Link to="/meeting-scheduler" className="text-cyan hover:underline">Meeting Scheduler tool</Link> to input the time zones of all team members. The tool will automatically 
                find suitable meeting times that work for everyone, taking into account working hours and time differences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2 text-cyan">How do I calculate time differences between time zones?</h3>
              <p className="text-slate">
                Our <Link to="/" className="text-cyan hover:underline">Time Zone Calculator</Link> makes it easy to find the time difference between any two locations. Simply select the 
                two time zones you want to compare, and our tool will show you the current time in both zones and the exact hour difference.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Backlinks and Resource Section */}
      <section className="py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
          Resources & Further Reading
        </h2>
        <div className="bg-navy-light border border-slate-dark rounded-lg p-6">
          <p className="text-slate mb-4">
            Looking to learn more about time zones, international time management, or how to optimize your workflow across global teams? 
            Check out these helpful resources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate">
            <li>
              <Link to="/time-zone-history" className="text-cyan hover:underline">
                The History of Time Zones: How We Track Time Globally
              </Link>
            </li>
            <li>
              <Link to="/business-hours-calculator" className="text-cyan hover:underline">
                Business Hours Calculator: Find Overlapping Working Hours
              </Link>
            </li>
            <li>
              <Link to="/time-zone-travel-planner" className="text-cyan hover:underline">
                Time Zone Travel Planner: Avoid Jet Lag and Schedule Better
              </Link>
            </li>
            <li>
              <a href="https://www.timeanddate.com/worldclock/" className="text-cyan hover:underline" target="_blank" rel="noopener noreferrer">
                TimeAndDate World Clock (External Resource)
              </a>
            </li>
          </ul>
          <div className="mt-6 bg-navy-dark p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-cyan">Share Sync My Clock with Your Team</h3>
            <p className="text-slate mb-4">
              Found our tools helpful? Share Sync My Clock with your colleagues, on social media, or in relevant forums 
              for remote workers and developers. Helping others discover this free resource is greatly appreciated!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="border-slate-dark hover:bg-navy-dark hover:text-cyan">
                <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20timezone%20converter%20for%20developers%20and%20remote%20teams:%20https://syncmyclock.com" 
                  target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Share on Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" className="border-slate-dark hover:bg-navy-dark hover:text-cyan">
                <a href="https://www.reddit.com/submit?url=https://syncmyclock.com&title=Free%20Timezone%20Converter%20for%20Developers%20and%20Remote%20Teams" 
                  target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Share on Reddit
                </a>
              </Button>
              <Button variant="outline" size="sm" className="border-slate-dark hover:bg-navy-dark hover:text-cyan">
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://syncmyclock.com" 
                  target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Share on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
