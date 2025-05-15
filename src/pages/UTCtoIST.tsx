
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import TimeConverter from '@/components/TimeConverter';
import Footer from '@/components/Footer';

const UTCtoIST = () => {
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
              <span className="hidden sm:inline text-sm text-slate">UTC to IST Converter</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero */}
        <section className="py-8 md:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-light mb-4">
            UTC to IST Time Converter
          </h1>
          <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
            Convert Coordinated Universal Time (UTC) to Indian Standard Time (IST) instantly
          </p>
        </section>
        
        {/* Content */}
        <section className="mb-12 text-left bg-navy-light border border-slate-dark rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-light">Converting UTC to IST Made Simple</h2>
          <p className="text-slate mb-4">
            UTC (Coordinated Universal Time) and IST (Indian Standard Time) have a fixed offset of +5:30 hours. 
            This means when it's 12:00 PM (noon) in UTC, it's 5:30 PM in IST. 
            Whether you're coordinating meetings with team members in India, scheduling deployments, or analyzing 
            server logs, our UTC to IST converter helps you avoid time-zone confusion.
          </p>
          <p className="text-slate mb-4">
            India operates on a single time zone (IST) which is UTC+5:30, while UTC serves as the global time standard 
            from which all other time zones are calculated. For developers and remote teams working between these regions, 
            accurate time conversion is essential for successful collaboration.
          </p>
          <div className="flex items-center justify-center my-8 text-center">
            <div className="px-6 py-4 bg-navy-dark rounded-l-md border border-slate-dark">
              <p className="text-xl font-mono">12:00 UTC</p>
              <p className="text-xs text-slate mt-1">Coordinated Universal Time</p>
            </div>
            <ArrowRight className="mx-4 text-cyan" />
            <div className="px-6 py-4 bg-navy-dark rounded-r-md border border-cyan">
              <p className="text-xl font-mono">17:30 IST</p>
              <p className="text-xs text-slate mt-1">Indian Standard Time</p>
            </div>
          </div>
          <p className="text-slate mb-4">
            Use our time zone converter below to accurately convert any time between UTC and IST, or 
            add additional time zones to compare multiple regions simultaneously. Perfect for software development 
            teams, project managers, and global businesses working with partners in India.
          </p>
          <Button 
            className="bg-cyan hover:bg-cyan-dark text-navy font-medium mt-2"
            onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Clock className="mr-2 h-4 w-4" />
            Convert UTC to IST Now
          </Button>
        </section>
        
        {/* Converter */}
        <section id="converter" className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
            <Clock className="h-6 w-6 text-cyan" />
            <span>UTC to IST Converter</span>
          </h2>
          <TimeConverter />
        </section>
        
        {/* Additional Info */}
        <section className="my-12 text-left">
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-slate-light">UTC and IST Quick Facts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-cyan mb-2">UTC (Coordinated Universal Time)</h3>
                  <ul className="list-disc pl-5 text-slate space-y-1">
                    <li>Global time standard</li>
                    <li>No daylight saving time adjustments</li>
                    <li>Reference for all time zones</li>
                    <li>Used in aviation, weather forecasts, and servers</li>
                    <li>Formerly known as GMT (Greenwich Mean Time)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-cyan mb-2">IST (Indian Standard Time)</h3>
                  <ul className="list-disc pl-5 text-slate space-y-1">
                    <li>UTC+5:30 offset</li>
                    <li>Used throughout India</li>
                    <li>No daylight saving time</li>
                    <li>Covers major tech hubs like Bangalore, Hyderabad, and Delhi</li>
                    <li>5 hours and 30 minutes ahead of UTC</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/">
                  <Button variant="outline" className="border-slate-dark hover:bg-navy hover:text-cyan hover:border-cyan">
                    <Globe className="mr-2 h-4 w-4" />
                    Explore All Time Zone Tools
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UTCtoIST;
