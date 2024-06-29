import { LanguageProps } from '@crema/core/AppLngSwitcher/data';
import defaultConfig from '@crema/utility/AppContextProvider/defaultConfig';

let currentLanguage = (JSON.parse(localStorage.getItem('lan')) as LanguageProps) || {
  languageId: 'english',
  locale: 'en',
  name: 'English',
};

export const getUserAvatar = (userName: string) => {
  if (userName) {
    return userName?.charAt(0).toUpperCase();
  }
  return '';
};

export const getCurrentLanguage = () => {
  if (currentLanguage) {
    let language: LanguageProps = {
      languageId: currentLanguage?.languageId,
      locale: currentLanguage?.locale,
      name: currentLanguage?.name,
    };
    return language;
  }
  return defaultConfig.locale;
};

export const getValueBasedOnCurrentLanguage = (nameAr: string, nameEn: string) => {
  if (currentLanguage && typeof currentLanguage === 'object' && currentLanguage?.locale === 'en') {
    return nameEn;
  } else if (currentLanguage && typeof currentLanguage === 'object' && currentLanguage?.locale === 'ar') return nameAr;
  return '';
};
