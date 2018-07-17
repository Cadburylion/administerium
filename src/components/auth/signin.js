import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as actions from '../../actions';
import { getAuth } from '../../selectors';

import isEmail from 'validator/lib/isEmail';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import './signup.css';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '100%'
  }
});

class Signin extends Component {
  state = {
    email: '',
    password: '',
    validEmail: true
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    if (event.target.value.length === 0) {
      this.setState({
        validEmail: true
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const formProps = {
      email: this.state.email,
      password: this.state.password
    };

    if (isEmail(formProps.email)) {
      this.setState({
        validEmail: true
      });
      this.props.signin(formProps);
    } else {
      this.setState({
        validEmail: false
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.props.auth ? (
          <Redirect to="/app" />
        ) : (
          <div className="signup">
            <div className="signup-content">
              <div className="signup-banner">
                <h1>Administerium</h1>
              </div>
              <div className="signup-body">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <TextField
                    error={!this.state.validEmail}
                    id={`${!this.state.validEmail ? 'error' : 'email'}`}
                    label={`${
                      !this.state.validEmail ? 'Invalid Email' : 'Email'
                    }`}
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('email')}
                    margin="normal"
                  />
                  <TextField
                    id="password-input"
                    label="Password"
                    className={classes.textField}
                    value={this.state.password}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange('password')}
                    margin="normal"
                  />
                  <div className="signup-button-container">
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Sign in
                    </Button>
                  </div>
                </form>
              </div>
              <div className="switch-validation-message">
                New to the Administerium? <Link to="/signup">Sign up!</Link>
              </div>
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

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  withStyles(styles)
)(Signin);
