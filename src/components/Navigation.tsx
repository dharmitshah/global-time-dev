
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem
} from '@/components/ui/navigation-menu';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Clock, Menu, ChevronDown } from 'lucide-react';

// Reorganized routes with grouping
const mainRoutes = [
  { name: 'Home', path: '/' },
  { name: 'Meeting Scheduler', path: '/meeting-scheduler' },
];

const conversionRoutes = [
  { name: 'UTC to IST', path: '/utc-to-ist' },
  { name: 'UTC to EST', path: '/utc-to-est' },
  { name: 'Developer Tools', path: '/time-zone-converter-for-developers' },
];

const toolsRoutes = [
  { name: 'World Clock', path: '/world-clock-sync-tool' },
  { name: 'Travel Planner', path: '/time-zone-travel-planner' },
  { name: 'Time Zone History', path: '/time-zone-history' },
  { name: 'Business Hours', path: '/business-hours-calculator' },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="border-b border-slate-dark bg-navy py-3 sticky top-0 z-50">
      <div className="container max-w-6xl px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-cyan" />
          <h1 className="text-xl font-bold tracking-tight text-slate-light">DevTimeZone</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {mainRoutes.map((route) => (
                <NavigationMenuItem key={route.path}>
                  <Link 
                    to={route.path}
                    className={cn(
                      "block px-3 py-2 text-sm hover:text-cyan transition-colors",
                      location.pathname === route.path ? "text-cyan" : "text-slate-light"
                    )}
                  >
                    {route.name}
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* Conversion Tools Dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm hover:text-cyan transition-colors",
                        conversionRoutes.some(route => location.pathname === route.path) ? "text-cyan" : "text-slate-light"
                      )}
                    >
                      Conversion Tools <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-navy-light border-slate-dark">
                    {conversionRoutes.map((route) => (
                      <DropdownMenuItem key={route.path} asChild>
                        <Link 
                          to={route.path}
                          className={cn(
                            "w-full px-3 py-2 text-sm hover:text-cyan transition-colors",
                            location.pathname === route.path ? "text-cyan" : "text-slate-light"
                          )}
                        >
                          {route.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              {/* Additional Tools Dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm hover:text-cyan transition-colors",
                        toolsRoutes.some(route => location.pathname === route.path) ? "text-cyan" : "text-slate-light"
                      )}
                    >
                      Tools & Resources <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-navy-light border-slate-dark">
                    {toolsRoutes.map((route) => (
                      <DropdownMenuItem key={route.path} asChild>
                        <Link 
                          to={route.path}
                          className={cn(
                            "w-full px-3 py-2 text-sm hover:text-cyan transition-colors",
                            location.pathname === route.path ? "text-cyan" : "text-slate-light"
                          )}
                        >
                          {route.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-light hover:text-cyan"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-navy-light border-y border-slate-dark py-2 shadow-md">
              <div className="container max-w-6xl px-4 mx-auto flex flex-col">
                {mainRoutes.map((route) => (
                  <Link 
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "block px-3 py-2.5 text-sm hover:text-cyan transition-colors border-b border-slate-dark",
                      location.pathname === route.path ? "text-cyan" : "text-slate-light"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                
                {/* Mobile: Conversion Tools Section */}
                <div className="px-3 py-2 text-xs uppercase tracking-wider text-slate mt-2">Conversion Tools</div>
                {conversionRoutes.map((route) => (
                  <Link 
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "block px-3 py-2.5 text-sm hover:text-cyan transition-colors border-b border-slate-dark",
                      location.pathname === route.path ? "text-cyan" : "text-slate-light"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                
                {/* Mobile: Additional Tools Section */}
                <div className="px-3 py-2 text-xs uppercase tracking-wider text-slate mt-2">Tools & Resources</div>
                {toolsRoutes.map((route) => (
                  <Link 
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "block px-3 py-2.5 text-sm hover:text-cyan transition-colors border-b border-slate-dark last:border-0",
                      location.pathname === route.path ? "text-cyan" : "text-slate-light"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
