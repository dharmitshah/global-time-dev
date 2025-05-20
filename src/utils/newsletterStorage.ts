
export interface Subscriber {
  id: string;
  email: string;
  timestamp: string;
}

const STORAGE_KEY = "newsletter_subscribers";

export const addSubscriber = (email: string): Subscriber => {
  const subscribers = getSubscribers();
  
  // Check if email already exists
  const exists = subscribers.some(sub => sub.email === email);
  if (exists) {
    throw new Error("This email is already subscribed");
  }
  
  const newSubscriber: Subscriber = {
    id: generateId(),
    email,
    timestamp: new Date().toISOString()
  };
  
  subscribers.push(newSubscriber);
  saveSubscribers(subscribers);
  
  return newSubscriber;
};

export const getSubscribers = (): Subscriber[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error parsing subscriber data", e);
    return [];
  }
};

export const removeSubscriber = (id: string): boolean => {
  const subscribers = getSubscribers();
  const filteredSubscribers = subscribers.filter(sub => sub.id !== id);
  
  if (filteredSubscribers.length === subscribers.length) {
    return false; // Nothing removed
  }
  
  saveSubscribers(filteredSubscribers);
  return true;
};

const saveSubscribers = (subscribers: Subscriber[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
};
