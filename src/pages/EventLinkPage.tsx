
import React from 'react';
import { Helmet } from 'react-helmet';
import EventLinkCreator from '@/components/EventLinkCreator';

const EventLinkPage = () => {
  return (
    <>
      <Helmet>
        <title>EventLink - Create Time Zone-Friendly Event Links | SyncMyClock</title>
        <meta name="description" content="Create shareable event links that automatically adjust to your recipients' time zones. Perfect for scheduling global meetings and events across different time zones." />
        <meta name="keywords" content="eventlink, time zone event, meeting scheduler, global event planning, time zone converter" />
      </Helmet>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-slate-light">
            <span className="text-cyan">EventLink</span> - Share Time Zone-Friendly Events
          </h1>
          <p className="text-slate max-w-prose">
            Create and share event links that automatically adjust to your recipient's time zone.
            Perfect for coordinating meetings, webinars, and events across multiple time zones.
          </p>
        </div>
        
        <EventLinkCreator />
      </div>
    </>
  );
};

export default EventLinkPage;
