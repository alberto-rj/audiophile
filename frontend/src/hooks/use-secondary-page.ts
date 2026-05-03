import { useEffect } from 'react';

export const useSecondaryPage = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-is-secondary-page', 'true');

    return () => {
      document.documentElement.removeAttribute('data-is-secondary-page');
    };
  }, []);
};
