
/// <reference types="vite/client" />

// Add Google Analytics gtag function type definitions
interface Window {
  gtag: (
    command: string,
    targetId: string,
    config?: {
      page_path?: string;
      page_title?: string;
      [key: string]: any;
    }
  ) => void;
  
  // For Google Analytics consent mode
  dataLayer: any[];
}

