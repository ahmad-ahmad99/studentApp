import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AuthRoutes from '@crema/utility/AuthRoutes';
import AppContextProvider from '@crema/utility/AppContextProvider';
import AppThemeProvider from '@crema/utility/AppThemeProvider';
import AppStyleProvider from '@crema/utility/AppStyleProvider';
import AppLocaleProvider from '@crema/utility/AppLocaleProvider';
import AppLayout from '@crema/core/AppLayout';
import configureStore from 'redux/store';
import { HashRouter } from 'react-router-dom';
import JWTAuthAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppInfoView } from '@crema';

export const store = configureStore();

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 0, // Set cacheTime to 0 to disable caching
        refetchInterval: false, // Disable automatic refetching
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Provider store={store}>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <HashRouter>
                  <JWTAuthAuthProvider>
                    <AuthRoutes>
                      <CssBaseline />
                      <AppLayout />
                      <AppInfoView />
                    </AuthRoutes>
                  </JWTAuthAuthProvider>
                </HashRouter>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </Provider>
      </AppContextProvider>
    </QueryClientProvider>
  );
};

export default App;
