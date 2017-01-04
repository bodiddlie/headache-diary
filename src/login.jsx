import React from 'react';
import {Link, Redirect} from 'react-router';
import {StyleSheet, css} from 'aphrodite';

import {auth} from './firebase';
import {TextField} from './shared/text-field';

let styles;

export class Login extends React.Component {
  static propTypes = {
    location: React.PropTypes.object
  };

  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
    showErrors: false
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({showErrors: true});
    if (this.validateForm()) {
      auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        this.setState({redirectToReferrer: true});
      }).catch(err => {console.error(err)});
    }
  }

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  render() {
    const {from} = this.props.location.state || '/';
    const {redirectToReferrer, showErrors} = this.state;

    return (
      <main>
        {redirectToReferrer && (
          <Redirect to={from || '/days'}/>
        )}
        {from && (
          <p>You must log in to view the page at <code>{from.pathname}</code></p>
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
                value={this.state.password}
                label="Password"
                errorText="Password is required"
                showError={showErrors && this.state.password.length <= 0}
                onFieldChanged={e => this.setState({password: e.target.value})}
                type="password"
              />
              <button className={css(styles.button, styles.hover)} type="submit">Sign In</button>
              or <Link to="/register">Create Account</Link>
            </form>
          </div>
        </div>
      </main>
    );
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