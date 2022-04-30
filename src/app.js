import React, {useState} from 'react';
import {Tetris} from './components/tetris';
import {Title} from './components/title';

export const App = () => {
  const [gameMode, setGameMode] = useState(null);
  return gameMode === null ? (
    <Title setGameMode={setGameMode} />
  ) : (
    <Tetris gameMode={gameMode} />
  );
};
