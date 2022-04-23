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
    position: [20, 3],
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
              action(
                ACTION.DROP,
                {
                  success: (block) => {
                    console.log('drop');
                    setBlock(block);
                  },
                  fail: () => {
                    console.log('collision');
                  },
                },
                block,
                field
              );
            }}
          >
            DROP
          </button>
          <button
            onClick={() => {
              action(
                ACTION.ROTATE,
                {
                  success: (block) => {
                    console.log('rotate');
                    setBlock(block);
                  },
                  fail: () => {
                    console.log('collision');
                  },
                },
                block,
                field
              );
            }}
          >
            ROTATE
          </button>
          <button
            onClick={() => {
              action(
                ACTION.MOVE,
                {
                  success: (block) => {
                    console.log('move left');
                    setBlock(block);
                  },
                  fail: () => {
                    console.log('collision');
                  },
                },
                block,
                field,
                DIRECTION.LEFT
              );
            }}
          >
            MOVE LEFT
          </button>
          <button
            onClick={() => {
              action(
                ACTION.MOVE,
                {
                  success: (block) => {
                    console.log('move right');
                    setBlock(block);
                  },
                  fail: () => {
                    console.log('collision');
                  },
                },
                block,
                field,
                DIRECTION.RIGHT
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
