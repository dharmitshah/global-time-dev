
import { addSubscriber } from '../utils/newsletterStorage';

// This would be a server endpoint, but for this app we'll implement
// the logic on the client side using the browser's localStorage
export const handleNewsletterSignup = (email: string) => {
  try {
    addSubscriber(email);
    return {
      success: true,
      message: "Successfully subscribed to newsletter"
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message
      };
    }
    return {
      success: false,
      message: "An unknown error occurred"
    };
  }
};
