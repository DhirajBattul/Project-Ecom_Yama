/**
 * Utility functions for date formatting
 */

/**
 * Parse date string in dd-MM-yyyy format to JavaScript Date object
 * @param {string} dateString - Date string in dd-MM-yyyy format
 * @returns {Date} JavaScript Date object
 */
export const parseBackendDate = (dateString) => {
  if (!dateString) return null;
  
  // Handle dd-MM-yyyy format
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript
    const year = parseInt(parts[2], 10);
    
    return new Date(year, month, day);
  }
  
  // Fallback to regular Date parsing
  return new Date(dateString);
};

/**
 * Format date for display in locale format
 * @param {string} dateString - Date string from backend
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = parseBackendDate(dateString);
  if (!date || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-IN');
};

/**
 * Convert date to yyyy-MM-dd format for HTML date input
 * @param {string} dateString - Date string from backend
 * @returns {string} Date in yyyy-MM-dd format
 */
export const formatDateForInput = (dateString) => {
  const date = parseBackendDate(dateString);
  if (!date || isNaN(date.getTime())) {
    return '';
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Convert HTML date input value to dd-MM-yyyy format for backend
 * @param {string} dateInput - Date from HTML input (yyyy-MM-dd)
 * @returns {string} Date in dd-MM-yyyy format
 */
export const formatDateForBackend = (dateInput) => {
  if (!dateInput) return '';
  
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
};
