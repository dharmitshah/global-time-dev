
import { format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export const calculateArrivalTime = (
  departureTime: string,
  departureTimeZone: string,
  arrivalTimeZone: string
): string => {
  // Parse the departure time string into a Date object
  const departureDate = new Date(departureTime);
  
  // Check if the date is valid
  if (isNaN(departureDate.getTime())) {
    throw new Error("Invalid departure time format");
  }

  // Convert the departure time to UTC
  const departureUTCTime = fromZonedTime(departureDate, departureTimeZone);

  // Convert the UTC time to the arrival time zone
  const arrivalTime = toZonedTime(departureUTCTime, arrivalTimeZone);

  // Format the arrival time
  return format(arrivalTime, 'MMMM dd, yyyy hh:mm:ss a zzz');
};

export interface JetlagResult {
  recoveryDays: number;
  severity: string;
  travelDirection: string;
}

export const calculateJetlag = (
  fromZone: string,
  toZone: string,
  travelerAge: string
): JetlagResult => {
  // Get current date
  const now = new Date();
  
  // Get the current time in both zones
  const fromZoneDate = new Date(now.toLocaleString('en-US', { timeZone: fromZone }));
  const toZoneDate = new Date(now.toLocaleString('en-US', { timeZone: toZone }));
  
  // Calculate the raw time difference in hours
  let hourDifference = Math.round((toZoneDate.getTime() - fromZoneDate.getTime()) / (1000 * 60 * 60));
  
  // Adjust for day boundaries (e.g., if difference is more than 12 hours, it's actually shorter going the other way)
  if (hourDifference > 12) {
    hourDifference = hourDifference - 24;
  } else if (hourDifference < -12) {
    hourDifference = hourDifference + 24;
  }
  
  const absHourDifference = Math.abs(hourDifference);
  
  // Direction-based adjustment (eastward travel is typically harder on the body)
  const direction = hourDifference > 0 ? 'eastward' : 'westward';
  
  // Calculate estimated recovery days (roughly 1 day per 1-2 time zones crossed)
  let recoveryDays = 0;
  let severity = '';
  
  if (absHourDifference <= 2) {
    recoveryDays = 1;
    severity = 'minimal';
  } else if (absHourDifference <= 5) {
    recoveryDays = direction === 'eastward' ? Math.ceil(absHourDifference * 0.8) : Math.ceil(absHourDifference * 0.6);
    severity = 'moderate';
  } else if (absHourDifference <= 8) {
    recoveryDays = direction === 'eastward' ? Math.ceil(absHourDifference * 0.9) : Math.ceil(absHourDifference * 0.7);
    severity = 'significant';
  } else {
    recoveryDays = direction === 'eastward' ? Math.ceil(absHourDifference) : Math.ceil(absHourDifference * 0.8);
    severity = 'severe';
  }
  
  // Age-based adjustment
  if (travelerAge === 'child') {
    recoveryDays = Math.max(1, Math.floor(recoveryDays * 0.8)); // Children adapt a bit faster
  } else if (travelerAge === 'senior') {
    recoveryDays = Math.ceil(recoveryDays * 1.5); // Seniors adapt slower
  }
  
  return {
    recoveryDays,
    severity,
    travelDirection: direction
  };
};
