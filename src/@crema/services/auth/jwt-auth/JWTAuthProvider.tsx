import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import jwtAxios, { setAuthToken } from './index';
import { AuthUser } from '../../../../types/models/AuthUser';
import { fetchError, fetchStart, fetchSuccess } from '../../../../redux/actions';
import { LOGIN_URL } from 'services/appUrls';
import { setToken } from 'services/axiosInstance';

interface JWTAuthContextProps {
  user: { userName: string } | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  userName: string;
  password: string;
}

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => void;
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => {},
  signInUser: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({ children }) => {
  const [firebaseData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      setToken(token);
      setJWTAuthData({
        ...firebaseData,
        user: JSON.parse(localStorage.getItem('userObj')),
        isLoading: false,
        isAuthenticated: true,
      });
    };

    getAuthUser();
  }, []);

  const signInUser = async ({ userName, password }: { userName: string; password: string }) => {
    dispatch(fetchStart());
    try {
      const { data } = await jwtAxios.post(LOGIN_URL, { userName, password });
      console.log('data', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userObj', JSON.stringify({ userName: data?.userName }));

      setAuthToken(data.token);
      setToken(data.token);
      setJWTAuthData({
        user: { userName: data?.userName || JSON.parse(localStorage.getItem('userObj'))?.userName },
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError(error?.response?.data ?? 'Something went wrong'));
    }
  };

  const signUpUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    dispatch(fetchStart());
    try {
      const { data } = await jwtAxios.post(LOGIN_URL, { name, email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      console.log('errorerror', error);

      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      // dispatch(fetchError(`${error?.response?.data}`));
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
