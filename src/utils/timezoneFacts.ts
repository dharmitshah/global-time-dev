
// Collection of interesting timezone facts
export const timezoneFacts = [
  "China spans 5 geographical time zones but uses only one standard time (UTC+8)",
  "Nepal is the only country with a 45-minute offset (UTC+5:45)",
  "The International Date Line was moved to keep Kiribati in the same day",
  "France has 12 different time zones due to its overseas territories",
  "Russia reduced its time zones from 11 to 9 in 2010",
  "India operates on a single time zone despite spanning over 1,800 miles east to west",
  "The small Pacific island nation of Samoa skipped December 30, 2011 entirely when it moved across the International Date Line",
  "The time in Antarctica depends on which research station you're at",
  "In 1784, Benjamin Franklin first proposed something like Daylight Savings Time as a joke",
  "Arizona doesn't observe Daylight Saving Time, except for the Navajo Nation",
  "Venezuela changed its time zone by 30 minutes in 2007 to be in the same time zone as its capital",
  "Some parts of Western Australia are 90 minutes ahead of the eastern part",
  "Until 1949, Liberia used a time zone 43 minutes behind UTC",
  "Spain is in the wrong time zone - geographically it should be on GMT, like Portugal",
  "Japan has not used Daylight Saving Time since 1951",
  "The North and South Poles technically contain all time zones",
  "Until 1883, every city in the US had its own local time",
  "Daylight Saving Time was first implemented in 1916 by Germany during World War I",
  "Equatorial regions generally don't observe Daylight Saving Time as daylight hours don't change much throughout the year",
  "The world's first time zone was established in Great Britain in 1847 for railway timetables",
  "Venezuela's 30-minute time change in 2007 was ordered by President Hugo Chávez",
  "Some cruise ships change their clocks every day while crossing time zones",
  "Before 1920, Netherlands used a GMT+00:19:32 time offset",
  "The largest time zone by area is UTC+8, which includes China and Western Australia",
  "North Korea created its own time zone in 2015, moving back 30 minutes from South Korea",
  "Hawaii doesn't observe Daylight Saving Time",
  "Standard time was established in the US in 1883 by the railroad companies",
  "Canada has six time zones, spanning 5.5 hours",
  "The city of Eucla in Australia uses UTC+8:45, one of the rarest time zones",
  "The Chatham Islands use a 45-minute offset from New Zealand (UTC+12:45)",
  "Before the 19th century, most localities observed solar time",
];

// Function to get today's fact based on the date
export const getDailyTimezoneFact = (): string => {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  
  // Use the day of the year to pick a fact
  const factIndex = dayOfYear % timezoneFacts.length;
  return timezoneFacts[factIndex];
};

// Helper function to get day of the year (0-365)
const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
