
/**
 * Sync My Clock Widget Embedder
 * This script creates an embedded widget for syncmyclock.com tools
 */
(function() {
  // Get the script tag that loaded this script
  const scripts = document.getElementsByTagName('script');
  const script = scripts[scripts.length - 1];
  
  // Get the parent element (the container where we'll create the iframe)
  const container = script.parentNode;
  
  // Extract widget type and height from data attributes
  const widgetType = script.getAttribute('data-widget-type') || 'converter';
  const widgetHeight = script.getAttribute('data-widget-height') || '450';
  
  // Determine which page to load based on the widget type
  let widgetPath = '/world-clock-sync-tool';
  
  switch(widgetType) {
    case 'meeting':
      widgetPath = '/meeting-scheduler';
      break;
    case 'parser':
      widgetPath = '/time-zone-converter-for-developers';
      break;
    case 'utc-ist':
      widgetPath = '/utc-to-ist';
      break;
    case 'utc-est':
      widgetPath = '/utc-to-est';
      break;
  }
  
  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.src = 'https://syncmyclock.com' + widgetPath;
  iframe.width = '100%';
  iframe.height = widgetHeight;
  iframe.style.border = '1px solid #2D3748';
  iframe.style.borderRadius = '8px';
  iframe.setAttribute('title', 'Sync My Clock - Timezone Tool');
  iframe.setAttribute('loading', 'lazy');
  
  // Create attribution link
  const attribution = document.createElement('p');
  attribution.style.fontSize = '12px';
  attribution.style.textAlign = 'right';
  attribution.style.marginTop = '4px';
  attribution.innerHTML = 'Powered by <a href="https://syncmyclock.com" target="_blank" rel="noopener">Sync My Clock</a>';
  
  // Clear the container and append new elements
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  container.appendChild(iframe);
  container.appendChild(attribution);
})();
