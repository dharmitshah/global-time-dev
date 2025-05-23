
/**
 * Meta Tag Manager for SPA SEO
 * 
 * This utility helps set page-specific meta tags and OpenGraph metadata
 * to improve SEO for the Single Page Application.
 */

interface MetaTagData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  jsonLd?: object;
}

/**
 * Updates meta tags for the current route to improve SPA SEO
 */
export const updateMetaTags = (data: MetaTagData) => {
  // Update document title
  document.title = data.title;
  
  // Update meta description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', data.description);
  } else {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    descriptionMeta.setAttribute('content', data.description);
    document.head.appendChild(descriptionMeta);
  }
  
  // Update keywords if provided
  if (data.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', data.keywords);
    } else {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      keywordsMeta.setAttribute('content', data.keywords);
      document.head.appendChild(keywordsMeta);
    }
  }
  
  // Update canonical URL
  const canonicalUrl = data.canonicalUrl || window.location.href;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl);
  } else {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonicalUrl);
    document.head.appendChild(canonicalLink);
  }
  
  // Update OpenGraph tags
  const updateOpenGraphTag = (property: string, content: string) => {
    let ogTag = document.querySelector(`meta[property="og:${property}"]`);
    if (ogTag) {
      ogTag.setAttribute('content', content);
    } else {
      ogTag = document.createElement('meta');
      ogTag.setAttribute('property', `og:${property}`);
      ogTag.setAttribute('content', content);
      document.head.appendChild(ogTag);
    }
  };
  
  updateOpenGraphTag('title', data.ogTitle || data.title);
  updateOpenGraphTag('description', data.ogDescription || data.description);
  updateOpenGraphTag('url', canonicalUrl);
  updateOpenGraphTag('type', data.ogType || 'website');
  
  if (data.ogImage) {
    updateOpenGraphTag('image', data.ogImage);
  }
  
  // Update or add JSON-LD structured data if provided
  if (data.jsonLd) {
    // Remove any existing JSON-LD scripts with the same @type
    const jsonLdType = (data.jsonLd as any)['@type'];
    const existingScripts = document.querySelectorAll(`script[type="application/ld+json"]`);
    
    existingScripts.forEach(script => {
      try {
        const scriptData = JSON.parse(script.textContent || '{}');
        if (scriptData['@type'] === jsonLdType) {
          script.remove();
        }
      } catch (e) {
        // If parsing fails, don't remove the script
      }
    });
    
    // Add the new JSON-LD script
    const jsonLdScript = document.createElement('script');
    jsonLdScript.setAttribute('type', 'application/ld+json');
    jsonLdScript.textContent = JSON.stringify(data.jsonLd);
    document.head.appendChild(jsonLdScript);
  }
  
  // Notify crawlers about JavaScript rendering
  let renderedMeta = document.querySelector('meta[name="renderer"]');
  if (!renderedMeta) {
    renderedMeta = document.createElement('meta');
    renderedMeta.setAttribute('name', 'renderer');
    renderedMeta.setAttribute('content', 'webkit|ie-comp|ie-stand');
    document.head.appendChild(renderedMeta);
  }
};

/**
 * Page-specific meta data for common routes
 */
