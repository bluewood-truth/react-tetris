import React, {useEffect, useState} from 'react';
import {ACTION, action, ACTION_STATE, DIRECTION} from 'src/core/action';
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

const useGame = () => {
  const {nextBlocks, popNextBlock} = useNextBlocks();
  const {field, lock, resetField} = usePlayfield();
  const {block, setBlock, setNewBlock} = useBlock(field);

  const [isPlaying, setPlaying] = useState(false);
  const [setDropTimer, resetDropTimer] = useTimer((timer) => {
    if (timer >= 48) {
      drop();
    }
    if (timer >= 60) {
      lock(block, (clearLineCount) => {
        console.log('clear', clearLineCount, 'lines');
        resetDropTimer();
        setNewBlock(popNextBlock());
      });
    }
  });

  const startGame = () => {
    resetField();
    setNewBlock(popNextBlock());
    setPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setDropTimer((prev) => prev + 1);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isPlaying, setDropTimer]);

  const drop = () => {
    const result = action(ACTION.DROP, block, field);

    if (result.state === ACTION_STATE.SUCCESS) {
      console.log('drop');
      setBlock(result.block);
      resetDropTimer();
    }
  };

  const rotate = () => {
    const result = action(ACTION.ROTATE, block, field);

    if (result.state === ACTION_STATE.SUCCESS) {
      console.log('rotate');
      setBlock(result.block);
    }
  };

  const move = (direction) => {
    const result = action(ACTION.MOVE, block, field, DIRECTION[direction]);

    if (result.state === ACTION_STATE.SUCCESS) {
      console.log('move:', direction);
      setBlock(result.block);
      if (DIRECTION === 'DOWN') {
        resetDropTimer();
      }
    }
  };

  const hardDrop = () => {
    const result = action(ACTION.HARD_DROP, block, field);

    if (result.state === ACTION_STATE.SUCCESS) {
      console.log('hard drop');
      lock(result.block, (clearLineCount) => {
        console.log('clear', clearLineCount, 'lines');
        resetDropTimer();
        setNewBlock(popNextBlock());
      });
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        move('LEFT');
        break;
      case 'ArrowRight':
        move('RIGHT');
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
        setPlaying(prev => !prev);
        break;
    }
  };

  return {handleKeyDown, isPlaying, startGame, nextBlocks, block, field};
};
