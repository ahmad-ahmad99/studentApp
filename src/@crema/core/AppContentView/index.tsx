import React from 'react';
import { Navigate, Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import AppSuspense from '@crema/core/AppSuspense';
import AppFooter from '../AppLayout/components/AppFooter';
import AppErrorBoundary from '../AppErrorBoundary';
import Box from '@mui/material/Box';
import AppContentViewWrapper from './AppContentViewWrapper';
import { SxProps } from '@mui/system';
import { useAuthUser } from '../../utility/AuthHooks';
import { anonymousStructure, authorizedStructure, unAuthorizedStructure } from '../../../pages';
import generateRoutes from '../../utility/RouteGenerator';
import { initialUrl } from '../../../shared/constants/AppConst';

interface AppContentViewProps {
  sxStyle?: SxProps;
}

const AppContentView: React.FC<AppContentViewProps> = ({ sxStyle }) => {
  const { user, isAuthenticated } = useAuthUser();
  const location = useLocation();
  const routes = useRoutes(
    generateRoutes({
      isAuthenticated: isAuthenticated,
      userRole: 'Admin',
      unAuthorizedStructure,
      authorizedStructure,
      anonymousStructure,
    })
  );
  return (
    <AppContentViewWrapper>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          p: { xs: 5, md: 7.5, lg: location?.pathname?.includes('/signin') ? 0 : '25px', xl: location?.pathname?.includes('/signin') ? 0 : '25px' },
          ...sxStyle,
        }}
        className='app-content'
      >
        <AppSuspense>
          <AppErrorBoundary>
            {routes}
            <Routes>
              <Route path='/' element={<Navigate to={initialUrl} />} />
            </Routes>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </AppContentViewWrapper>
  );
};

export default AppContentView;
