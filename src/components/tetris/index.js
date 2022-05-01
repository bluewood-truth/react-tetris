import React, {useCallback, useEffect, useState} from 'react';

import {Layout} from '../layout';
import {Stage} from '../stage';
import {PanelGroup, Panel, TimePanel} from '../panel';
import {Tetromino} from '../tetromino';
import {Popup} from '../popup';

import {GAME_STATE, useGameState} from 'src/hooks/useGameState';
import {useBlock} from 'src/hooks/useBlock';
import {useField} from 'src/hooks/useField';
import {useFrame} from 'src/hooks/useFrame';
import {useNextBlocks} from 'src/hooks/useNextBlocks';
import {useAutoFocus} from 'src/hooks/useAutoFocus';
import {useAudio} from 'src/hooks/useAudio';
import {DIRECTION, transform, TRANSFORM_STATE} from 'src/core/transform';
import {clearLine, isGameOver, renderBlock} from 'src/core/field';

export const Tetris = ({gameMode}) => {
  const [time, setTime] = useState(0);
  const {
    field,
    block,
    nextBlocks,
    gameState,
    score,
    lines,
    handleKeyDown,
    handleBlur,
  } = useTetris(gameMode);
  const [ref] = useAutoFocus();

  return (
    <>
      <Layout ref={ref} onKeyDown={handleKeyDown} onBlur={handleBlur}>
        <PanelGroup>
          <Panel label='SCORE' value={score} />
          <Panel label='LINES' value={lines} />
          <TimePanel gameState={gameState} setTime={setTime} />
        </PanelGroup>
        <Stage field={field} block={block} />
        <PanelGroup>
          <Panel label='NEXT' align='center'>
            {nextBlocks.current.slice(0, 5).map((next, i) => (
              <Tetromino
                key={i}
                name={next}
                ignoreEmptyLines
                style={{transform: 'scale(0.8)', height: '64px'}}
              />
            ))}
          </Panel>
        </PanelGroup>
      </Layout>
      <Popup gameState={gameState} gameResult={{score, lines, time}} />
    </>
  );
};

const useTetris = (gameMode) => {
  const {field, setField, resetField} = useField();
  const {block, updateBlock, setNewBlock} = useBlock();
  const {nextBlocks, resetNextBlocks, popNextBlock} = useNextBlocks();
  const {
    gameState,
    score,
    lines,
    start,
    pause,
    gameOver,
    reset,
    dropDelay,
    lockDelay,
    setClearLineCount,
  } = useGameState(gameMode);

  const [playBgm, stopBgm] = useAudio('/bgm.mp3', {loop: true, volume: 0.25});
  const [playFinishSound] = useAudio('/se_finish.wav');
  const [playGameOverSound] = useAudio('/se_game_over.wav');
  const [playMoveSound] = useAudio('/se_move.wav');
  const [playRotateSound] = useAudio('/se_rotate.wav');
  const [playLockSound] = useAudio('/se_lock.wav');
  const [playTouchWallSound] = useAudio('/se_touch_wall.wav');
  const [playClearLineSound] = useAudio('/se_clear_line.wav');

  const {resetFrame: resetTimer} = useFrame({
    enabled: gameState === GAME_STATE.PLAYING,
    tick: (currentFrame) => {
      if (currentFrame >= dropDelay) {
        drop();
      }
      if (currentFrame >= lockDelay) {
        lock(block);
      }
    },
  });

  const drop = () => {
    const result = transform.move(block, field, DIRECTION.BOTTOM);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      updateBlock(result.block);
      resetTimer();
    }
  };

  const rotate = () => {
    const result = transform.rotate(block, field);
    if (result.state === TRANSFORM_STATE.SUCCESS) {
      updateBlock(result.block);
      playRotateSound(true);
    } else {
      playTouchWallSound(true);
    }
  };

  const move = (direction) => {
    const result = transform.move(block, field, DIRECTION[direction]);

    if (result.state === TRANSFORM_STATE.SUCCESS) {
      updateBlock(result.block);
      playMoveSound(true);
      if (direction === DIRECTION.BOTTOM) {
        resetTimer();
      }
    } else {
      playTouchWallSound(true);
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

  const lock = (block) => {
    const [newField, clearLineCount] = clearLine(
      renderBlock(field, block, true)
    );

    setClearLineCount(clearLineCount);
    if (clearLineCount > 0) {
      playClearLineSound(true);
    }

    setField(newField);
    if (isGameOver(newField)) {
      gameOver();
      return;
    }

    playLockSound(true);
    next();
  };

  const next = () => {
    setNewBlock(popNextBlock());
    resetTimer();
  };

  const startGame = useCallback(() => {
    resetTimer();
    resetField();
    resetNextBlocks();
    setNewBlock(popNextBlock());
    start();
  }, [
    resetTimer,
    resetField,
    resetNextBlocks,
    setNewBlock,
    popNextBlock,
    start,
  ]);

  useEffect(() => {
    if (gameState === GAME_STATE.NONE) {
      startGame();
    }
  }, [gameState, startGame]);

  useEffect(() => {
    if (gameState === GAME_STATE.PLAYING) {
      playBgm();
    }

    if (gameState === GAME_STATE.GAME_OVER) {
      stopBgm();
      playGameOverSound();
    }

    if (gameState === GAME_STATE.FINISH) {
      stopBgm();
      playFinishSound();
    }
  }, [gameState, playBgm, playFinishSound, playGameOverSound, stopBgm]);

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') {
      reset();
      return;
    }

    if (gameState === GAME_STATE.PLAYING) {
      switch (key) {
        case 'arrowleft':
          move(DIRECTION.LEFT);
          break;
        case 'arrowright':
          move(DIRECTION.RIGHT);
          break;
        case 'arrowdown':
          move(DIRECTION.BOTTOM);
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
    } else if (gameState === GAME_STATE.PAUSE) {
      if (key === 'p') {
        pause();
      }
    }
  };

  const handleBlur = () => {
    if (gameState === GAME_STATE.PLAYING) pause();
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
    handleBlur,
  };
};
