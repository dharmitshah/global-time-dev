
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import TimeConverter from '@/components/TimeConverter';
import Footer from '@/components/Footer';

const UTCtoEST = () => {
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
              <span className="hidden sm:inline text-sm text-slate">UTC to EST Converter</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero */}
        <section className="py-8 md:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-light mb-4">
            UTC to EST Time Converter
          </h1>
          <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
            Convert Coordinated Universal Time (UTC) to Eastern Standard Time (EST) instantly
          </p>
        </section>
        
        {/* Content */}
        <section className="mb-12 text-left bg-navy-light border border-slate-dark rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-light">Converting UTC to EST Made Simple</h2>
          <p className="text-slate mb-4">
            When converting UTC to EST (Eastern Standard Time), there's a standard offset of -5 hours. 
            This means when it's 12:00 PM in UTC, it's 7:00 AM in EST. Note that during Daylight Saving Time (EDT),
            the offset changes to UTC-4.
          </p>
          <p className="text-slate mb-4">
            Eastern Standard Time (EST) is used throughout eastern North America, covering major tech hubs like 
            New York, Toronto, Boston, and Atlanta. For software teams, remote workers, and international businesses 
            coordinating between UTC and EST time zones, having an accurate converter is essential for scheduling meetings,
            planning releases, and ensuring seamless communication.
          </p>
          <div className="flex items-center justify-center my-8 text-center">
            <div className="px-6 py-4 bg-navy-dark rounded-l-md border border-slate-dark">
              <p className="text-xl font-mono">12:00 UTC</p>
              <p className="text-xs text-slate mt-1">Coordinated Universal Time</p>
            </div>
            <ArrowRight className="mx-4 text-cyan" />
            <div className="px-6 py-4 bg-navy-dark rounded-r-md border border-cyan">
              <p className="text-xl font-mono">07:00 EST</p>
              <p className="text-xs text-slate mt-1">Eastern Standard Time</p>
            </div>
          </div>
          <p className="text-slate mb-4">
            Use our time zone converter below to accurately convert any time between UTC and EST, accounting for
            Daylight Saving Time changes when applicable. Perfect for development teams working across global offices,
            open source contributors, or anyone collaborating with teams on the East Coast of North America.
          </p>
          <Button 
            className="bg-cyan hover:bg-cyan-dark text-navy font-medium mt-2"
            onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Clock className="mr-2 h-4 w-4" />
            Convert UTC to EST Now
          </Button>
        </section>
        
        {/* Converter */}
        <section id="converter" className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
            <Clock className="h-6 w-6 text-cyan" />
            <span>UTC to EST Converter</span>
          </h2>
          <TimeConverter />
        </section>
        
        {/* Additional Info */}
        <section className="my-12 text-left">
          <Card className="border border-slate-dark bg-navy-light">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-slate-light">EST vs EDT: Understanding the Difference</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-cyan mb-2">EST (Eastern Standard Time)</h3>
                  <ul className="list-disc pl-5 text-slate space-y-1">
                    <li>UTC-5 offset</li>
                    <li>Used during winter months</li>
                    <li>Applied from November to March</li>
                    <li>Standard time for Eastern North America</li>
                    <li>5 hours behind UTC</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-cyan mb-2">EDT (Eastern Daylight Time)</h3>
                  <ul className="list-disc pl-5 text-slate space-y-1">
                    <li>UTC-4 offset</li>
                    <li>Used during summer months</li>
                    <li>Applied from March to November</li>
                    <li>Daylight saving time adjustment</li>
                    <li>4 hours behind UTC</li>
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

export default UTCtoEST;
