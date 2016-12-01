import React, { Component } from 'react';
import {BrowserRouter, Match} from 'react-router';

import {Home} from './home';
//import {DayForm} from './day-form';
import {FormPage} from './form-page';
import {Dashboard} from './dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/day/:id" component={FormPage} />
          <Match pattern="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
