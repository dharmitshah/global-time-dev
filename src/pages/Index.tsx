import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Globe, CalendarClock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import CurrentTime from '@/components/CurrentTime';
import TimeConverter from '@/components/TimeConverter';
import LogParser from '@/components/LogParser';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 md:px-8">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-cyan" />
              <h1 className="text-xl font-bold tracking-tight">DevTimeZone</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate">Time management for developers</span>
              <Badge variant="outline" className="border-cyan text-cyan">Beta</Badge>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero section */}
        <section className="py-8 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-light mb-4">
              Time conversion for <span className="text-cyan terminal-prompt">developers worldwide</span>
            </h2>
            <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
              Convert timestamps across global time zones, parse log timestamps, and collaborate seamlessly with distributed teams.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
                onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Clock className="mr-2 h-4 w-4" />
                Start Converting
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-dark hover:bg-navy-dark hover:text-cyan hover:border-cyan"
                onClick={() => window.location.href = '/meeting-scheduler'}
              >
                <Users className="mr-2 h-4 w-4" />
                Schedule Team Meetings
              </Button>
              <Button 
                variant="secondary"
                size="lg" 
                className="border-slate-dark bg-navy-dark hover:bg-navy hover:text-cyan"
                onClick={() => document.getElementById('parser')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                Log Parser
              </Button>
            </div>
          </div>
        </section>
        
        {/* SEO Rich Content */}
        <section className="mb-8 bg-navy-light border border-slate-dark rounded-lg p-6 text-left animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-slate-light">What is Sync My Clock?</h2>
          <p className="text-slate mb-4">
            Sync My Clock is a free online timezone converter designed for developers, remote teams, and global professionals. 
            Whether you're converting time between UTC, EST, IST, or JST – this tool helps you stay synced across the world. 
            Stop Googling time zones and start converting instantly.
          </p>
          <p className="text-slate mb-4">
            Our timezone conversion tools include a powerful log timestamp parser, global meeting scheduler, and intuitive time converter
            to eliminate confusion when working across different regions. Perfect for software development teams, project managers, and digital nomads 
            who need accurate time conversion between EST, PST, UTC, GMT, IST and all major global timezones.
          </p>
          <p className="text-slate mb-4">
            Time zone conversion has never been easier. Whether you're scheduling international meetings, coordinating software releases,
            or just trying to connect with colleagues abroad, our tool handles the complex calculations instantly. Convert any time from 
            UTC to local time, plan meetings that work for everyone, and never miss a deadline due to time confusion again.
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
          </div>
        </section>
        
        {/* Current time card */}
        <section className="mb-12">
          <CurrentTime className="max-w-md mx-auto" />
        </section>
        
        {/* Features section */}
        <section id="features" className="py-8 md:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
            <span className="text-cyan">&lt;</span> Features <span className="text-cyan">/&gt;</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="text-lg font-medium mb-2">Time Zone Conversion</h3>
                <p className="text-sm text-slate">
                  Instantly convert times between multiple global time zones for easier coordination with distributed teams.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <CalendarClock className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="text-lg font-medium mb-2">Log Timestamp Parser</h3>
                <p className="text-sm text-slate">
                  Extract and convert timestamps from log files in various formats, including ISO 8601 and Unix timestamps.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="text-lg font-medium mb-2">Meeting Scheduler</h3>
                <p className="text-sm text-slate">
                  Find the perfect meeting time for your global team by visualizing overlapping working hours across time zones.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Separator className="my-10 bg-slate-dark" />
        
        {/* Time zone converter section */}
        <section id="converter" className="py-8 md:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
            <Clock className="h-6 w-6 text-cyan" />
            <span>Time Zone Converter</span>
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
        
        {/* Meeting scheduler call to action */}
        <section className="py-8 md:py-12">
          <div className="bg-navy-dark border border-slate-dark rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center">
              <Users className="h-6 w-6 text-cyan" />
              <span>Global Team Management</span>
            </h2>
            <p className="text-slate mb-6 max-w-2xl mx-auto">
              Managing a distributed team? Find the best meeting times that work for everyone with our Meeting Scheduler tool.
            </p>
            <Button
              size="lg"
              className="bg-cyan hover:bg-cyan-dark text-navy font-medium"
              onClick={() => window.location.href = '/meeting-scheduler'}
            >
              <Users className="mr-2 h-4 w-4" />
              Schedule Team Meetings
            </Button>
          </div>
        </section>
        
        {/* FAQ code snippets */}
        <section className="py-8 md:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">
            <span className="text-cyan">#</span> Developer Tips <span className="text-cyan">#</span>
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
            Frequently Asked Questions
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
                  Use our Meeting Scheduler tool to input the time zones of all team members. The tool will automatically 
                  find suitable meeting times that work for everyone, taking into account working hours and time differences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2 text-cyan">How do I convert timestamps in log files?</h3>
                <p className="text-slate">
                  Our Log Parser tool can automatically detect and convert timestamps in various formats. Simply paste your log data, 
                  select the source format and target timezone, and the tool will convert all timestamps for you.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
