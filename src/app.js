import React, {useState} from 'react';
import {Title} from './components/title';
import {Tetris} from './components/tetris';

export const App = () => {
  const [gameMode, setGameMode] = useState(null);
  return gameMode === null ? (
    <Title setGameMode={setGameMode} />
  ) : (
    <Tetris gameMode={gameMode} />
  );
};
