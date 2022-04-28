import {useCallback, useState} from 'react';
import {createField} from 'src/core/field';

export const useField = () => {
  const [field, setField] = useState(createField());

  const resetField = useCallback(() => {
    setField(createField());
  }, []);

  return {field, setField, resetField};
};
