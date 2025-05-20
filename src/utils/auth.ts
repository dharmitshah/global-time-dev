
// Simple authentication utility for the admin page

type User = {
  username: string;
  password: string;
};

// Hardcoded credentials as requested
// In a real app, you would use a more secure approach
const ADMIN_USER: User = {
  username: "dns",
  password: "$Tat1@pet"
};

export const login = (username: string, password: string): boolean => {
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    // Set session token in localStorage
    localStorage.setItem("authToken", generateToken());
    localStorage.setItem("lastActivity", Date.now().toString());
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("lastActivity");
};

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem("authToken");
  const lastActivity = localStorage.getItem("lastActivity");
  
  if (!authToken || !lastActivity) {
    return false;
  }
  
  // Session timeout after 1 hour of inactivity
  const now = Date.now();
  const lastActivityTime = parseInt(lastActivity, 10);
  const inactiveTime = now - lastActivityTime;
  const oneHour = 60 * 60 * 1000;
  
  if (inactiveTime > oneHour) {
    logout();
    return false;
  }
  
  // Update last activity time
  localStorage.setItem("lastActivity", now.toString());
  return true;
};

// Generate a simple token
const generateToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
