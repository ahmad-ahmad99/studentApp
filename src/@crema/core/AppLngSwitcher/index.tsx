import React from 'react';
import languageData, { LanguageProps } from './data';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { Fonts } from 'shared/constants/AppEnums';
import { useLocaleActionsContext, useLocaleContext } from '../../utility/AppContextProvider/LocaleContextProvide';
import Typography from '@mui/material/Typography';
import { alpha, Box } from '@mui/material';
import AppTooltip from '../AppTooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AppLngSwitcherProps {
  iconOnly?: boolean;
  tooltipPosition?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
}

const AppLngSwitcher: React.FC<AppLngSwitcherProps> = ({ iconOnly = false, tooltipPosition }) => {
  const { locale } = useLocaleContext();
  const { updateLocale } = useLocaleActionsContext();
  const [anchorElLng, setAnchorElLng] = React.useState<null | HTMLElement>(null);

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLng(event.currentTarget);
  };
  const changeLanguage = (language: LanguageProps) => {
    updateLocale(language);
    localStorage.setItem('lan', JSON.stringify(language));
    setAnchorElLng(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!iconOnly ? (
        <IconButton
          sx={{
            height: 38,
            fontSize: '15px',
            borderRadius: '11px',
            padding: '6px 12px',
            color: '#23272E',
            backgroundColor: 'transparent',
            border: 1.5,
            borderColor: '#999999',
            '&:hover, &:focus': {
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) => alpha(theme.palette.background.default, 0.9),
              borderColor: (theme) => alpha(theme.palette.text.secondary, 0.25),
            },
            '& .langText': {
              ml: 2.5,
              mr: 1.5,
              fontSize: 16,
              fontWeight: Fonts.MEDIUM,
              fontFamily: 'Work Sans',
              display: { sm: 'inline-block' },
            },
            '& svg': {
              fontSize: 20,
            },
          }}
          className='lang-switcher-btn'
          aria-label='account of current user'
          aria-controls='language-switcher'
          aria-haspopup='true'
          onClick={onClickMenu}
          color='inherit'
          size='large'
        >
          <span className='langText'>{locale.name}</span>

          <ExpandMoreIcon />
        </IconButton>
      ) : (
        <AppTooltip title='Language' placement={tooltipPosition}>
          <IconButton
            sx={{
              height: 40,
              width: 40,
              borderRadius: '50%',
              padding: '6px 9px',
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: (theme) => theme.palette.background.default,
              border: 1,
              borderColor: 'transparent',
              '&:hover, &:focus': {
                color: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) => alpha(theme.palette.background.default, 0.9),
                borderColor: (theme) => alpha(theme.palette.text.secondary, 0.25),
              },
              '& .langText': {
                ml: 2.5,
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
                fontFamily: 'Work Sans',

                display: { xs: 'none', sm: 'inline-block' },
              },
              '& svg': {
                fontSize: 20,
              },
            }}
            className='lang-switcher-btn'
            aria-label='account of current user'
            aria-controls='language-switcher'
            aria-haspopup='true'
            onClick={onClickMenu}
            color='inherit'
            size='large'
          >
            <TranslateOutlinedIcon />
          </IconButton>
        </AppTooltip>
      )}
      <Menu
        anchorEl={anchorElLng}
        sx={{ fontWeight: Fonts.MEDIUM }}
        defaultValue={locale.locale || 'en'}
        id='language-switcher'
        keepMounted
        open={Boolean(anchorElLng)}
        onClose={() => setAnchorElLng(null)}
      >
        {languageData.map((language, index) => (
          <MenuItem key={index} value={language.locale} onClick={() => changeLanguage(language)}>
            <Box
              sx={{
                width: 160,
              }}
            >
              <Typography
                sx={{
                  mb: 0,
                  fontSize: { xs: 14, sm: 16 },
                }}
                component='h4'
                variant='h4'
              >
                {language.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AppLngSwitcher;
