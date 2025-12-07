import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:8000/api/auth/login';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(API_URL, { email, password });
      const { token, userData } = response.data.data;

      localStorage.setItem('authToken', token);
      
      setUser(userData); 
      return true;
    } catch (error) {
      console.error("Login falhou:", error);
      return false; 
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const contextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
