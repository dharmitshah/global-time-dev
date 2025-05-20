
import { useState } from 'react';
import { handleNewsletterSignup } from '../api/newsletter-signup';

export const useNewsletterApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const subscribeToNewsletter = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = handleNewsletterSignup(email);
      
      if (!response.success) {
        setError(response.message);
        return false;
      }
      
      return true;
    } catch (err) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    subscribeToNewsletter,
    isLoading,
    error
  };
};

export default useNewsletterApi;
