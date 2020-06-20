import React from 'react';
import Modal from 'react-modal';

import './global.css';

import Routes from './routes';

Modal.setAppElement('#root');

function App() {
  return (
    <Routes />
  );
}

export default App;
