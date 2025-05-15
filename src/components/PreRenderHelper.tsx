
import { useEffect } from 'react';

/**
 * Helper component to assist prerendering services with understanding SPA content
 * This component adds markers to signal when the page is fully rendered
 */
const PreRenderHelper = () => {
  useEffect(() => {
    // Signal that page has started rendering
    document.documentElement.classList.add('render-started');
    
    // Wait for all content to be loaded
    window.addEventListener('load', () => {
      // Add a small delay to ensure React has finished rendering
      setTimeout(() => {
        // Signal that page has finished rendering
        document.documentElement.classList.add('render-complete');
        
        // Add a meta tag to tell prerender services that page is ready
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'prerender-status-code');
        meta.setAttribute('content', '200');
        document.head.appendChild(meta);
        
        // Dispatch a custom event that prerendering services can listen for
        window.dispatchEvent(new Event('rendering-complete'));
      }, 500);
    });
  }, []);
  
  return null;
};

export default PreRenderHelper;
