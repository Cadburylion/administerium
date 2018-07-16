import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as actions from '../../actions';
import { getAuth } from '../../selectors';

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
      <React.Fragment>
        {this.props.auth ? (
          <Redirect to="/app" />
        ) : (
          <div className="signup">
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
            <div>
              Already have an account? <Link to="/signin">Sign in!</Link>
            </div>
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
)(Signup);
