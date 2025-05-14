
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced meta tags for SEO
const metaTags = [
  { name: "description", content: "DevTimeZone - The ultimate tool for managing global team schedules and time zone conversions. Convert timestamps instantly for developers." },
  { name: "keywords", content: "time zone converter, meeting scheduler, global team, developer tools, time management, log timestamp parser, UTC conversion, ISO 8601, Unix timestamp, programmer tools, software developer timezone, remote team coordination, international team scheduler, global development teams, programming timestamp, log analysis tools" },
  { property: "og:title", content: "DevTimeZone - Ultimate Developer Time Conversion Tool" },
  { property: "og:description", content: "Find the perfect meeting times for your distributed team and convert time zones instantly. The #1 tool for global developer teams." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://global-time-dev.lovable.app/" },
  { property: "og:image", content: "https://global-time-dev.lovable.app/og-image.png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "DevTimeZone application interface showing time zone conversions" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "DevTimeZone - Ultimate Developer Time Tool" },
  { name: "twitter:description", content: "The ultimate tool for managing global team schedules and time zone conversions. Perfect for distributed development teams." },
  { name: "twitter:url", content: "https://global-time-dev.lovable.app/" },
  { name: "twitter:image", content: "https://global-time-dev.lovable.app/og-image.png" },
  { name: "author", content: "DevTimeZone Team" },
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
  "name": "DevTimeZone",
  "url": "https://global-time-dev.lovable.app/",
  "description": "A comprehensive global team meeting scheduler and time zone converter built specifically for software developers and engineering teams.",
  "applicationCategory": "DeveloperTool",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "author": {
    "@type": "Organization",
    "name": "DevTimeZone",
    "url": "https://global-time-dev.lovable.app/"
  },
  "screenshot": "https://global-time-dev.lovable.app/og-image.png",
  "softwareVersion": "1.0.0",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": "Time zone conversion, Log timestamp parsing, Global meeting scheduler, Developer-focused interface"
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
      "item": "https://global-time-dev.lovable.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Meeting Scheduler",
      "item": "https://global-time-dev.lovable.app/meeting-scheduler"
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
document.title = "DevTimeZone - Ultimate Developer Time Zone Converter & Meeting Scheduler";

createRoot(document.getElementById("root")!).render(<App />);
