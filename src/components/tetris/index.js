import React, {useCallback, useEffect, useRef} from 'react';

import {Layout} from '../layout';
import {PanelGroup, Panel} from '../panel';
import {Field} from '../field';

import {useBlock} from 'src/hooks/useBlock';
import {useField} from 'src/hooks/useField';
import {useFrame} from 'src/hooks/useFrame';
import {useGame} from 'src/hooks/useGame';
import {transform, TRANSFORM_STATE, DIRECTION} from 'src/core/transform';
import {clearLine, renderBlock} from 'src/core/field';

export const Tetris = () => {
  const {nextBlocks, block, field, handleKeyDown, startGame, lines, score} =
    useTetris();

  const fieldRef = useRef(null);

  useEffect(() => {
    if (!fieldRef) return;
    fieldRef.current.focus();
    startGame();
  }, [startGame]);

  return (
    <Layout>
      <Field
        field={renderBlock(field, block)}
        onKeyDown={handleKeyDown}
        ref={fieldRef}
      />
      <PanelGroup>
        <Panel label='GAME TEST'>
          <button onClick={startGame}>start</button>
        </Panel>
        <Panel label='NEXT'>
          {nextBlocks.current.slice(0, 5).map((next, i) => (
            <p key={i}>{next}</p>
          ))}
        </Panel>
        <Panel label='SCORE' value={score} />
        <Panel label='LINES' value={lines} />
      </PanelGroup>
    </Layout>
  );
};

const DROP_DELAY = 48;
const LOCK_DELAY = 60;

const useTetris = () => {
  const {isPlaying, setPlaying, score, lines, lineClearCallback} = useGame();
  const {field, setField, resetField} = useField();
  const {block, setBlock, setNewBlock, nextBlocks, resetNextBlocks} =
    useBlock();

  const {resetFrame: resetDropTimer} = useFrame({
    isEnabled: isPlaying,
    tick: (currentFrame) => {
      if (currentFrame >= DROP_DELAY) {
        drop();
      }
      if (currentFrame >= LOCK_DELAY) {
        lock(block);
      }
    },
  });

  const startGame = useCallback(() => {
    console.log('start');
    resetField();
    resetNextBlocks();
    setNewBlock();
    setPlaying(true);
  }, [resetField, resetNextBlocks, setNewBlock, setPlaying]);

  const pauseGame = () => {
    setPlaying((prev) => !prev);
  };

  const lock = (block) => {
    const [newField, clearLineCount] = clearLine(
      renderBlock(field, block, true)
    );

    setField(newField);
    lineClearCallback(clearLineCount);
    resetDropTimer();
    setNewBlock();
  };

  const drop = () => {
    const result = transform.move(block, field, DIRECTION.BOTTOM);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      console.log('drop');
      setBlock(result.block);
      resetDropTimer();
    }
  };

  const rotate = () => {
    const result = transform.rotate(block, field);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      console.log('rotate');
      setBlock(result.block);
    } else {
      console.log(result.message);
    }
  };

  const move = (direction) => {
    const result = transform.move(block, field, DIRECTION[direction]);

    if (result.state === TRANSFORM_STATE.SUCCESS) {
      console.log('move:', direction);
      setBlock(result.block);
      if (direction === DIRECTION.BOTTOM) {
        resetDropTimer();
      }
    }
  };

  const hardDrop = () => {
    let newBlock = block;
    let result = transform.move(block, field, DIRECTION.BOTTOM);
    while (result.state === TRANSFORM_STATE.SUCCESS) {
      newBlock = result.block;
      result = transform.move(result.block, field, DIRECTION.BOTTOM);
    }

    console.log('hard drop');
    lock(newBlock);
  };

  const {handleKeyDown} = useKeyboard({
    move,
    drop,
    rotate,
    hardDrop,
    startGame,
    pauseGame,
  });

  return {
    handleKeyDown,
    startGame,
    pauseGame,
    nextBlocks,
    block,
    field,
    lines,
    score,
  };
};

const useKeyboard = ({move, drop, rotate, hardDrop, startGame, pauseGame}) => {
  const handleKeyDown = (e) => {
    switch (e.key.toLowerCase()) {
      case 'arrowleft':
        move(DIRECTION.LEFT);
        break;
      case 'arrowright':
        move(DIRECTION.RIGHT);
        break;
      case 'arrowdown':
        drop();
        break;
      case 'arrowup':
        rotate();
        break;
      case ' ':
        hardDrop();
        break;
      case 'p':
        pauseGame();
        break;
      case 'r':
        startGame();
    }
  };

  return {handleKeyDown};
};

// const useTime = () => {
//   const [time, setTime] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime((prev) => prev + 10);
//     }, 10);

//     return () => clearInterval(timer);
//   });

//   const reset = () => {
//     setTime(0);
//   };

//   const timeText = `
//     ${Math.round(time / 1000)}.${time / 100 % 10}${time / 10 % 10}
//   `;

//   return {time, timeText, reset};
// };
