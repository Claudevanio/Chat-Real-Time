// import { useToast } from '@chakra-ui/react';
import { createContext, useState, useEffect, useContext } from 'react';
import { JWT_KEY } from '../data/config';
import { api } from '../services/api';
import { Storage } from '../utils/Storage';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const toast = useToast({ position: 'top' });

  function signOut() {
    setUser(null);
    Storage.remove(JWT_KEY);
  }

  function setData(user, token) {
    setUser(user);
    Storage.set(JWT_KEY, token);
  }

  async function getUser() {
    const token = Storage.get(JWT_KEY);

    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data: response } = await api.get('/users/me').catch((error) => {
      return { data: error.response.data };
    });
    setIsLoading(false);

    if (!response) {
      return signOut();
    }

    if (response.user) {
      setUser(response.user);
    }

    return response.user;
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signOut, setData, isLoading, refreshUser: getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
