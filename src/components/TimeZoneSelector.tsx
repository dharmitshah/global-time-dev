
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

// Comprehensive list of timezones organized by continent/region
const TIME_ZONES = {
  'Africa': [
    'Africa/Abidjan', 'Africa/Accra', 'Africa/Algiers', 'Africa/Bissau', 'Africa/Cairo',
    'Africa/Casablanca', 'Africa/Ceuta', 'Africa/El_Aaiun', 'Africa/Johannesburg', 'Africa/Juba',
    'Africa/Khartoum', 'Africa/Lagos', 'Africa/Maputo', 'Africa/Monrovia', 'Africa/Nairobi',
    'Africa/Ndjamena', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek'
  ],
  'America': [
    'America/Adak', 'America/Anchorage', 'America/Araguaina', 'America/Argentina/Buenos_Aires',
    'America/Asuncion', 'America/Atikokan', 'America/Bahia', 'America/Bahia_Banderas',
    'America/Barbados', 'America/Belem', 'America/Belize', 'America/Blanc-Sablon',
    'America/Bogota', 'America/Boise', 'America/Cambridge_Bay', 'America/Campo_Grande',
    'America/Cancun', 'America/Caracas', 'America/Cayenne', 'America/Chicago',
    'America/Chihuahua', 'America/Costa_Rica', 'America/Creston', 'America/Cuiaba',
    'America/Curacao', 'America/Danmarkshavn', 'America/Dawson', 'America/Dawson_Creek',
    'America/Denver', 'America/Detroit', 'America/Edmonton', 'America/Eirunepe',
    'America/El_Salvador', 'America/Fort_Nelson', 'America/Fortaleza', 'America/Glace_Bay',
    'America/Goose_Bay', 'America/Grand_Turk', 'America/Guatemala', 'America/Guayaquil',
    'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo',
    'America/Indiana/Indianapolis', 'America/Inuvik', 'America/Iqaluit', 'America/Jamaica',
    'America/Juneau', 'America/Kentucky/Louisville', 'America/La_Paz', 'America/Lima',
    'America/Los_Angeles', 'America/Maceio', 'America/Managua', 'America/Manaus',
    'America/Martinique', 'America/Matamoros', 'America/Mazatlan', 'America/Menominee',
    'America/Merida', 'America/Metlakatla', 'America/Mexico_City', 'America/Miquelon',
    'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Montreal',
    'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Nome',
    'America/Noronha', 'America/Ojinaga', 'America/Panama', 'America/Pangnirtung',
    'America/Paramaribo', 'America/Phoenix', 'America/Port-au-Prince', 'America/Port_of_Spain',
    'America/Porto_Velho', 'America/Puerto_Rico', 'America/Punta_Arenas', 'America/Rainy_River',
    'America/Rankin_Inlet', 'America/Recife', 'America/Regina', 'America/Resolute',
    'America/Rio_Branco', 'America/Santarem', 'America/Santiago', 'America/Santo_Domingo',
    'America/Sao_Paulo', 'America/Scoresbysund', 'America/Sitka', 'America/St_Johns',
    'America/Swift_Current', 'America/Tegucigalpa', 'America/Thule', 'America/Tijuana',
    'America/Toronto', 'America/Vancouver', 'America/Whitehorse', 'America/Winnipeg',
    'America/Yakutat', 'America/Yellowknife'
  ],
  'Antarctica': [
    'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Macquarie',
    'Antarctica/Mawson', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/Syowa',
    'Antarctica/Troll', 'Antarctica/Vostok'
  ],
  'Asia': [
    'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe',
    'Asia/Ashgabat', 'Asia/Atyrau', 'Asia/Baghdad', 'Asia/Baku', 'Asia/Bangkok',
    'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei', 'Asia/Chita',
    'Asia/Choibalsan', 'Asia/Colombo', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili',
    'Asia/Dubai', 'Asia/Dushanbe', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Hebron',
    'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Jakarta',
    'Asia/Jayapura', 'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi',
    'Asia/Kathmandu', 'Asia/Khandyga', 'Asia/Kolkata', 'Asia/Krasnoyarsk', 'Asia/Kuala_Lumpur',
    'Asia/Kuching', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar', 'Asia/Manila',
    'Asia/Nicosia', 'Asia/Novokuznetsk', 'Asia/Novosibirsk', 'Asia/Omsk', 'Asia/Oral',
    'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar', 'Asia/Qostanay', 'Asia/Qyzylorda',
    'Asia/Riyadh', 'Asia/Sakhalin', 'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai',
    'Asia/Singapore', 'Asia/Srednekolymsk', 'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi',
    'Asia/Tehran', 'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ulaanbaatar',
    'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vladivostok', 'Asia/Yakutsk', 'Asia/Yangon',
    'Asia/Yekaterinburg', 'Asia/Yerevan'
  ],
  'Atlantic': [
    'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde',
    'Atlantic/Faroe', 'Atlantic/Madeira', 'Atlantic/Reykjavik', 'Atlantic/South_Georgia',
    'Atlantic/Stanley'
  ],
  'Australia': [
    'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill', 'Australia/Darwin',
    'Australia/Eucla', 'Australia/Hobart', 'Australia/Lindeman', 'Australia/Lord_Howe',
    'Australia/Melbourne', 'Australia/Perth', 'Australia/Sydney'
  ],
  'Europe': [
    'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belgrade',
    'Europe/Berlin', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest', 'Europe/Chisinau',
    'Europe/Copenhagen', 'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Helsinki', 'Europe/Istanbul',
    'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov', 'Europe/Lisbon', 'Europe/London',
    'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta', 'Europe/Minsk', 'Europe/Monaco',
    'Europe/Moscow', 'Europe/Oslo', 'Europe/Paris', 'Europe/Prague', 'Europe/Riga',
    'Europe/Rome', 'Europe/Samara', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Sofia',
    'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Ulyanovsk', 'Europe/Uzhgorod',
    'Europe/Vienna', 'Europe/Vilnius', 'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zaporozhye',
    'Europe/Zurich'
  ],
  'Indian': [
    'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos',
    'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe', 'Indian/Maldives',
    'Indian/Mauritius', 'Indian/Mayotte', 'Indian/Reunion'
  ],
  'Pacific': [
    'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville', 'Pacific/Chatham',
    'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury',
    'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos',
    'Pacific/Gambier', 'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu',
    'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro',
    'Pacific/Marquesas', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk',
    'Pacific/Noumea', 'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn',
    'Pacific/Pohnpei', 'Pacific/Port_Moresby', 'Pacific/Rarotonga', 'Pacific/Tahiti',
    'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Wake', 'Pacific/Wallis'
  ]
};

