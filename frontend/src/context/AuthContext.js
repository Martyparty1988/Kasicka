import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Set default auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          // Fetch current user
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`);
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Update axios default header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password
      });
      
      setToken(response.data.token);
      setUser(response.data.user);
      
      // Store refresh token
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      toast.success('Přihlášení úspěšné');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Přihlášení selhalo');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
    toast.info('Byli jste odhlášeni');
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/refresh-token`, {
        refreshToken
      });

      setToken(response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  const register = async (userData) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, userData);
      toast.success('Registrace úspěšná. Nyní se můžete přihlásit.');
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.response?.data?.message || 'Registrace selhala');
      return false;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/change-password`, {
        currentPassword,
        newPassword
      });
      toast.success('Heslo bylo úspěšně změněno');
      return true;
    } catch (error) {
      console.error('Password change failed:', error);
      toast.error(error.response?.data?.message || 'Změna hesla selhala');
      return false;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    register,
    refreshAuthToken,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'Administrator',
    isManager: user?.role === 'Manager' || user?.role === 'Administrator',
    isStaff: user?.role === 'Staff' || user?.role === 'Manager' || user?.role === 'Administrator',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
