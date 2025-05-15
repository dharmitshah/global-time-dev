
// Re-export toast components from the hook file
// This ensures consistent mobile-friendly toast behavior
import { useToast, toast as originalToast } from "@/hooks/use-toast";

// Add mobile-friendly positioning options to toast
const toast = {
  ...originalToast,
  mobileBottom: (message: string) => {
    originalToast({
      title: message,
      className: "fixed bottom-4 left-4 right-4 md:left-auto md:right-auto md:bottom-auto",
    });
  }
};

export { useToast, toast };
