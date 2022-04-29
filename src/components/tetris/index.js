import React, {useCallback, useEffect, useRef} from 'react';

import {Layout} from '../layout';
import {PanelGroup, Panel, TimePanel} from '../panel';
import {Field} from '../field';

import {useBlock} from 'src/hooks/useBlock';
import {useField} from 'src/hooks/useField';
import {useFrame} from 'src/hooks/useFrame';
import {GAME_STATE, useGame} from 'src/hooks/useGame';
import {transform, TRANSFORM_STATE, DIRECTION} from 'src/core/transform';
import {clearLine, isGameOver, renderBlock} from 'src/core/field';
import {Block} from '../block';

export const Tetris = ({gameMode}) => {
  const {
    score,
    lines,
    lineClearCallback,
    gameState,
    setStart,
    setPause,
    setGameOver,
    // setFinish,
  } = useGame();
  const {nextBlocks, block, field, handleKeyDown, startGame} = useTetris(
    gameMode,
    lineClearCallback,
    gameState,
    setStart,
    setPause,
    setGameOver
  );

  const screenRef = useRef(null);

  useEffect(() => {
    if (!screenRef) return;
    screenRef.current.focus();
    startGame();
  }, [startGame]);

  return (
    <Layout ref={screenRef} onKeyDown={handleKeyDown}>
      <Field field={field} />
      <Block block={block} />
      <PanelGroup>
        <Panel label='NEXT'>
          {nextBlocks.current.slice(0, 5).map((next, i) => (
            <p key={i}>{next}</p>
          ))}
        </Panel>
        <Panel label='SCORE' value={score} />
        <Panel label='LINES' value={lines} />
        <TimePanel enabled={gameState === GAME_STATE.PLAYING} />
      </PanelGroup>
    </Layout>
  );
};

const DROP_DELAY = 48;
const LOCK_DELAY = 60;

const useTetris = (
  gameMode,
  lineClearCallback,
  gameState,
  setStart,
  setPause,
  setGameOver
) => {
  const {field, setField, resetField} = useField();
  const {block, setBlock, setNewBlock, nextBlocks, resetNextBlocks} =
    useBlock();

  useEffect(() => {
    console.log('field');
  }, [field]);

  const {resetFrame: resetDropTimer} = useFrame({
    isEnabled: gameState === GAME_STATE.PLAYING,
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
    setStart();
  }, [resetField, resetNextBlocks, setNewBlock, setStart]);

  const pauseGame = () => {
    setPause();
  };

  const lock = (block) => {
    if (isGameOver(block)) {
      console.log('gameover');
      setField(renderBlock(field, block, true));
      setGameOver();
      return;
    }

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
    isEnabled: gameState === GAME_STATE.PLAYING,
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
    nextBlocks,
    block,
    field,
  };
};

const useKeyboard = ({
  isEnabled,
  move,
  drop,
  rotate,
  hardDrop,
  startGame,
  pauseGame,
}) => {
  const handleKeyDown = (e) => {
    if (!isEnabled) return;
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
