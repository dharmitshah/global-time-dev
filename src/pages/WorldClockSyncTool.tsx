
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Globe, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CurrentTime from '@/components/CurrentTime';
import TimeConverter from '@/components/TimeConverter';
import Footer from '@/components/Footer';

const WorldClockSyncTool = () => {
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
              <span className="hidden sm:inline text-sm text-slate">World Clock</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero */}
        <section className="py-8 md:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-light mb-4">
            World Clock Sync Tool
          </h1>
          <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
            View and compare accurate times across multiple global time zones simultaneously
          </p>
        </section>

        {/* Current time */}
        <section className="mb-8">
          <CurrentTime className="max-w-md mx-auto" />
        </section>
        
        {/* Content */}
        <section className="mb-12 text-left bg-navy-light border border-slate-dark rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-light">Global Time Synchronization Made Easy</h2>
          <p className="text-slate mb-4">
            The World Clock Sync Tool helps teams, travelers, and global professionals stay synchronized 
            across multiple time zones. Whether you're managing a distributed team, coordinating international 
            projects, or planning travel across regions, our tool provides accurate, real-time comparisons of 
            clocks around the world.
          </p>
          <p className="text-slate mb-4">
            Unlike standard world clock tools, Sync My Clock is designed for quick comparisons and sharing. 
            Add just the time zones you need, create custom configurations for your team or project, and share 
            links that preserve your exact time zone selection. Perfect for global organizations, remote teams, 
            and individuals working across borders.
          </p>
          <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-navy-dark p-3 rounded border border-slate-dark">
              <p className="text-xs text-slate mb-1">New York</p>
              <p className="text-lg font-mono">10:30 AM</p>
            </div>
            <div className="bg-navy-dark p-3 rounded border border-slate-dark">
              <p className="text-xs text-slate mb-1">London</p>
              <p className="text-lg font-mono">3:30 PM</p>
            </div>
            <div className="bg-navy-dark p-3 rounded border border-slate-dark">
              <p className="text-xs text-slate mb-1">Tokyo</p>
              <p className="text-lg font-mono">11:30 PM</p>
            </div>
            <div className="bg-navy-dark p-3 rounded border border-cyan">
              <p className="text-xs text-slate mb-1">Sydney</p>
              <p className="text-lg font-mono">1:30 AM</p>
            </div>
          </div>
          <p className="text-slate mb-4">
            Use our world clock below to add, remove, and compare times across any combination of global time zones. 
            Create your perfect view for project management, team coordination, or travel planning.
          </p>
          <Button 
            className="bg-cyan hover:bg-cyan-dark text-navy font-medium mt-2"
            onClick={() => document.getElementById('clock')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Globe className="mr-2 h-4 w-4" />
            Open World Clock Tool
          </Button>
        </section>
        
        {/* World clock */}
        <section id="clock" className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 flex items-center gap-2 justify-center">
            <Globe className="h-6 w-6 text-cyan" />
            <span>World Clock Tool</span>
          </h2>
          <TimeConverter />
        </section>
        
        {/* Use cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-light mb-6 text-center">Popular Use Cases</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Remote Team Management</h3>
                <p className="text-sm text-slate">
                  Coordinate distributed teams across multiple countries and time zones. 
                  Ensure meeting times work for everyone and understand when team members are working.
                </p>
                <Link to="/meeting-scheduler" className="mt-4 text-cyan text-sm inline-block hover:underline">
                  Open Meeting Scheduler →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">International Business</h3>
                <p className="text-sm text-slate">
                  Schedule calls with global clients and partners at convenient times. 
                  Avoid mistakes when planning international business activities and deadlines.
                </p>
                <Link to="/" className="mt-4 text-cyan text-sm inline-block hover:underline">
                  View Common Business Hours →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-dark bg-navy-light">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">Travel Planning</h3>
                <p className="text-sm text-slate">
                  Calculate arrival times, plan communications home while traveling, 
                  and adjust to new time zones more easily with accurate comparisons.
                </p>
                <Button 
                  variant="link" 
                  className="mt-2 p-0 h-auto text-cyan text-sm"
                  onClick={() => document.getElementById('clock')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Add Your Destinations →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorldClockSyncTool;
