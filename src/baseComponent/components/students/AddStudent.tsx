import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import LoadingButton from '@mui/lab/LoadingButton';
import { Autocomplete, Box, Button, Dialog, DialogActions, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import React, { forwardRef, useRef } from 'react';
import { useIntl } from 'react-intl';
import { ICreateStudentDto } from 'types/appTypes/students';
import * as yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import countries, { Country } from '@crema/services/db/countries';
import AppSelectField from '@crema/core/AppFormComponents/AppSelectField';
import { IGenderItemDto, IGenderListDto } from 'types/appTypes/gender';
import { CREATE_STUDENT_URL, GENDERS_URL, GRADES_URL, STUDENT_LIST_URL } from 'services/appUrls';
import { useCreateGitItemService, useGitListService } from 'services';
import { IGradesListDto } from 'types/appTypes/grades';
import { showMessage } from 'redux/actions';
import { useDispatch } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IAddStudentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddStudent: React.FC<IAddStudentProps> = (props) => {
  const { open, setOpen } = props;
  const { messages, locale } = useIntl();
  const dispatch = useDispatch();

  const formRef = useRef<FormikProps<ICreateStudentDto>>(null);
  const createStudent = useCreateGitItemService<string, ICreateStudentDto>(CREATE_STUDENT_URL, STUDENT_LIST_URL, () => {
    dispatch(showMessage(messages['addSuccessfully'] as string));
    setOpen(false);
  });

  const validationSchema = yup.object({
    // email: yup.string().email(String(messages['validation.emailFormat'])).required(String(messages['validation.emailRequired'])),
    firstName: yup.string().required(String(messages['common.validation.required'])),

    lastName: yup.string().required(String(messages['common.validation.required'])),
    birthDate: yup.string().required(String(messages['common.validation.required'])),
    country: yup.string().required(String(messages['common.validation.required'])),
    city: yup.string().required(String(messages['common.validation.required'])),
    phone: yup.string().required(String(messages['common.validation.required'])),
    grade: yup.string().required(String(messages['common.validation.required'])),
    gender: yup.string().required(String(messages['common.validation.required'])),
  });

  //for get grad List
  const { data: gradesList, isFetching, error } = useGitListService<IGradesListDto>(GRADES_URL);

  //for get gender List
  const { data: gendersList, isFetching: isFetchingGender, error: errorGender } = useGitListService<IGenderListDto>(GENDERS_URL);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      sx={{
        padding: '30px 30px 20px',
        '&': {
          padding: '30px 30px 20px',
        },

        '& .MuiPaper-elevation': {
          borderRadius: '11px',
        },
      }}
    >
      <Grid container xs={12} sx={{ padding: '30px 30px 20px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant='h1' component={'p'} fontSize='40px' mb={8}>
            <IntlMessages id='common.add.student' />
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Grid item xs={12} sx={{ padding: '0px 0px 20px 30px' }}>
        <Formik
          validateOnChange={true}
          innerRef={formRef}
          initialValues={{
            firstName: '',
            lastName: '',
            birthDate: '',
            country: '',
            city: '',
            phone: '',
            remarks: '',
            grade: '',
            gender: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            createStudent.mutate(data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form style={{ height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'space-around' }} noValidate autoComplete='off'>
              <Grid container xs={12} columnSpacing={6} rowSpacing={6}>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='firstName'
                    title={'student.firstName'}
                    variant='outlined'
                    withStare
                    size='small'
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='lastName'
                    title={'student.lastName'}
                    variant='outlined'
                    size='small'
                    withStare
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h2' component={'p'} sx={{ fontSize: '18px', color: '#212224', marginBottom: '10px' }}>
                    <IntlMessages id='student.birthDate' />*
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={values.birthDate}
                      onChange={(newValue) => {
                        setFieldValue('birthDate', newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={{
                            ...params.sx,
                            '& .MuiOutlinedInput-input': {
                              backgroundColor: '#F5F5F5',
                            },
                          }}
                          error={errors?.birthDate && touched?.birthDate}
                          helperText={errors?.birthDate}
                          variant='outlined'
                          size='small'
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <AppTextField
                    name='grade'
                    title={'student.grade'}
                    variant='outlined'
                    withStare
                    size='small'
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  /> */}
                  <Typography variant='h2' component={'p'} sx={{ fontSize: '18px', color: '#212224', marginBottom: '10px' }}>
                    <IntlMessages id='student.grade' />*
                  </Typography>
                  <AppSelectField
                    sx={{
                      '&': {
                        backgroundColor: '#F5F5F5',
                      },
                    }}
                    name='grade'
                    fullWidth
                    size='small'
                    variant='outlined'
                    IconComponent={ExpandMoreIcon}
                  >
                    {isFetching ? (
                      <>
                        <MenuItem>loading...</MenuItem>
                      </>
                    ) : (
                      gradesList?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {locale === 'en-US' ? item?.translations?.find((item) => item?.cultureCode === 0).name : item?.translations?.find((item) => item?.cultureCode === 1).name}
                          </MenuItem>
                        );
                      })
                    )}
                  </AppSelectField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h2' component={'p'} sx={{ fontSize: '18px', color: '#212224', marginBottom: '10px' }}>
                    <IntlMessages id='student.country' />*
                  </Typography>
                  <Autocomplete
                    id='country-select-demo'
                    fullWidth
                    sx={{
                      '&': {
                        backgroundColor: '#F5F5F5',
                      },
                    }}
                    size='small'
                    options={countries}
                    onChange={(_, newValue: Country) => {
                      console.log('newValue', newValue);
                      newValue && setFieldValue('country', newValue?.label);
                    }}
                    getOptionLabel={(option: Country) => option.label}
                    renderOption={(props, option) => (
                      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading='lazy'
                          width='20'
                          src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
                          alt=''
                        />
                        {option.label} ({option.code}) +{option.phone}
                      </Box>
                    )}
                    renderInput={(params) => <TextField error={!!errors?.country && !!touched?.country} helperText={errors?.country} variant='outlined' size='small' fullWidth {...params} />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='city'
                    title={'student.city'}
                    variant='outlined'
                    withStare
                    size='small'
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='phone'
                    title={'student.phone'}
                    variant='outlined'
                    withStare
                    size='small'
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <AppTextField
                    name='gender'
                    title={'student.gender'}
                    variant='outlined'
                    size='small'
                    withStare
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  /> */}
                  <Typography variant='h2' component={'p'} sx={{ fontSize: '18px', color: '#212224', marginBottom: '10px' }}>
                    <IntlMessages id='student.gender' />*
                  </Typography>
                  <AppSelectField
                    sx={{
                      '&': {
                        backgroundColor: '#F5F5F5',
                      },
                    }}
                    name='gender'
                    fullWidth
                    size='small'
                    variant='outlined'
                    IconComponent={ExpandMoreIcon}
                  >
                    {isFetchingGender ? (
                      <>
                        <MenuItem>loading...</MenuItem>
                      </>
                    ) : (
                      gendersList?.map((item) => {
                        return (
                          <MenuItem value={item?.id}>
                            {locale === 'en-US' ? item?.translations?.find((item) => item?.cultureCode === 0).name : item?.translations?.find((item) => item?.cultureCode === 1).name}
                          </MenuItem>
                        );
                      })
                    )}
                  </AppSelectField>
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name='remarks'
                    title={'student.remarks'}
                    variant='outlined'
                    size='small'
                    fullWidth
                    styleForTitle={{
                      fontSize: '18px',
                      color: '#212224',
                      marginBottom: '10px',
                    }}
                  />
                </Grid>
                <Grid item xs={12} container sx={{ justifyContent: 'center', paddingTop: '10px', paddingButton: '16px' }} columnSpacing={6} rowSpacing={6}>
                  <Grid item xs={12} md={6}>
                    <LoadingButton
                      loading={createStudent.isLoading}
                      variant='outlined'
                      type='submit'
                      loadingPosition='end'
                      style={{
                        backgroundColor: '#1F7BF4',
                        color: '#fff',
                        width: '100%',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                    >
                      <IntlMessages id={'common.add'} />
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      onClick={handleClose}
                      variant='text'
                      sx={{
                        border: '1px solid #1F7BF4',
                        color: '#1F7BF4',
                        width: '100%',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                    >
                      <IntlMessages id='common.cancel' />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Dialog>
  );
};

export default AddStudent;
