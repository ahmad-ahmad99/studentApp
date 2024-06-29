import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Fonts } from '../../shared/constants/AppEnums';

interface AuthWrapperProps {
  children: any;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: '100%',
          minHeight: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '50%', lg: '45%' },
            position: 'relative',
            padding: { xs: 5, lg: 10 },
            display: { xs: 'none', sm: 'flex' },
            alignItems: { sm: 'center' },
            justifyContent: { sm: 'center' },
            flexDirection: { sm: 'column' },
            backgroundColor: '#fff',

            fontSize: 14,
          }}
        >
          <Box
            sx={{
              maxWidth: '100%',
              textAlign: 'center',
            }}
          >
            <img src='./assets/images/login.png' width='70%' alt='login' />
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: '100%', sm: '50%', lg: '55%' },
            padding: { xs: 5, lg: 15 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundImage: 'url(./assets/images/loginCover.png)',
          }}
        >
          {children}
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;
