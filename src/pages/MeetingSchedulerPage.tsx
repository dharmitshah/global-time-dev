
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Users, Clock, ArrowDown } from 'lucide-react';
import MeetingScheduler from '@/components/MeetingScheduler';
import Footer from '@/components/Footer';

const MeetingSchedulerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 md:px-8 bg-navy-dark">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-cyan" />
              <h1 className="text-xl font-bold tracking-tight">DevTimeZone</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate">Time management for developers</span>
              <Button 
                variant="outline" 
                className="border-slate-dark hover:bg-navy-light hover:text-cyan hover:border-cyan ml-2"
                onClick={() => window.location.href = '/'}
              >
                <Clock className="mr-2 h-4 w-4" />
                Time Converter
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-6xl px-4 sm:px-6 md:px-8 mb-8">
        {/* Hero section */}
        <section className="py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-light mb-4">
              Global Team <span className="text-cyan">Meeting Scheduler</span>
            </h2>
            <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
              Find the perfect meeting times for your distributed team across multiple time zones
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button 
                variant="default" 
                className="bg-cyan hover:bg-cyan/80 text-navy-dark"
                onClick={() => {
                  const schedulerElement = document.getElementById('scheduler-section');
                  if (schedulerElement) {
                    schedulerElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Started
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8">
              <div className="p-4 border border-slate-dark rounded-lg bg-navy-dark">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyan" />
                  Add Team Members
                </h3>
                <p className="text-sm text-slate">Select the time zones where your team is located to include them in scheduling</p>
              </div>
              
              <div className="p-4 border border-slate-dark rounded-lg bg-navy-dark">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan" />
                  View Availability
                </h3>
                <p className="text-sm text-slate">See optimal meeting times with a visual representation of each team member's working hours</p>
              </div>
              
              <div className="p-4 border border-slate-dark rounded-lg bg-navy-dark">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cyan"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                  Share Schedule
                </h3>
                <p className="text-sm text-slate">Generate a link to share your team's availability with others or save for later</p>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="my-6 bg-slate-dark" />
        
        {/* Meeting scheduler section */}
        <section id="scheduler-section" className="py-8 scroll-mt-8">
          <MeetingScheduler />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MeetingSchedulerPage;
