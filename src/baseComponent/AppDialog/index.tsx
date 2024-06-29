import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import LoadingButton from '@mui/lab/LoadingButton';
import { Fonts } from 'shared/constants/AppEnums';

interface IAppDialogProps {
  title: string;
  textConfirmation: string;
  subAlertText?: string;
  confirmationTextBtn: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundColorAgreeBtn: string;
  colorCancelBtn: string;
  loading?: boolean;
  onClickConfirmation: () => void;
  srcIcon: string;
}
const AppDialog: React.FC<IAppDialogProps> = (props) => {
  const { title, textConfirmation, subAlertText, loading = false, open, setOpen, srcIcon, backgroundColorAgreeBtn, colorCancelBtn, onClickConfirmation, confirmationTextBtn } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='xs'
      fullWidth
      sx={{
        '& .MuiPaper-elevation': {
          borderRadius: '11px',
          padding: '0px 0px 40px',
        },
        textAlign: 'center',
      }}
    >
      <div style={{ height: '130px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColorAgreeBtn}` }}>
        <img src={srcIcon} width='56px' />
      </div>
      <DialogTitle
        id='alert-dialog-title'
        sx={{
          color: `${backgroundColorAgreeBtn}`,
          fontWeight: Fonts.BOLD,
          fontSize: '20px',
          padding: '25px 18px 20px',
        }}
      >
        <IntlMessages id={title} />
      </DialogTitle>
      <DialogContent sx={{ padding: '0px 18px 30px', display: 'flex', justifyContent: 'center' }}>
        <DialogContentText
          id='alert-dialog-description'
          sx={{
            color: '#131212CC',
            fontSize: '14px',
            width: { xs: '100%', sm: '100%', md: '80%' },
          }}
        >
          <IntlMessages id={textConfirmation} />
          {subAlertText && (
            <p style={{ color: `${backgroundColorAgreeBtn}` }}>
              <IntlMessages id={subAlertText} />
            </p>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '0px 18px', gap: '10px' }}>
        <LoadingButton
          loading={loading}
          variant='outlined'
          loadingPosition='end'
          onClick={onClickConfirmation}
          style={{
            backgroundColor: `${backgroundColorAgreeBtn}`,
            color: '#fff',
            width: '100%',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          <IntlMessages id={`${confirmationTextBtn}`} />
        </LoadingButton>
        <Button
          onClick={handleClose}
          variant='text'
          sx={{
            border: `1px solid ${backgroundColorAgreeBtn}`,
            color: `${colorCancelBtn}`,
            width: '100%',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          <IntlMessages id='common.cancel' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppDialog;
