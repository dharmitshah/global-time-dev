
/**
 * Bing URL Submission API utility
 * Allows instant crawling, indexing and discovery of site content
 * Following Bing Webmaster Guidelines for proper indexing
 */

// Bing URL Submission API endpoint (XML format)
const BING_URL_SUBMISSION_API = "https://ssl.bing.com/webmaster/api.svc/pox/SubmitUrlBatch";

/**
 * Submit a batch of URLs to Bing for indexing using XML format
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

  // Validate URLs to ensure they belong to the submitted site
  const validUrls = urls.filter(url => url.startsWith(siteUrl));
  if (validUrls.length === 0) {
    console.error("No valid URLs to submit (all URLs must belong to the site URL domain)");
    return false;
  }

  // Create XML body following Bing's exact format
  const urlStrings = validUrls.map(url => 
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
        "Content-Type": "application/xml; charset=utf-8",
        "Host": "ssl.bing.com"
      },
      body: xmlBody
    });

    if (!response.ok) {
      console.error(`Error submitting URLs to Bing: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log(`Successfully submitted ${validUrls.length} URLs to Bing for indexing`);
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
 * Submit the sitemap URL to Bing for indexing
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
    
    // Extract URLs using regex
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
    
    // Submit URLs in batches (Bing recommends smaller batches)
    const BATCH_SIZE = 10; // Smaller batch size for better reliability
    const batches = [];
    
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }
    
    console.log(`Submitting ${urls.length} URLs from sitemap in ${batches.length} batches`);
    
    const results = await Promise.all(
      batches.map(batch => submitUrlsToBing(batch, apiKey))
    );
    
    const successRate = results.filter(Boolean).length / results.length;
    console.log(`Batch submission complete: ${Math.round(successRate * 100)}% successful`);
    
    return results.some(result => result === true);
  } catch (error) {
    console.error("Error processing sitemap:", error);
    return false;
  }
};

/**
 * Helper function for webmasters to check if a page is properly set up for Bing indexing
 * @param url URL to check
 * @returns Object with validation results
 */
export const checkPageForBingIndexing = async (url: string): Promise<{
  isValid: boolean;
  hasCanonical: boolean;
  hasSchema: boolean;
  hasH1: boolean;
  hasMetaDescription: boolean;
  recommendations: string[];
}> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    const hasCanonical = html.includes('rel="canonical"');
    const hasSchema = html.includes('application/ld+json') || 
                      html.includes('itemscope') || 
                      html.includes('itemtype');
    const hasH1 = html.includes('<h1');
    const hasMetaDescription = html.includes('<meta name="description"');
    
    const recommendations: string[] = [];
    
    if (!hasCanonical) recommendations.push('Add a canonical URL tag');
    if (!hasSchema) recommendations.push('Add schema.org structured data');
    if (!hasH1) recommendations.push('Add an H1 heading');
    if (!hasMetaDescription) recommendations.push('Add a meta description');
    
    return {
      isValid: hasCanonical && hasH1 && hasMetaDescription,
      hasCanonical,
      hasSchema,
      hasH1,
      hasMetaDescription,
      recommendations
    };
  } catch (error) {
    console.error("Error checking page:", error);
    return {
      isValid: false,
      hasCanonical: false,
      hasSchema: false,
      hasH1: false,
      hasMetaDescription: false,
      recommendations: ['Could not fetch page to analyze']
    };
  }
};
