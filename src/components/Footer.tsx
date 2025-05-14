
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 mb-8 text-center text-sm text-slate">
      <Separator className="mb-6 bg-slate-dark" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-cyan" />
          <span className="font-medium text-slate-light">DevTimeZone</span>
          <Badge variant="outline" className="text-[10px] py-0 h-4 border-slate-dark">
            v1.0.0
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <span>Built for developers worldwide</span>
          <Globe className="h-3.5 w-3.5 text-cyan" />
        </div>
        
        <div className="text-xs flex gap-4">
          <a href="#features" className="hover:text-cyan transition-colors">Features</a>
          <a href="#converter" className="hover:text-cyan transition-colors">Converter</a>
          <a href="#parser" className="hover:text-cyan transition-colors">Log Parser</a>
        </div>
      </div>
      
      <p className="mt-6 text-xs">
        &copy; {new Date().getFullYear()} DevTimeZone. All timestamps are displayed in your local timezone unless specified.
      </p>
    </footer>
  );
};

export default Footer;
