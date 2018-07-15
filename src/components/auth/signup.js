import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signup extends Component {
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

    this.props.signup(formProps);
  };
  render() {
    return (
      <div>
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
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Signup);