// Popular time zones that should appear at the top
const POPULAR_TIMEZONES = [
  'America/Los_Angeles', // US West Coast
  'America/Denver',      // US Mountain
  'America/Chicago',     // US Central
  'America/New_York',    // US East Coast
  'America/Toronto',     // Canada Eastern
  'America/Vancouver',   // Canada Western
  'America/Mexico_City', // Mexico
  'America/Sao_Paulo',   // Brazil
  'Europe/London',       // UK
  'Europe/Paris',        // France
  'Europe/Berlin',       // Germany
  'Europe/Moscow',       // Russia
  'Africa/Cairo',        // Egypt
  'Africa/Johannesburg', // South Africa
  'Asia/Dubai',          // UAE
  'Asia/Kolkata',        // India
  'Asia/Singapore',      // Singapore
  'Asia/Tokyo',          // Japan
  'Asia/Shanghai',       // China
  'Australia/Sydney',    // Australia Eastern
  'Australia/Perth',     // Australia Western
  'Pacific/Auckland',    // New Zealand
];

const TimeZoneSelector = ({ onSelect, selectedTimeZones }: TimeZoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    try {
      // Collect all time zones from our predefined list
      const allTimeZones = Object.values(TIME_ZONES).flat();
      setTimeZones(Array.from(new Set([...POPULAR_TIMEZONES, ...allTimeZones])));
    } catch (error) {
      console.error("Could not get available time zones:", error);
      // Fallback to popular time zones if there's an error
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

  // Get current time for a timezone
  const getCurrentTime = (timeZone: string) => {
    try {
      return new Date().toLocaleTimeString('en-US', { 
        timeZone, 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return '';
    }
  };

  // Toggle a region's expanded state
  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };

  // Filter time zones based on search term
  const getFilteredTimeZones = () => {
    if (!search) return availableTimeZones;
    
    return availableTimeZones.filter(zone => 
      zone.toLowerCase().includes(search.toLowerCase()) ||
      formatTimeZone(zone).toLowerCase().includes(search.toLowerCase()) ||
      getCurrentTime(zone).toLowerCase().includes(search.toLowerCase())
    );
  };

  // Group time zones by region for display
  const groupedTimeZones: Record<string, string[]> = {};
  
  // Filter popular time zones based on search
  const filteredPopular = POPULAR_TIMEZONES.filter(zone => 
    !selectedTimeZones.includes(zone) &&
    (zone.toLowerCase().includes(search.toLowerCase()) ||
     formatTimeZone(zone).toLowerCase().includes(search.toLowerCase()))
  );
  
  // Get filtered time zones that aren't in popular list
  const filteredOthers = getFilteredTimeZones().filter(
    zone => !POPULAR_TIMEZONES.includes(zone)
  );
  
  // Group the filtered others by region
  filteredOthers.forEach(zone => {
    const region = zone.split('/')[0];
    if (!groupedTimeZones[region]) {
      groupedTimeZones[region] = [];
    }
    groupedTimeZones[region].push(zone);
  });
  
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
      <PopoverContent className="w-full sm:w-[320px] p-0 bg-navy-light border-slate-dark">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search time zones..." 
            className="h-9 text-slate-light"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No matching time zones found.</CommandEmpty>
            <ScrollArea className="h-[400px]">
              {filteredPopular.length > 0 && (
                <CommandGroup heading="Popular time zones">
                  {filteredPopular.map(zone => (
                    <CommandItem
                      key={zone}
                      value={zone}
                      onSelect={() => handleSelect(zone)}
                      className="flex items-center justify-between cursor-pointer hover:bg-navy hover:text-cyan"
                    >
                      <div className="flex items-center gap-2">
                        <span>{formatTimeZone(zone)}</span>
                        <span className="text-xs text-cyan">{getCurrentTime(zone)}</span>
                      </div>
                      <span className="text-xs text-slate">{zone.split('/')[0]}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {Object.keys(groupedTimeZones).map(region => (
                <CommandGroup 
                  key={region} 
                  heading={
                    <button
                      onClick={() => toggleRegion(region)}
                      className="flex items-center gap-1 text-xs hover:text-cyan cursor-pointer w-full"
                    >
                      <span>{region}</span>
                      <span className="text-xs text-slate">
                        ({groupedTimeZones[region].length})
                      </span>
                      <span>{expandedRegions[region] ? '▼' : '►'}</span>
                    </button>
                  }
                >
                  {expandedRegions[region] && groupedTimeZones[region].map(zone => (
                    <CommandItem
                      key={zone}
                      value={zone}
                      onSelect={() => handleSelect(zone)}
                      className="flex items-center justify-between cursor-pointer hover:bg-navy hover:text-cyan"
                    >
                      <div className="flex items-center gap-2">
                        <span>{formatTimeZone(zone)}</span>
                        <span className="text-xs text-cyan">{getCurrentTime(zone)}</span>
                      </div>
                      <span className="text-xs text-slate">{zone}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimeZoneSelector;
