import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import DailyTimezoneFact from '@/components/DailyTimezoneFact';

interface TimeZoneCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

const TimeZoneCard = ({ title, description, icon, href, className = '' }: TimeZoneCardProps) => {
  return (
    <Link to={href}>
      <Card className={`bg-navy-dark border-slate-dark hover:border-cyan transition-colors ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-light">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TimeZoneCard;
