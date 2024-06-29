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

interface UserInfoProps {
  color?: string;
}

const UserInfoWithLogo: React.FC<UserInfoProps> = ({ color = 'text.secondary' }) => {
  const { user } = useJWTAuth();

  return (
    <>
      <Box
        sx={{
          py: 3,
          px: 3,
          display: 'flex',
          alignItems: 'center',
        }}
        className='user-info-view'
      >
        <Box
          sx={{
            mb: 0,
            ml: 3,
            mr: 3,
            overflow: 'hidden',
            // textOverflow: 'ellipsis',
            color: '#212224',
            whiteSpace: 'nowrap',
            fontSize: '13px',
            fontWeight: Fonts.REGULAR,
          }}
          component='span'
        >
          {user?.userName ? user?.userName : 'Admin User '}
        </Box>
        <Box sx={{ py: 0.5 }}>
          <Avatar
            sx={{
              height: '35.45px',
              width: '32.79px',
              borderRadius: '10px',
              fontSize: 24,
            }}
            src='./assets/images/defaultUser.png'
          >
            {getUserAvatar(user?.userName)}
          </Avatar>
        </Box>
      </Box>
    </>
  );
};

export default UserInfoWithLogo;
