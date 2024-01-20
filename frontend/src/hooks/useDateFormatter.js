import dayjs from 'dayjs';
import 'dayjs/locale/ms';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const DateFormat = {
  DDMMM: 'DD MMM',
  DDMMMYYYY: 'DD MMM YYYY'
}

const useDateFormatter = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  useEffect(() => {
    if (currentLanguage === 'bm') {
      dayjs.locale('ms');
    } else {
      dayjs.locale('en');
    }
  }, [currentLanguage]);

  const formatDate = (options) => {
    const { date, format } = options;
    if (date) return dayjs(date).format(format);
    else return '';
  };

  return { formatDate };
};

export default useDateFormatter;
