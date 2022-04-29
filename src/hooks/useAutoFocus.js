import {useEffect, useRef} from 'react';

export const useAutoFocus = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef) return;
    elementRef.current.focus();
  }, []);

  return [elementRef];
};
