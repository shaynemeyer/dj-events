import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../config';

interface User {
  username: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface ContextDefaults {
  user: string | null;
  error: string | null;
  register: (user: User) => void;
  login: ({ email: identifier, password }: LoginUser) => void;
  logout: () => void;
}

const defaultValues: ContextDefaults = {
  user: null,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // register user
  const register = async (user: User) => {
    console.log({ user });
  };
  // login user
  const login = async ({ email: identifier, password }: LoginUser) => {
    console.log({ identifier, password });
  };

  // logout user
  const logout = async () => {
    console.log('Logout');
  };

  // check if user is logged in
  const checkUserLoginIn = async (user: LoginUser) => {
    console.log('Check User Login');
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
