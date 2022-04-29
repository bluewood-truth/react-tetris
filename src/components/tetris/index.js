import React, {useCallback, useEffect, useState} from 'react';

import {Layout} from '../layout';
import {Stage} from '../stage';
import {PanelGroup, Panel, TimePanel} from '../panel';

import {GAME_STATE, useGame} from 'src/hooks/useGame';
import {useAutoFocus} from 'src/hooks/useAutoFocus';
import {useFrame} from 'src/hooks/useFrame';
import {useNextBlocks} from 'src/hooks/useNextBlocks';
import {DIRECTION, transform, TRANSFORM_STATE} from 'src/core/transform';
import {clearLine, isGameOver, renderBlock} from 'src/core/field';
import {useBlock} from 'src/hooks/useBlock';
import {useField} from 'src/hooks/useField';

export const Tetris = ({gameMode}) => {
  const [time, setTime] = useState(0);
  const {field, block, nextBlocks, gameState, score, lines, handleKeyDown} =
    useTetris(gameMode);
  const [ref] = useAutoFocus();

  return (
    <Layout ref={ref} onKeyDown={handleKeyDown}>
      <Stage
        field={field}
        block={block}
        gameState={gameState}
        gameResult={{score, lines, time}}
      />
      <PanelGroup>
        <Panel label='NEXT'>
          {nextBlocks.current.slice(0, 5).map((next, i) => (
            <p key={i}>{next}</p>
          ))}
        </Panel>
        <Panel label='SCORE' value={score} />
        <Panel label='LINES' value={lines} />
        <TimePanel gameState={gameState} setTime={setTime} />
      </PanelGroup>
    </Layout>
  );
};

const DROP_DELAY = 48;
const LOCK_DELAY = 60;

const useTetris = (gameMode) => {
  const [clearLineCount, setClearLineCount] = useState(0);
  const {field, setField, resetField} = useField();
  const {block, updateBlock, setNewBlock} = useBlock();
  const {nextBlocks, resetNextBlocks, popNextBlock} = useNextBlocks();
  const {gameState, score, lines, start, pause, gameOver, finish} = useGame(
    gameMode,
    clearLineCount
  );

  const {resetFrame: resetDropTimer} = useFrame({
    enabled: gameState === GAME_STATE.PLAYING,
    tick: (currentFrame) => {
      if (currentFrame >= DROP_DELAY) {
        drop();
      }
      if (currentFrame >= LOCK_DELAY) {
        lock(block);
      }
    },
  });

  const drop = () => {
    const result = transform.move(block, field, DIRECTION.BOTTOM);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      updateBlock(result.block);
      resetDropTimer();
    }
  };

  const rotate = () => {
    const result = transform.rotate(block, field);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      updateBlock(result.block);
    } else {
      console.log(result.message);
    }
  };

  const move = (direction) => {
    const result = transform.move(block, field, DIRECTION[direction]);

    if (result.state === TRANSFORM_STATE.SUCCESS) {
      updateBlock(result.block);
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

    lock(newBlock);
  };

  useEffect(() => {
    if (gameState === GAME_STATE.NONE) {
      startGame();
    }
  }, [gameState, startGame]);

  const startGame = useCallback(() => {
    resetDropTimer();
    resetField();
    resetNextBlocks();
    setNewBlock(popNextBlock());
    start();
  }, [
    resetDropTimer,
    resetField,
    resetNextBlocks,
    setNewBlock,
    popNextBlock,
    start,
  ]);

  const lock = (block) => {
    const [newField, clearLineCount] = clearLine(
      renderBlock(field, block, true)
    );

    setClearLineCount(clearLineCount);

    setField(newField);
    if (isGameOver(newField)) {
      gameOver();
      return;
    } else if (gameMode === '40LINES' && lines >= 40) {
      finish();
    }

    next();
  };

  const next = () => {
    setNewBlock(popNextBlock());
    resetDropTimer();
  };

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') {
      startGame();
      return;
    }

    if (gameState !== GAME_STATE.PLAYING) return;
    switch (key) {
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
        pause();
        break;
    }
  };

  return {
    startGame,
    field,
    block,
    nextBlocks,
    gameState,
    score,
    lines,
    handleKeyDown,
  };
};
