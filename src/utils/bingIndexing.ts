
/**
 * Bing URL Submission API utility
 * Allows instant crawling, indexing and discovery of site content
 */

// Bing URL Submission API endpoint (XML format)
const BING_URL_SUBMISSION_API = "https://ssl.bing.com/webmaster/api.svc/pox/SubmitUrlBatch";

/**
 * Submit a URL to Bing for indexing using XML format
 * @param urls - Array of URLs to submit for indexing
 * @param apiKey - Bing Webmaster API key
 * @param siteUrl - The main site URL (e.g., https://syncmyclock.com)
 * @returns Promise with the submission result
 */
export const submitUrlsToBing = async (
  urls: string[], 
  apiKey: string, 
  siteUrl: string = "https://syncmyclock.com"
): Promise<boolean> => {
  if (!urls.length || !apiKey || !siteUrl) {
    console.error("Missing required parameters for Bing URL submission");
    return false;
  }

  // Create XML body
  const urlStrings = urls.map(url => 
    `<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">${url}</string>`
  ).join('\n');
  
  const xmlBody = `<SubmitUrlBatch xmlns="http://schemas.datacontract.org/2004/07/Microsoft.Bing.Webmaster.Api">
  <siteUrl>${siteUrl}</siteUrl>
  <urlList>
    ${urlStrings}
  </urlList>
</SubmitUrlBatch>`;

  try {
    const response = await fetch(`${BING_URL_SUBMISSION_API}?apikey=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      body: xmlBody
    });

    if (!response.ok) {
      console.error(`Bing URL submission failed: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log("URLs submitted to Bing successfully");
    return true;
  } catch (error) {
    console.error("Error submitting URLs to Bing:", error);
    return false;
  }
};

/**
 * Submit a single URL to Bing for indexing
 * @param url - The URL to submit for indexing
 * @param apiKey - Bing Webmaster API key
 * @param siteUrl - The main site URL (e.g., https://syncmyclock.com)
 * @returns Promise with the submission result
 */
export const submitUrlToBing = async (
  url: string, 
  apiKey: string, 
  siteUrl: string = "https://syncmyclock.com"
): Promise<boolean> => {
  return submitUrlsToBing([url], apiKey, siteUrl);
};

/**
 * Submit the sitemap to Bing for indexing
 * @param apiKey - Bing Webmaster API key
 * @returns Promise with the submission result
 */
export const submitSitemapToBing = async (apiKey: string): Promise<boolean> => {
  return submitUrlToBing("https://syncmyclock.com/sitemap.xml", apiKey);
};

/**
 * Extract URLs from sitemap and submit them to Bing
 * @param apiKey - Bing Webmaster API key
 * @returns Promise with the submission result
 */
export const submitAllUrlsFromSitemap = async (apiKey: string): Promise<boolean> => {
  try {
    // Fetch the sitemap
    const response = await fetch("https://syncmyclock.com/sitemap.xml");
    const text = await response.text();
    
    // Extract URLs using regex (a simple approach)
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls: string[] = [];
    let match;
    
    while ((match = urlRegex.exec(text)) !== null) {
      urls.push(match[1]);
    }
    
    if (urls.length === 0) {
      console.error("No URLs found in sitemap");
      return false;
    }
    
    // Submit all URLs in batches (Bing may have limits on batch size)
    const BATCH_SIZE = 10;
    const batches = [];
    
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }
    
    const results = await Promise.all(
      batches.map(batch => submitUrlsToBing(batch, apiKey))
    );
    
    return results.every(result => result === true);
  } catch (error) {
    console.error("Error processing sitemap:", error);
    return false;
  }
};
