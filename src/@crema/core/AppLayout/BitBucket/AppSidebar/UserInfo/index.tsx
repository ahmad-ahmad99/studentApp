import React from 'react';
import orange from '@mui/material/colors/orange';
import { useAuthMethod, useAuthUser } from '../../../../../utility/AuthHooks';
import { alpha, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fonts } from '../../../../../../shared/constants/AppEnums';
import { useNavigate } from 'react-router-dom';
import { useJWTAuth } from '@crema/services/auth/jwt-auth/JWTAuthProvider';

const UserInfo = () => {
  const { logout } = useAuthMethod();
  const { user } = useJWTAuth();
  const navigate = useNavigate();
  console.log('useruser', user);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    console.log('user', user);

    if (user?.userName) {
      return user?.userName?.charAt(0).toUpperCase() || '';
    }
  };

  return (
    <Box
      sx={{
        py: 3,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <Box onClick={handleClick}>
        <Avatar
          sx={{
            height: 30,
            width: 30,
            fontSize: 20,
            backgroundColor: orange[500],
          }}
        >
          {getUserAvatar()}
        </Avatar>
      </Box>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          py: 4,
        }}
      >
        <MenuItem
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.08),
            px: 6,
            py: 3,
          }}
        >
          <Box
            sx={{
              mr: 3.5,
            }}
          >
            <Avatar
              sx={{
                height: 40,
                width: 40,
                fontSize: 20,
                backgroundColor: orange[500],
              }}
            >
              {getUserAvatar()}
            </Avatar>
          </Box>

          <Box>
            <Box
              sx={{
                mb: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
              }}
              component='span'
            >
              {user?.userName ? user?.userName : 'Admin User '}
            </Box>
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/my-account');
          }}
          sx={{
            px: 6,
            py: 1.5,
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          sx={{
            px: 6,
            py: 1.5,
          }}
          onClick={logout}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserInfo;
