import {useCallback, useState} from 'react';
import {clearLine, createPlayfield, renderBlock} from 'src/core/render';

export const usePlayfield = () => {
  const [field, setField] = useState(createPlayfield());

  const lock = useCallback(
    (block, callback) => {
      const [newField, clearLineCount] = clearLine(renderBlock(field, block));
      setField(newField);
      if (callback) callback(clearLineCount);
    },
    [field]
  );

  const resetField = useCallback(() => {
    setField(createPlayfield());
  }, []);

  return {field, lock, resetField};
};
