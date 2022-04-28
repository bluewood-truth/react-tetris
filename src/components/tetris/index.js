import React, {useState} from 'react';
import {
  TRANSFORM,
  transform,
  TRANSFORM_STATE,
  DIRECTION,
} from 'src/core/transform';
import {renderBlock} from 'src/core/render';
import {useBlock} from 'src/hooks/useBlock';
import {usePlayfield} from 'src/hooks/usePlayfield';
import {useNextBlocks} from 'src/hooks/useNextBlocks';
import {useFrame} from 'src/hooks/useFrame';
import {Layout} from '../layout';
import {PanelGroup, Panel} from '../panel';
import {Playfield} from '../playfield';

export const Tetris = () => {
  const {nextBlocks, block, field, handleKeyDown, startGame} = useGame();

  return (
    <Layout>
      <Playfield field={renderBlock(field, block)} onKeyDown={handleKeyDown} />
      <PanelGroup>
        <Panel label='GAME TEST'>
          <button onClick={startGame}>start</button>
        </Panel>
        <Panel label='NEXT'>
          {nextBlocks.current.slice(0, 5).map((next, i) => (
            <p key={i}>{next}</p>
          ))}
        </Panel>
      </PanelGroup>
    </Layout>
  );
};

const DROP_DELAY = 48;
const LOCK_DELAY = 60;

const useGame = () => {
  const [isPlaying, setPlaying] = useState(false);
  const {field, lock, resetField} = usePlayfield();
  const {block, setBlock, setNewBlock} = useBlock(field);
  const {nextBlocks, resetNextBlocks, popNextBlock} = useNextBlocks();

  const {resetFrame: resetDropTimer} = useFrame({
    isEnabled: isPlaying,
    tick: (currentFrame) => {
      if (currentFrame >= DROP_DELAY) {
        drop();
      }
      if (currentFrame >= LOCK_DELAY) {
        lock(block, (clearLineCount) => {
          console.log('clear', clearLineCount, 'lines');
          resetDropTimer();
          setNewBlock(popNextBlock());
        });
      }
    },
  });

  const startGame = () => {
    resetField();
    resetNextBlocks();
    setNewBlock(popNextBlock());
    setPlaying(true);
  };

  const pauseGame = () => {
    setPlaying((prev) => !prev);
  };

  const drop = () => {
    const result = transform(TRANSFORM.MOVE, block, field, DIRECTION.BOTTOM);
    console.log(field);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      console.log('drop');
      setBlock(result.block);
      resetDropTimer();
    }
  };

  const rotate = () => {
    const result = transform(TRANSFORM.ROTATE, block, field);

    if (result.state === TRANSFORM_STATE.SUCCESS) {
      console.log('rotate');
      setBlock(result.block);
    }
  };

  const move = (direction) => {
    const result = transform(
      TRANSFORM.MOVE,
      block,
      field,
      DIRECTION[direction]
    );

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
    let result = transform(TRANSFORM.MOVE, block, field, DIRECTION.BOTTOM);
    while (result.state === TRANSFORM_STATE.SUCCESS) {
      newBlock = result.block;
      result = transform(TRANSFORM.MOVE, result.block, field, DIRECTION.BOTTOM);
    }

    console.log('hard drop');
    lock(newBlock, (clearLineCount) => {
      console.log('clear', clearLineCount, 'lines');
      resetDropTimer();
      setNewBlock(popNextBlock());
    });
  };

  const {handleKeyDown} = useKeyboard({
    move,
    drop,
    rotate,
    hardDrop,
    pauseGame,
  });

  return {
    handleKeyDown,
    startGame,
    pauseGame,
    nextBlocks,
    block,
    field,
  };
};

const useKeyboard = ({move, drop, rotate, hardDrop, pauseGame}) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        move(DIRECTION.LEFT);
        break;
      case 'ArrowRight':
        move(DIRECTION.RIGHT);
        break;
      case 'ArrowDown':
        drop();
        break;
      case 'ArrowUp':
        rotate();
        break;
      case ' ':
        hardDrop();
        break;
      case 'Escape':
        pauseGame();
        break;
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