export const routeMetaData: Record<string, MetaTagData> = {
  '/': {
    title: 'DevTimeZone - Free Timezone Converter | World Clock',
    description: 'Convert time between time zones instantly. Free timezone calculator for developers and remote teams. UTC, EST, IST converter.',
    keywords: 'timezone converter, world clock, UTC to IST, UTC to EST, time conversion app, remote work tools',
    ogTitle: 'DevTimeZone - Free Online Timezone Converter',
    ogDescription: 'Convert time between global timezones instantly. UTC to IST, UTC to EST converter.',
    ogType: 'website',
    ogImage: 'https://syncmyclock.com/og-image.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'DevTimeZone',
      'url': 'https://syncmyclock.com/',
      'description': 'Convert time between global timezones instantly. Free tool for developers, remote teams, and travelers.',
      'applicationCategory': 'DeveloperTool',
      'operatingSystem': 'Web',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  },
  '/meeting-scheduler': {
    title: 'Meeting Scheduler | Time Zones Planner | DevTimeZone',
    description: 'Schedule meetings across multiple time zones. Find optimal meeting times for distributed teams.',
    keywords: 'meeting scheduler, global team meetings, international meeting planner',
    ogTitle: 'Schedule Global Team Meetings Across Time Zones',
    ogDescription: 'Find the perfect meeting time for your international team with our meeting scheduler.',
    ogType: 'website',
    ogImage: 'https://syncmyclock.com/og-image.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Global Meeting Scheduler',
      'applicationCategory': 'BusinessApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0'
      },
      'description': 'Schedule meetings across multiple time zones. Find overlapping working hours for distributed teams.'
    }
  },
  '/utc-to-ist': {
    title: 'UTC to IST Converter | Indian Standard Time | DevTimeZone',
    description: 'Convert UTC to IST (Indian Standard Time) instantly. Free online UTC to IST converter.',
    keywords: 'UTC to IST, convert UTC to Indian time, Indian Standard Time converter',
    ogTitle: 'UTC to IST Time Converter',
    ogDescription: 'Convert UTC time to Indian Standard Time (IST) instantly with our free online converter.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'UTC to IST Converter',
      'description': 'Convert UTC time to Indian Standard Time (IST) instantly. Free online converter for developers and remote teams.'
    }
  },
  '/utc-to-est': {
    title: 'UTC to EST Converter | Eastern Standard Time | DevTimeZone',
    description: 'Convert UTC to EST (Eastern Standard Time) instantly. Free online UTC to EST converter.',
    keywords: 'UTC to EST, convert UTC to Eastern time, Eastern Standard Time converter',
    ogTitle: 'UTC to EST Time Converter',
    ogDescription: 'Convert UTC time to Eastern Standard Time (EST) instantly with our free online converter.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'UTC to EST Converter',
      'description': 'Convert UTC time to Eastern Standard Time (EST) instantly. Free online converter for developers and remote teams.'
    }
  },
  '/time-zone-converter-for-developers': {
    title: 'Developer Time Zone Tools | Timestamp Converter | DevTimeZone',
    description: 'Essential timezone tools for developers. Convert timestamps, parse logs, manage time across teams.',
    keywords: 'developer timestamp tools, log time parser, programming time zone converter',
    ogTitle: 'Time Zone Tools for Developers',
    ogDescription: 'Essential timezone conversion tools and utilities designed for software developers.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Developer Time Zone Tools',
      'description': 'Essential timezone tools for developers. Convert timestamps, parse log files, and manage time across development teams.'
    }
  },
  '/world-clock-sync-tool': {
    title: 'World Clock | Global Time Zones | Current Time Worldwide',
    description: 'View current time across multiple time zones simultaneously. Track time in different cities globally.',
    keywords: 'world clock, global time zones, international time, current time worldwide',
    ogTitle: 'World Clock Sync Tool',
    ogDescription: 'View current time across multiple time zones simultaneously with our free online World Clock.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'World Clock Sync Tool',
      'description': 'View current time across multiple time zones simultaneously. Track time in different cities and regions around the globe.'
    }
  },
  '/time-zone-travel-planner': {
    title: 'Time Zone Travel Planner | Plan Trips Across Time Zones',
    description: 'Plan your international travel with our Time Zone Travel Planner. Calculate time differences and jet lag.',
    keywords: 'time zone travel planner, jet lag calculator, international travel time',
    ogTitle: 'Time Zone Travel Planner',
    ogDescription: 'Plan your international travel across time zones. Calculate time differences and manage jet lag.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Time Zone Travel Planner',
      'description': 'Plan your international travel with our Time Zone Travel Planner. Calculate time differences and manage jet lag.'
    }
  },
  '/time-zone-history': {
    title: 'History of Time Zones | Evolution of Global Time',
    description: 'Explore the history of time zones. Learn about standard time development and time zone evolution.',
    keywords: 'time zone history, standard time history, international date line',
    ogTitle: 'History of Time Zones',
    ogDescription: 'Explore the fascinating evolution of global time zones from local solar time to our modern system.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'History of Time Zones',
      'description': 'Explore the fascinating history of time zones. Learn about the development of standard time and how time zone systems evolved.',
      'author': {
        '@type': 'Organization',
        'name': 'DevTimeZone'
      }
    }
  },
  '/business-hours-calculator': {
    title: 'Business Hours Calculator | Working Hours Across Time Zones',
    description: 'Calculate overlapping business hours across time zones. Find optimal global team collaboration times.',
    keywords: 'business hours calculator, working hours time zones, overlapping business hours',
    ogTitle: 'Business Hours Calculator',
    ogDescription: 'Calculate overlapping business hours across different time zones for optimal global team collaboration.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Business Hours Calculator',
      'applicationCategory': 'BusinessApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0'
      },
      'description': 'Calculate overlapping business hours across different time zones for optimal global team collaboration.'
    }
  }
};

// Generate page-specific sitemap data for search engines
export const generateSitemapData = () => {
  // This would typically be done server-side, but for SPA we can prepare the data
  // that could be used by a pre-rendering service or static site generator
  const siteUrl = 'https://syncmyclock.com';
  const now = new Date().toISOString();
  
  return Object.keys(routeMetaData).map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFreq: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
  }));
};
