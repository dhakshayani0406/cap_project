import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const active = api.getCurrentUser();
    setUser(active);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const signup = async (userData) => {
    const res = await api.signup(userData);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const updated = await api.updateProfile(data);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
