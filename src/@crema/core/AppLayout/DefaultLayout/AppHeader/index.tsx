import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppLngSwitcher from '@crema/core/AppLngSwitcher';
import Box from '@mui/material/Box';
import AppSearchBar from '@crema/core/AppSearchBar';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import { toggleNavCollapsed } from '../../../../../redux/actions';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import AppMessages from '../../../AppMessages';
import AppNotifications from '../../../AppNotifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppTooltip from '../../../AppTooltip';
import { alpha } from '@mui/material/styles';
import AppLogo from '../../components/AppLogo';
import UserInfoWithLogo from '../../components/UserInfo/UserInfoWithLogo';

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  return (
    <AppBar
      position='relative'
      color='inherit'
      sx={{
        boxShadow: 'none',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: 'background.paper',
        width: {
          xs: '100%',
        },
      }}
      className='app-bar'
    >
      <Toolbar
        sx={{
          boxSizing: 'border-box',
          minHeight: { xs: 56, sm: 70 },
          paddingLeft: { xs: 5 },
          paddingRight: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Hidden lgUp>
          <IconButton
            sx={{
              color: 'text.secondary',
            }}
            edge='start'
            className='menu-btn'
            color='inherit'
            aria-label='open drawer'
            onClick={() => dispatch(toggleNavCollapsed())}
            size='large'
          >
            <MenuIcon
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </IconButton>
        </Hidden>
        {/* <AppLogo />
        <AppSearchBar iconPosition='right' placeholder='Search…' /> */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Box sx={{ ml: 4 }}>
          <Hidden smDown>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginLeft: -2,
                marginRight: -2,
              }}
            >
              <Box
                sx={{
                  px: 1.85,
                }}
              >
                <UserInfoWithLogo />
              </Box>
            </Box>
          </Hidden>
        </Box>
        <AppLngSwitcher iconOnly={false} tooltipPosition='bottom' />
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
