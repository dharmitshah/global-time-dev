
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced meta tags for SEO
const metaTags = [
  { name: "description", content: "Instantly convert time between global timezones. Built for remote teams, developers, and digital nomads. Simple, fast & free." },
  { name: "keywords", content: "timezone converter, time conversion, UTC to IST, remote work tools, global time, sync time, time calculator" },
  { property: "og:title", content: "Sync My Clock - Free Online Timezone Converter" },
  { property: "og:description", content: "Instantly convert time between global timezones. Built for remote teams, developers, and digital nomads. Simple, fast & free." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://syncmyclock.com/" },
  { property: "og:image", content: "https://syncmyclock.com/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Sync My Clock application interface showing time zone conversions" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Sync My Clock - Free Online Timezone Converter" },
  { name: "twitter:description", content: "Instantly convert time between global timezones. Built for remote teams, developers, and digital nomads." },
  { name: "twitter:url", content: "https://syncmyclock.com/" },
  { name: "twitter:image", content: "https://syncmyclock.com/og-image.png" },
  { name: "author", content: "Sync My Clock" },
  { name: "robots", content: "index, follow, max-image-preview:large" }
];

// Add meta tags to the document
metaTags.forEach(tag => {
  const meta = document.createElement('meta');
  Object.entries(tag).forEach(([key, value]) => {
    meta.setAttribute(key, value);
  });
  document.head.appendChild(meta);
});

// Enhanced JSON-LD structured data for SEO with WebApplication and SoftwareApplication schemas
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sync My Clock",
  "url": "https://syncmyclock.com/",
  "description": "Instantly convert time between global timezones. Built for remote teams, developers, and digital nomads.",
  "applicationCategory": "TimezoneConverter",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "author": {
    "@type": "Organization",
    "name": "Sync My Clock",
    "url": "https://syncmyclock.com/"
  },
  "screenshot": "https://syncmyclock.com/og-image.png",
  "softwareVersion": "1.0.0",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": "Time zone conversion, Log timestamp parsing, Global meeting scheduler, Simple interface"
};

// Add breadcrumb schema for better navigation understanding by search engines
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://syncmyclock.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Meeting Scheduler",
      "item": "https://syncmyclock.com/meeting-scheduler"
    }
  ]
};

const scriptTag = document.createElement('script');
scriptTag.type = 'application/ld+json';
scriptTag.text = JSON.stringify(jsonLd);
document.head.appendChild(scriptTag);

// Add breadcrumb schema
const breadcrumbScriptTag = document.createElement('script');
breadcrumbScriptTag.type = 'application/ld+json';
breadcrumbScriptTag.text = JSON.stringify(breadcrumbSchema);
document.head.appendChild(breadcrumbScriptTag);

// Update document title with keyword-rich title
document.title = "Sync My Clock - Free Online Timezone Converter";

createRoot(document.getElementById("root")!).render(<App />);
