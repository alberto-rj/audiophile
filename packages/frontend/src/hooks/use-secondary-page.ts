import { useLayoutEffect } from 'react';

export const useSecondaryPage = () => {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-is-secondary-page', 'true');

    return () => {
      document.documentElement.removeAttribute('data-is-secondary-page');
    };
  }, []);
};
