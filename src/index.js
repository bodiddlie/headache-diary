import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global-styles.css';
import 'react-dates/lib/css/_datepicker.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}