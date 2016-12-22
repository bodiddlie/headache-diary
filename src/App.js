import React, { Component } from 'react';
import {BrowserRouter, Match, Redirect} from 'react-router';

import {isAuthenticated} from './firebase';

import {Home} from './home';
import {DayForm} from './day-form';
import {Dashboard} from './dashboard';
import {Login} from './login';
import {Register} from './register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/register" component={Register}/>
          <Match pattern="/dashboard" component={Dashboard} />
          <MatchWhenAuthorized pattern="/days" component={DayForm} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

const MatchWhenAuthorized = ({component: Component, ...rest}) => (
  <Match {...rest} render={renderProps => (
    isAuthenticated() ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: renderProps.location}
      }} />
    )
  )}/>
)

MatchWhenAuthorized.propTypes = {
  component: React.PropTypes.any
}