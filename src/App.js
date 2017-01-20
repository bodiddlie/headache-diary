import React, { Component } from 'react';
import {BrowserRouter, Match, Redirect} from 'react-router';

import {isAuthenticated} from './firebase';

import {Home} from './home';
import {Header} from './header';
import {DayForm} from './day-form';
import {Login} from './login';
import {Register} from './register';
import {auth, storageKey} from './firebase';


class App extends Component {
  state = {
    uid: null
  };

  static childContextTypes = {
    uid: React.PropTypes.string
  }

  getChildContext() {
    return {uid: this.state.uid};
  }

  componentDidMount() {
    console.log('mounted -', new Date().toLocaleString());
    this.unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({uid: null});
      }
    });
  }

  componentWillUnmount() {
    console.log('unmounted -', new Date().toLocaleString());
    this.unsubscribe();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/register" component={Register}/>
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