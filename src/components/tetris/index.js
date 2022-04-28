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
import {useTimer} from 'src/hooks/useTimer';
import {Layout} from '../layout';
import {PanelGroup, Panel} from '../panel';
import {Playfield} from '../playfield';

export const Tetris = () => {
  const {nextBlocks, block, field, isPlaying, handleKeyDown, startGame} =
    useGame();

  return (
    <Layout>
      <Playfield
        field={isPlaying ? renderBlock(field, block) : field}
        onKeyDown={handleKeyDown}
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
      </PanelGroup>
    </Layout>
  );
};

const DROP_DELAY = 48;
const LOCK_DELAY = 60;

const useGame = () => {
  const {field, lock, resetField} = usePlayfield();
  const {block, setBlock, setNewBlock} = useBlock(field);
  const [isPlaying, setPlaying] = useState(false);
  const {nextBlocks, popNextBlock} = useNextBlocks();
  const [resetDropTimer] = useTimer({
    isEnabled: isPlaying,
    tick: (timer) => {
      if (timer >= DROP_DELAY) {
        drop();
      }
      if (timer >= LOCK_DELAY) {
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
    setNewBlock(popNextBlock());
    setPlaying(true);
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
        setPlaying((prev) => !prev);
        break;
    }
  };

  return {handleKeyDown, isPlaying, startGame, nextBlocks, block, field};
};
