
/**
 * Bing URL Submission API utility
 * Allows instant crawling, indexing and discovery of site content
 */

// Bing URL Submission API endpoint
const BING_URL_SUBMISSION_API = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl";

/**
 * Submit a URL to Bing for indexing
 * @param url - The URL to submit for indexing
 * @param apiKey - Bing Webmaster API key
 * @returns Promise with the submission result
 */
export const submitUrlToBing = async (url: string, apiKey: string): Promise<boolean> => {
  if (!url || !apiKey) {
    console.error("Missing required parameters for Bing URL submission");
    return false;
  }

  try {
    const response = await fetch(BING_URL_SUBMISSION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apiKey": apiKey
      },
      body: JSON.stringify({
        siteUrl: "https://syncmyclock.com",
        url: url
      })
    });

    if (!response.ok) {
      console.error(`Bing URL submission failed: ${response.status} ${response.statusText}`);
      return false;
    }

    const data = await response.json();
    console.log("URL submitted to Bing successfully:", data);
    return true;
  } catch (error) {
    console.error("Error submitting URL to Bing:", error);
    return false;
  }
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
 * Submit multiple URLs to Bing for indexing
 * @param urls - Array of URLs to submit
 * @param apiKey - Bing Webmaster API key
 * @returns Promise with an array of submission results
 */
export const batchSubmitUrlsToBing = async (urls: string[], apiKey: string): Promise<boolean[]> => {
  const promises = urls.map(url => submitUrlToBing(url, apiKey));
  return Promise.all(promises);
};
