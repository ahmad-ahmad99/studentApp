import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import IntlMessages from '@crema/utility/IntlMessages';
import { Box, Typography } from '@mui/material';
import AppDialog from 'baseComponent/AppDialog';
import { useState } from 'react';

export default function Logout() {
  const { logout } = useJWTAuthActions();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  return (
    <>
      <Box
        component='div'
        onClick={() => {
          setShowLogoutModal(true);
          // logout();
        }}
        sx={{
          position: 'absolute',
          bottom: 50,
          width: '100%',
          height: '52px',
          my: 0.25,
          cursor: 'pointer',
          display: 'flex',
          justify: 'flex-start',
          alignItems: 'center',
          padding: '24px 12px 24px 22px',
        }}
      >
        <img src='./assets/images/logoutIcon.png' width='30px' style={{ marginRight: 11, marginLeft: 11 }} />
        <Typography component={'p'} fontSize={'22px'} color='#000000' fontWeight={500}>
          <IntlMessages id={'common.logout'} />
        </Typography>
      </Box>
      {showLogoutModal && (
        <AppDialog
          title='common.dialog.singOut.title'
          textConfirmation='common.dialog.singOut.textConfirmation'
          onClickConfirmation={() => logout()}
          open={showLogoutModal}
          setOpen={setShowLogoutModal}
          confirmationTextBtn={'common.singOut'}
          colorCancelBtn='#1F7BF4'
          backgroundColorAgreeBtn={'#1F7BF4'}
          srcIcon='./assets/images/logoutDialogIcon.png'
        />
      )}
    </>
  );
}
