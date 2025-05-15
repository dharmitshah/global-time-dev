
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Code, Terminal, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TimeConverter from '@/components/TimeConverter';
import LogParser from '@/components/LogParser';
import Footer from '@/components/Footer';

const TimeZoneConverterForDevelopers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 md:px-8">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-cyan" />
              <h1 className="text-xl font-bold tracking-tight">DevTimeZone</h1>
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate">Developer Tools</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero */}
        <section className="py-8 md:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-light mb-4">
            Time Zone Converter for Developers
          </h1>
          <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
            Purpose-built time zone tools for software engineers, DevOps teams, and technical professionals
          </p>
        </section>
        
        {/* Content */}
        <section className="mb-12 text-left bg-navy-light border border-slate-dark rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-light">Time Zone Tools for Modern Development Teams</h2>
          <p className="text-slate mb-4">
            In today's distributed development environment, managing time zones effectively is crucial for collaboration. 
            Whether you're debugging timestamp issues, coordinating deployments across multiple regions, or scheduling standup 
            meetings with remote teammates, our developer-focused time tools streamline your workflow.
          </p>
          <p className="text-slate mb-4">
            Sync My Clock provides specialized time conversion tools designed specifically for software engineers, 
            DevOps professionals, SREs, and technical teams working across global regions. Parse timestamps from logs, 
            convert between common development time formats (ISO 8601, Unix epoch), and coordinate effectively with team 
            members across UTC, EST, PST, IST and other tech hub time zones.
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <Card className="border border-slate-dark bg-navy-dark">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Code className="h-10 w-10 text-cyan my-4" />
                <h3 className="font-bold mb-2">Log Timestamp Parser</h3>
                <p className="text-sm text-slate">Extract and normalize timestamps from logs, server outputs, and error messages</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-dark bg-navy-dark">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Terminal className="h-10 w-10 text-cyan my-4" />
                <h3 className="font-bold mb-2">Unix Epoch Converter</h3>
                <p className="text-sm text-slate">Convert between human-readable dates and Unix timestamps with millisecond precision</p>
              </CardContent>
            </Card>
            <Card className="border border-slate-dark bg-navy-dark">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-10 w-10 text-cyan my-4" />
                <h3 className="font-bold mb-2">Meeting Scheduler</h3>
                <p className="text-sm text-slate">Find optimal meeting times for distributed development teams</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Code examples */}
        <section className="mb-12 text-left">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-cyan" />
            <span>Developer Time Zone Code Snippets</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="code-block">
              <div className="text-sm text-slate-light mb-2 terminal-prompt">JavaScript: Format date with timezone</div>
              <pre className="text-xs text-slate overflow-x-auto"><code>
{`// Format date in specific timezone
const options = { 
  timeZone: 'America/Los_Angeles',
  hour: '2-digit', 
  minute: '2-digit',
  hour12: false
};

const currentTime = new Date()
  .toLocaleString('en-US', options);
  
console.log(currentTime); // "14:30"`}
              </code></pre>
            </div>
            
            <div className="code-block">
              <div className="text-sm text-slate-light mb-2 terminal-prompt">Python: Working with timezones</div>
              <pre className="text-xs text-slate overflow-x-auto"><code>
{`# Python timezone conversion
from datetime import datetime
import pytz

# UTC time
utc_now = datetime.now(pytz.utc)
print(f"UTC: {utc_now.strftime('%H:%M')}")

# Convert to IST
ist_time = utc_now.astimezone(pytz.timezone('Asia/Kolkata'))
print(f"IST: {ist_time.strftime('%H:%M')}")`}
              </code></pre>
            </div>
          </div>
          
          <div className="my-8">
            <div className="code-block">
              <div className="text-sm text-slate-light mb-2 terminal-prompt">Git: Configure commit timezone</div>
              <pre className="text-xs text-slate overflow-x-auto"><code>
{`# Set Git to always use UTC for commits
git config --global log.date iso

# View commits with timezone info
git log --date=iso-strict`}
              </code></pre>
            </div>
          </div>
        </section>
        
        <Separator className="my-10 bg-slate-dark" />
        
        {/* Tools sections */}
        <section id="converter" className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
            <Clock className="h-6 w-6 text-cyan" />
            <span>Developer Time Zone Converter</span>
          </h2>
          <TimeConverter />
        </section>
        
        <section id="parser" className="py-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
            <Terminal className="h-6 w-6 text-cyan" />
            <span>Log Timestamp Parser</span>
          </h2>
          <LogParser />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimeZoneConverterForDevelopers;
