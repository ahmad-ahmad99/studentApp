export interface LanguageProps {
  languageId: string;
  locale: string;
  name: string;
}

const languageData: LanguageProps[] = [
  {
    languageId: 'english',
    locale: 'en',
    name: 'English',
  },

  {
    languageId: 'saudi-arabia',
    locale: 'ar',
    name: 'عربي',
  },
];
export default languageData;
