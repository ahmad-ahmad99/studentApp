import React from 'react';
import { FieldHookConfig, useField } from 'formik';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Typography, TypographyProps, Grid } from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';

const AppTextField = (
  props: TextFieldProps &
    FieldHookConfig<string> & {
      title?: string;
      styleForTitle?: React.CSSProperties;
      withStare?: boolean;
    }
) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Grid item>
      {props.title && (
        <Typography variant='h2' component={'p'} sx={{ ...props.styleForTitle }}>
          <IntlMessages id={props.title} />
          {props.withStare && <>*</>}
        </Typography>
      )}

      <TextField
        {...props}
        {...field}
        helperText={errorText}
        error={!!errorText}
        sx={{
          ...props.sx,
          '& .MuiOutlinedInput-input': {
            backgroundColor: '#F5F5F5',
          },
        }}
      />
    </Grid>
  );
};

export default AppTextField;
