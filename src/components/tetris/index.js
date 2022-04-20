import React, {useState} from 'react';
import {createPlayfield, renderBlock} from 'src/core/render';
import {tetrominos} from 'src/core/tetrominos';
import {Layout} from '../layout';
import {PanelGroup, Panel} from '../panel';
import {Playfield} from '../playfield';

export const Tetris = () => {
  const [field] = useState(createPlayfield());
  const [block, setBlock] = useState({
    ...tetrominos['I'],
    rotate: 0,
    position: [13, 3],
  });

  return (
    <Layout>
      <Playfield field={renderBlock(field, block)} />
      <PanelGroup>
        <Panel label='TEST'>
          {['I', 'O', 'J', 'L', 'Z', 'S', 'T'].map((v) => {
            return (
              <button
                key={v}
                onClick={() => {
                  setBlock((prev) => ({
                    ...prev,
                    ...tetrominos[v],
                  }));
                }}
              >
                {v}
              </button>
            );
          })}
        </Panel>
      </PanelGroup>
    </Layout>
  );
};
