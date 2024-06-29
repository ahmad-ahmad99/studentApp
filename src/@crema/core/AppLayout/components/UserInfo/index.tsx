import React from 'react';
import orange from '@mui/material/colors/orange';
import { useAuthMethod, useAuthUser } from '../../../../utility/AuthHooks';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fonts } from '../../../../../shared/constants/AppEnums';
import { useNavigate } from 'react-router-dom';
import { useJWTAuth, useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { getUserAvatar } from 'helper';
import IntlMessages from '@crema/utility/IntlMessages';

interface UserInfoProps {
  color?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ color = 'text.secondary' }) => {
  const { user } = useJWTAuth();
  const { logout } = useJWTAuthActions();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const getUserAvatar = () => {
  //   if (user?.userName) {
  //     return user?.userName?.charAt(0).toUpperCase();
  //   }
  // };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          py: 3,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        className='user-info-view'
      >
        <Box sx={{ py: 0.5 }}>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              fontSize: 24,
              backgroundColor: orange[500],
            }}
          >
            {getUserAvatar(user?.userName)}
          </Avatar>
        </Box>
        <Box
          sx={{
            width: { xs: 'calc(100% - 62px)', xl: 'calc(100% - 72px)' },
            ml: 4,
            color: color,
          }}
          className='user-info'
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                mb: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
                color: 'inherit',
              }}
              component='span'
            >
              {user?.userName ? user?.userName : 'Admin User '}
            </Box>
            <Box
              sx={{
                ml: 3,
                color: 'inherit',
                display: 'flex',
              }}
            >
              <ExpandMoreIcon />
            </Box>
          </Box>
        </Box>
      </Box>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/my-account');
          }}
        >
          <IntlMessages id='common.myAccount' />
        </MenuItem>
        <MenuItem onClick={logout}>
          <IntlMessages id='common.logout' />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;
