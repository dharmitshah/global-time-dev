
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimeZoneSelectorProps {
  onSelect: (timeZone: string) => void;
  selectedTimeZones: string[];
}

// Common time zones for developers frequently working with global teams
const POPULAR_TIMEZONES = [
  'America/Los_Angeles', // US West Coast
  'America/New_York',    // US East Coast
  'Europe/London',       // UK
  'Europe/Berlin',       // Central Europe
  'Asia/Dubai',          // UAE
  'Asia/Kolkata',        // India
  'Asia/Singapore',      // Singapore
  'Asia/Tokyo',          // Japan
  'Australia/Sydney',    // Australia
  'Pacific/Auckland',    // New Zealand
];

const TimeZoneSelector = ({ onSelect, selectedTimeZones }: TimeZoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    try {
      // Try to get all available time zones from Intl API
      const availableTimeZones = Intl.supportedValuesOf('timeZone');
      setTimeZones(availableTimeZones);
    } catch (error) {
      console.error("Could not get available time zones:", error);
      // Fallback to popular time zones if API is not available
      setTimeZones(POPULAR_TIMEZONES);
    }
  }, []);
  
  const handleSelect = (timeZone: string) => {
    setValue(timeZone);
    setOpen(false);
    onSelect(timeZone);
    setValue(""); // Reset value after selection
  };
  
  // Simplify timezone name for display
  const formatTimeZone = (timeZone: string) => {
    const parts = timeZone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  };
  
  // Filter out already selected time zones
  const availableTimeZones = timeZones.filter(zone => !selectedTimeZones.includes(zone));
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[250px] justify-between bg-navy-light border-slate-dark text-slate-light hover:bg-navy hover:text-cyan hover:border-cyan"
        >
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan" />
            {value ? formatTimeZone(value) : "Add a time zone..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[250px] p-0 bg-navy-light border-slate-dark">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search time zone..." 
            className="h-9 text-slate-light"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No time zone found.</CommandEmpty>
            <ScrollArea className="h-[300px]">
              <CommandGroup heading="Popular time zones">
                {POPULAR_TIMEZONES.filter(zone => 
                  !selectedTimeZones.includes(zone) &&
                  (zone.toLowerCase().includes(search.toLowerCase()) ||
                   formatTimeZone(zone).toLowerCase().includes(search.toLowerCase()))
                ).map(zone => (
                  <CommandItem
                    key={zone}
                    value={zone}
                    onSelect={() => handleSelect(zone)}
                    className="flex items-center justify-between cursor-pointer hover:bg-navy hover:text-cyan"
                  >
                    <span>{formatTimeZone(zone)}</span>
                    <span className="text-xs text-slate">{zone}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {availableTimeZones.length > POPULAR_TIMEZONES.length && (
                <CommandGroup heading="All time zones">
                  {availableTimeZones
                    .filter(zone => 
                      !POPULAR_TIMEZONES.includes(zone) && 
                      !selectedTimeZones.includes(zone) &&
                      (zone.toLowerCase().includes(search.toLowerCase()) ||
                      formatTimeZone(zone).toLowerCase().includes(search.toLowerCase()))
                    )
                    .map(zone => (
                      <CommandItem
                        key={zone}
                        value={zone}
                        onSelect={() => handleSelect(zone)}
                        className="flex items-center justify-between cursor-pointer hover:bg-navy hover:text-cyan"
                      >
                        <span>{formatTimeZone(zone)}</span>
                        <span className="text-xs text-slate">{zone}</span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimeZoneSelector;
