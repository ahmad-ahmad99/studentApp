import Button from '@mui/material/Button';
import { Card, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AppInfoView from '@crema/core/AppInfoView';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import { useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import { Fonts } from '../../../shared/constants/AppEnums';

const SigninJwtAuth = () => {
  const navigate = useNavigate();
  const { signInUser } = useJWTAuthActions();
  const { messages } = useIntl();

  const validationSchema = yup.object({
    // email: yup.string().email(String(messages['validation.emailFormat'])).required(String(messages['validation.emailRequired'])),
    userName: yup.string().required(String(messages['validation.userName'])),

    password: yup.string().required(String(messages['validation.passwordRequired'])),
  });

  return (
    <Card
      sx={{
        padding: '32px 54px 20px 54px',
        borderRadius: 1,
      }}
    >
      <Box>
        <Typography variant='h1' component={'p'} fontSize='40px' mb={8}>
          <IntlMessages id='common.login' />
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5, height: '100%' }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              userName: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              signInUser({
                userName: data.userName,
                password: data.password,
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'space-around' }} noValidate autoComplete='off'>
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    name='userName'
                    title={'common.userName'}
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#666666',
                      marginBottom: '15px',
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    type='password'
                    title={'common.password'}
                    name='password'
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#666666',
                      marginBottom: '15px',
                    }}
                  />
                </Box>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={isSubmitting}
                    sx={{
                      minWidth: '100%',
                      fontWeight: Fonts.REGULAR,
                      fontSize: 16,
                      textTransform: 'capitalize',
                      padding: '12px 16px 12px',
                      mt: 6,
                      borderRadius: '6px',
                    }}
                  >
                    <IntlMessages id='common.signIn' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        <AppInfoView />
      </Box>
    </Card>
  );
};

export default SigninJwtAuth;
