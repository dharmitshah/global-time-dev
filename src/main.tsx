
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add meta tags for SEO
const metaTags = [
  { name: "description", content: "DevTimeZone - The ultimate tool for managing global team schedules and time zone conversions" },
  { name: "keywords", content: "time zone converter, meeting scheduler, global team, developer tools, time management" },
  { property: "og:title", content: "DevTimeZone - Global Team Meeting Scheduler & Time Zone Converter" },
  { property: "og:description", content: "Find the perfect meeting times for your distributed team and convert time zones instantly" },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "DevTimeZone - Global Team Management" },
  { name: "twitter:description", content: "The ultimate tool for managing global team schedules and time zone conversions" }
];

// Add meta tags to the document
metaTags.forEach(tag => {
  const meta = document.createElement('meta');
  Object.entries(tag).forEach(([key, value]) => {
    meta.setAttribute(key, value);
  });
  document.head.appendChild(meta);
});

// Add JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "DevTimeZone",
  "description": "A global team meeting scheduler and time zone converter for developers",
  "applicationCategory": "Productivity",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "Any"
};

const scriptTag = document.createElement('script');
scriptTag.type = 'application/ld+json';
scriptTag.text = JSON.stringify(jsonLd);
document.head.appendChild(scriptTag);

// Update document title
document.title = "DevTimeZone - Global Team Meeting Scheduler & Time Converter";

createRoot(document.getElementById("root")!).render(<App />);
