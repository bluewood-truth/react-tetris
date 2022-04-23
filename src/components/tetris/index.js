import React, {useState} from 'react';
import {ACTION, action, DIRECTION} from 'src/core/action';
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
        <Panel label='SHAPE TEST'>
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
        <Panel label='ACTION TEST'>
          <button
            onClick={() => {
              setBlock((prev) =>
                action(
                  ACTION.DROP,
                  () => {
                    console.log('drop');
                  },
                  prev,
                  field
                )
              );
            }}
          >
            DROP
          </button>
          <button
            onClick={() => {
              setBlock((prev) =>
                action(
                  ACTION.ROTATE,
                  () => {
                    console.log('rotate');
                  },
                  prev,
                  field
                )
              );
            }}
          >
            ROTATE
          </button>
          <button
            onClick={() => {
              setBlock((prev) =>
                action(
                  ACTION.MOVE,
                  () => {
                    console.log('move left');
                  },
                  prev,
                  field,
                  DIRECTION.LEFT
                )
              );
            }}
          >
            MOVE LEFT
          </button>
          <button
            onClick={() => {
              setBlock((prev) =>
                action(
                  ACTION.MOVE,
                  () => {
                    console.log('move right');
                  },
                  prev,
                  field,
                  DIRECTION.RIGHT
                )
              );
            }}
          >
            MOVE RIGHT
          </button>
        </Panel>
      </PanelGroup>
    </Layout>
  );
};
