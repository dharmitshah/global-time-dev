
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Users, Clock } from 'lucide-react';
import MeetingScheduler from '@/components/MeetingScheduler';
import Footer from '@/components/Footer';

const MeetingSchedulerPage = () => {
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
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero section */}
        <section className="py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-light mb-4">
              Meeting <span className="text-cyan">Scheduler</span>
            </h2>
            <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
              Find the optimal meeting times for your global team across multiple time zones
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="outline" 
                className="border-slate-dark hover:bg-navy-dark hover:text-cyan hover:border-cyan"
                onClick={() => window.location.href = '/'}
              >
                <Clock className="mr-2 h-4 w-4" />
                Back to Time Converter
              </Button>
            </div>
          </div>
        </section>
        
        <Separator className="my-6 bg-slate-dark" />
        
        {/* Meeting scheduler section */}
        <section className="py-8">
          <MeetingScheduler />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MeetingSchedulerPage;
