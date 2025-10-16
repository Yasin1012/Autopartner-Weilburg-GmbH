import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('username');

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            username: storedUsername || decoded.upn,
            role: storedRole || decoded.groups?.[0],
          });
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('AuthContext: Attempting login for user:', username);
      const response = await authAPI.login({ username, password });
      console.log('AuthContext: Login response:', response.data);
      
      const { token: newToken, role, username: returnedUsername } = response.data;

      if (!newToken) {
        console.error('AuthContext: No token received');
        toast.error('Keine gültige Antwort vom Server');
        return false;
      }

      localStorage.setItem('token', newToken);
      localStorage.setItem('role', role);
      localStorage.setItem('username', returnedUsername || username);

      setToken(newToken);
      setUser({
        username: returnedUsername || username,
        role,
      });

      console.log('AuthContext: Login successful, user set:', { username: returnedUsername || username, role });
      toast.success('Erfolgreich angemeldet!');
      return true;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      const message = error.response?.data?.message || 'Anmeldung fehlgeschlagen';
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setUser(null);
    setToken(null);
    toast.success('Erfolgreich abgemeldet');
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

