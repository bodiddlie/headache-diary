import React from 'react';
import {Link, Redirect} from 'react-router';

import {auth, db} from './firebase';
import {TextField} from './shared/text-field';

export class Register extends React.Component {
  state = {
    email: '',
    password: '',
    confirm: '',
    displayName: '',
    showErrors: false,
    loggedIn: false
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({showErrors: true});
    if (this.validateForm()) {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        db.ref().child('users').child(user.uid).set({
          email: user.email,
          displayName: this.state.displayName
        });
        user.updateProfile({
          displayName: this.state.displayName
        });
        this.setState({loggedIn: true});
      }).catch(err => {console.error(err)});
    }
  }

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.displayName.length > 0 &&
      this.state.password.length >= 6 &&
      this.state.password === this.state.confirm
    );
  }

  render() {
    const {showErrors, loggedIn} = this.state;
    return (
      <main>
        {loggedIn && (
          <Redirect to="/days" />
        )}
        <div className="login-wrapper">
          <div className="login-box">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <TextField 
                value={this.state.email}
                label="Email"
                errorText="Email is required"
                showError={showErrors && this.state.email.length <= 0}
                onFieldChanged={e => this.setState({email: e.target.value})}
              />
              <TextField 
                value={this.state.displayName}
                label="Display Name"
                errorText="Display Name is required"
                showError={showErrors && this.state.displayName.length <= 0}
                onFieldChanged={e => this.setState({displayName: e.target.value})}
              />
              <TextField 
                value={this.state.password}
                label="Password"
                errorText="Password is required and must be at least 6 characters"
                showError={showErrors && this.state.password.length < 6}
                onFieldChanged={e => this.setState({password: e.target.value})}
                type="password"
              />
              <TextField 
                value={this.state.confirm}
                label="Confirm Password"
                errorText="Passwords must match"
                showError={showErrors && this.state.password !== this.state.confirm}
                onFieldChanged={e => this.setState({confirm: e.target.value})}
                type="password"
              />
              <button type="submit">Register</button>
              or <Link to="/login">Log In</Link>
            </form>
          </div>
        </div>
      </main>
    )
  }
}