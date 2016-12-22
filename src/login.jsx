import React from 'react';
import {Link, Redirect} from 'react-router';

import {auth} from './firebase';

export class Login extends React.Component {
  static propTypes = {
    location: React.PropTypes.object
  };

  state = {
    email: '',
    password: '',
    redirectToReferrer: false
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({redirectToReferrer: true});
    }).catch(err => {console.error(err)});
  }

  render() {
    const {from} = this.props.location.state || '/';
    const {redirectToReferrer} = this.state;

    return (
      <main>
        {redirectToReferrer && (
          <Redirect to={from || '/days'}/>
        )}
        {from && (
          <p>You must log in to view the page at <code>{from.pathname}</code></p>
        )}
        <div className="login-wrapper">
          <div className="login-box">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input type="text" placeholder="Email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
              </div>
              <button type="submit">Sign In</button>
              or <Link to="/register">Create Account</Link>
            </form>
          </div>
        </div>
      </main>
    );
  }
}