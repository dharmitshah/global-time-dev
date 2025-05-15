
import { useEffect, useState } from 'react';
import { getDailyTimezoneFact } from '@/utils/timezoneFacts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';

interface DailyTimezoneFactProps {
  className?: string;
}

const DailyTimezoneFact = ({ className = '' }: DailyTimezoneFactProps) => {
  const [fact, setFact] = useState('');
  const [todayStr, setTodayStr] = useState('');

  useEffect(() => {
    // Get today's fact
    const todaysFact = getDailyTimezoneFact();
    setFact(todaysFact);
    
    // Format today's date
    const today = new Date();
    setTodayStr(today.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    }));
  }, []);

  return (
    <Card className={`bg-navy-dark border-slate-dark ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-cyan" />
          Daily Timezone Fact
        </CardTitle>
        <div className="text-xs text-slate flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {todayStr}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{fact}</p>
      </CardContent>
    </Card>
  );
};

export default DailyTimezoneFact;
