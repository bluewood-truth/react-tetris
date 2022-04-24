import {useEffect, useState} from 'react';
import {clearLine, createPlayfield, renderBlock} from 'src/core/render';

export const usePlayfield = () => {
  const [field, setField] = useState(createPlayfield());
  const [isLock, setLock] = useState(false);

  useEffect(() => {
    if (isLock) {
      setField((prev) => {
        const [newField, clearLineCount] = clearLine(prev);
        console.log(`clear ${clearLineCount} lines`);
        return newField;
      });
      setLock(false);
    }
  }, [isLock]);

  const lock = (block, callback) => {
    setField(renderBlock(field, block));
    setLock(true);
    if (callback) callback();
  };

  return {field, lock};
};
