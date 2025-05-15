
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateMetaTags, routeMetaData } from '../utils/metaTagManager';

/**
 * Hook to update meta tags based on the current route
 * Improves SEO for SPAs by dynamically updating meta information
 */
export const usePageMeta = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the meta data for the current route
    const metaData = routeMetaData[location.pathname];
    
    // If we have specific meta data for this route, update the tags
    if (metaData) {
      updateMetaTags(metaData);
    } else {
      // For routes without specific meta data, use defaults based on the page title
      // This ensures all pages have some basic SEO information
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const pageName = pathSegments.length > 0 
        ? pathSegments[pathSegments.length - 1].split('-').map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ') 
        : 'Home';
      
      updateMetaTags({
        title: `${pageName} | DevTimeZone - Timezone Converter & World Clock`,
        description: `${pageName} tool by DevTimeZone - Free online timezone converter and world clock for developers and remote teams.`,
        ogTitle: `${pageName} | DevTimeZone`,
        ogDescription: `${pageName} tool by DevTimeZone - Free online timezone converter and world clock.`,
      });
    }
    
    // Scroll to top on route change for better user experience
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

export default usePageMeta;
