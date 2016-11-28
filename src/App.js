import React, { Component } from 'react';
import {BrowserRouter, Match} from 'react-router';

import {Home} from './home';
import {DayForm} from './day-form';
import {Dashboard} from './dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/day/:id" component={DayForm} />
          <Match pattern="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
