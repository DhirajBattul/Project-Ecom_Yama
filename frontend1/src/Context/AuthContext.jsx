import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check if token exists and is valid on app start
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Verify token is not expired (basic check)
          if (typeof storedToken === 'string' && storedToken.split('.').length === 3) {
            const payload = JSON.parse(atob(storedToken.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (payload.exp > currentTime) {
              setToken(storedToken);
              setUser(JSON.parse(storedUser));
              // Set API default header
              API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } else {
              // Token expired, clear storage
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          } else {
            // Invalid token format, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error parsing stored token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post('/login', {
        username,
        password
      });

      const data = response.data;
      // response may be a string token or an object { token: '...' } or { accessToken: '...' }
      let jwtToken = null;
      if (typeof data === 'string') {
        jwtToken = data;
      } else if (data && typeof data === 'object') {
        jwtToken = data.token || data.jwt || data.accessToken || null;
      }

      // Reject obvious failure strings or non-JWT strings
      if (typeof jwtToken === 'string') {
        const trimmed = jwtToken.trim();
        if (/failed/i.test(trimmed) || trimmed.split('.').length !== 3) {
          jwtToken = null;
        }
      }

      if (jwtToken && typeof jwtToken === 'string') {
        // Store token and user info
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify({ username }));
        
        setToken(jwtToken);
        setUser({ username });
        
        // Set API default header
        API.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        
        return { success: true };
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please check your credentials.' };
    }
  };

  const register = async (username, password) => {
    try {
      const response = await API.post('/register', {
        username,
        password
      });

      if (response.data === "Registered!!") {
        return { success: true, message: 'Registration successful! Please login.' };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Username might already exist.' };
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setToken(null);
    setUser(null);
    
    // Remove API default header
    delete API.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
