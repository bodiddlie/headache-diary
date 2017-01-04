import React from 'react';
import {Link, Redirect} from 'react-router';
import {StyleSheet, css} from 'aphrodite';

import {auth, db} from './firebase';
import {TextField} from './shared/text-field';

let styles;

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
        <div className={css(styles.wrapper)}>
          <div className={css(styles.box)}>
            <form className={css(styles.form)} onSubmit={this.handleSubmit}>
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
              <button className={css(styles.button, styles.hover)} type="submit">Register</button>
              or <Link to="/login">Log In</Link>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh'
  },
  box: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    padding: '20px',
    backgroundColor: '#efefef',
    borderRadius: '5px',
    maxWidth: '800px',
    minWidth: '500px'
  },
  button: {
    color: '#efefef',
    display: 'inline-block',
    backgroundColor: '#0000ff',
    border: 'none',
    padding: '10px 15px',
    margin: '0 5px',
    borderRadius: '30px',
    cursor: 'pointer'
  },
  hover: {
    ':hover': {
      background: '#3333ff'
    }
  }
});