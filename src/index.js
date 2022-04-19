import ReactDOM from 'react-dom/client';
import React from 'react';
import {App} from './app.js';
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
