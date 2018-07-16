import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getAuth } from '../../selectors';

import * as actions from '../../actions';

class Signin extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = (e, form) => {
    e.preventDefault();

    const formProps = {
      email: form.email,
      password: form.password
    };

    this.props.signin(formProps);
  };
  render() {
    return (
      <React.Fragment>
        {this.props.auth ? (
          <Redirect to="/" />
        ) : (
          <div className="signin">
            <form
              onSubmit={e => this.handleSubmit(e, this.state)}
              autoComplete="off"
            >
              <input
                id="email"
                label="Email"
                type="text"
                autoComplete="current-password"
                onChange={this.handleChange('email')}
              />
              <input
                id="password-input"
                label="Email"
                type="password"
                autoComplete="current-password"
                onChange={this.handleChange('password')}
              />
              <button onClick={e => this.handleSubmit(e, this.state)}>
                Sign in
              </button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(
  mapStateToProps,
  actions
)(Signin);
