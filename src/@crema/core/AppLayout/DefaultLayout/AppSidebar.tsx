import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import { toggleNavCollapsed } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import AppScrollbar from '../../AppScrollbar';
import VerticalNav from '../components/VerticalNav';
import MainSidebar from '../components/MainSidebar';
import { useLayoutContext } from '../../../utility/AppContextProvider/LayoutContextProvider';
import UserInfo from '../components/UserInfo';
import { useSidebarContext } from '../../../utility/AppContextProvider/SidebarContextProvider';
import { AppState } from '../../../../redux/store';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import Logout from 'baseComponent/Logout';

interface AppSidebarProps {
  position?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ variant = '', position = 'left' }) => {
  const dispatch = useDispatch();
  const navCollapsed = useSelector<AppState, AppState['settings']>(({ settings }) => settings).navCollapsed;
  const { footer, footerType } = useLayoutContext();
  const { sidebarTextColor } = useSidebarContext();

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor={position}
          open={navCollapsed}
          onClose={() => handleToggleDrawer()}
          classes={{
            root: clsx(variant),
            paper: clsx(variant),
          }}
          style={{ position: 'absolute' }}
        >
          <MainSidebar>
            <UserInfo color={sidebarTextColor} />
            <AppScrollbar
              sx={{
                py: 6,
                height: 'calc(100vh - 70px) !important',
                borderTop: (theme: { palette: { divider: string } }) => `solid 1px ${theme.palette.divider}`,
                mt: 0.5,
              }}
            >
              <VerticalNav />
              <Logout />
            </AppScrollbar>
          </MainSidebar>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <MainSidebar>
          <UserInfo color={sidebarTextColor} />
          <AppScrollbar
            className={clsx({
              'has-footer-fixed': footer && footerType === 'fixed',
            })}
            sx={{
              py: 6,
              height: 'calc(100vh - 70px) !important',
              borderTop: (theme: { palette: { divider: string } }) => `solid 1px ${theme.palette.divider}`,
              mt: 0.5,
              '&.has-footer-fixed': {
                height: {
                  xs: 'calc(100vh - 117px) !important',
                  xl: 'calc(100vh - 127px) !important',
                },
              },
            }}
          >
            <VerticalNav />
            <Logout />
          </AppScrollbar>
        </MainSidebar>
      </Hidden>
    </>
  );
};

export default AppSidebar;
