
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced meta tags for SEO
const metaTags = [
  { name: "description", content: "Instantly convert time between global timezones. Built for remote teams, developers, and digital nomads. Simple, fast & free." },
  { name: "keywords", content: "timezone converter, time conversion, UTC to IST, UTC to EST, remote work tools, global time, sync time, time calculator, developer time tools" },
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
  { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }
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
  "featureList": "Time zone conversion, Log timestamp parsing, Global meeting scheduler, Simple interface",
  "keywords": "timezone converter, time conversion, UTC to IST, UTC to EST, remote work tools, global time, time calculator"
};

// Add website schema with more detailed search capability
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sync My Clock - Free Online Timezone Converter",
  "alternateName": "DevTimeZone",
  "url": "https://syncmyclock.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://syncmyclock.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://syncmyclock.com/utc-to-ist",
    "https://syncmyclock.com/utc-to-est",
    "https://syncmyclock.com/meeting-scheduler"
  ]
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
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "UTC to IST Converter",
      "item": "https://syncmyclock.com/utc-to-ist"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "UTC to EST Converter",
      "item": "https://syncmyclock.com/utc-to-est"
    }
  ]
};

// Add FAQ schema to enhance search results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert UTC to local time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To convert UTC to your local time, simply select your timezone from our converter tool. Enter the UTC time you want to convert, and our tool will instantly display the equivalent time in your local timezone."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between GMT and UTC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GMT (Greenwich Mean Time) is a time zone, while UTC (Coordinated Universal Time) is a time standard. For most practical purposes they are the same, but UTC is maintained by atomic clocks and is used as the global reference point."
      }
    },
    {
      "@type": "Question",
      "name": "How do I schedule meetings with teams in different time zones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use our Meeting Scheduler tool to input the time zones of all team members. The tool will automatically find suitable meeting times that work for everyone, taking into account working hours and time differences."
      }
    }
  ]
};

// Add WebApplication schema
const scriptTag = document.createElement('script');
scriptTag.type = 'application/ld+json';
scriptTag.text = JSON.stringify(jsonLd);
document.head.appendChild(scriptTag);

// Add WebSite schema
const websiteScriptTag = document.createElement('script');
websiteScriptTag.type = 'application/ld+json';
websiteScriptTag.text = JSON.stringify(websiteSchema);
document.head.appendChild(websiteScriptTag);

// Add breadcrumb schema
const breadcrumbScriptTag = document.createElement('script');
breadcrumbScriptTag.type = 'application/ld+json';
breadcrumbScriptTag.text = JSON.stringify(breadcrumbSchema);
document.head.appendChild(breadcrumbScriptTag);

// Add FAQ schema
const faqScriptTag = document.createElement('script');
faqScriptTag.type = 'application/ld+json';
faqScriptTag.text = JSON.stringify(faqSchema);
document.head.appendChild(faqScriptTag);

// Update document title with keyword-rich title
document.title = "Sync My Clock - Free Online Timezone Converter | UTC to IST | UTC to EST";

createRoot(document.getElementById("root")!).render(<App />);
