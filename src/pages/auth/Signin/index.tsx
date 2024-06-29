import React from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import AppLogo from '@crema/core/AppLayout/components/AppLogo';
import SigninFirebase from './SigninFirebase';
import SigninJwtAuth from './SigninJwtAuth';

const Signin = () => {
  return (
    <AuthWrapper>
      <SigninJwtAuth />
    </AuthWrapper>
  );
};

export default Signin;
