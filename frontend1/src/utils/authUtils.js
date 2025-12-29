// Authentication utility functions

/**
 * Check if JWT token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

/**
 * Get token expiration time
 * @param {string} token - JWT token
 * @returns {Date|null} - Expiration date or null if invalid
 */
export const getTokenExpiration = (token) => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

/**
 * Get time until token expires
 * @param {string} token - JWT token
 * @returns {number} - Milliseconds until expiration
 */
export const getTimeUntilExpiry = (token) => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return 0;
  
  return expiration.getTime() - Date.now();
};

/**
 * Format token expiration for display
 * @param {string} token - JWT token
 * @returns {string} - Formatted expiration string
 */
export const formatTokenExpiration = (token) => {
  const expiration = getTokenExpiration(token);
  if (!expiration) return 'Invalid token';
  
  const now = new Date();
  const diff = expiration.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s remaining`;
  } else {
    return `${seconds}s remaining`;
  }
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validateUsername = (username) => {
  const errors = [];
  
  if (!username) {
    errors.push('Username is required');
    return { isValid: false, errors };
  }
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (username.length > 20) {
    errors.push('Username must be less than 20 characters');
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get auth header for API requests
 * @param {string} token - JWT token
 * @returns {object} - Authorization header object
 */
export const getAuthHeader = (token) => {
  if (!token) return {};
  
  return {
    Authorization: `Bearer ${token}`
  };
};

/**
 * Check if user has permission for a route
 * @param {string} route - Route path
 * @param {object} user - User object
 * @param {string} token - JWT token
 * @returns {boolean} - True if user has permission
 */
export const hasRoutePermission = (route, user, token) => {
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/product', '/search-results'];
  
  if (publicRoutes.includes(route)) {
    return true;
  }
  
  // Check if user is authenticated for protected routes
  if (!user || !token) {
    return false;
  }
  
  // Check if token is expired
  if (isTokenExpired(token)) {
    return false;
  }
  
  return true;
};
