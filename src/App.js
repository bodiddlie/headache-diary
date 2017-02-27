import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import {isAuthenticated} from './firebase';

import {Home} from './home';
import {DayForm} from './day-form';
import {Login} from './login';
import {Register} from './register';
import {ChartPage} from './print-chart';
import {auth, storageKey} from './firebase';

class App extends Component {
  state = {
    uid: null,
    user: null
  };

  static childContextTypes = {
    uid: React.PropTypes.string
  }

  getChildContext() {
    return {uid: this.state.uid};
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: user.uid, user});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({uid: null, user: null});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register}/>
            <MatchWhenAuthorized path="/days" component={DayForm} />
            <MatchWhenAuthorized path="/chart/:month" component={ChartPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

const MatchWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
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