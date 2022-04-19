import React from 'react';
import {Layout} from './components/layout';
import {Panel, PanelGroup} from './components/panel';
import {Playfield} from './components/playfield';

export const App = () => {
  return (
    <Layout>
      <Playfield />
      <PanelGroup>
        <Panel label='SCORE' value='0' />
        <Panel label='LINES' value='0' />
        <Panel label='LEVEL' value='0' />
      </PanelGroup>
    </Layout>
  );
};
