import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  fullName: null,
  token: null,
  login: () => {},
  logout: () => {}
});