import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'font-awesome/css/font-awesome.css';
import './global-styles.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}