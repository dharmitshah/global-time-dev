
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import EventLinkViewer from '@/components/EventLinkViewer';
import { Skeleton } from '@/components/ui/skeleton';

const EventLinkViewPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>View Event Details | EventLink by SyncMyClock</title>
        <meta name="description" content="View the details of this time zone-friendly event. Time is automatically adjusted to your local time zone." />
        <meta name="robots" content="noindex" /> 
      </Helmet>
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ) : (
          <EventLinkViewer eventId={id || ''} />
        )}
      </div>
    </>
  );
};

export default EventLinkViewPage;
