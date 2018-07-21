import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import View from './view';

import './style.css';

class BannedSubmitForm extends Component {
  state = {
    name: '',
    bannedBy: '',
    bannedFor: '',
    date: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const formProps = {
      name: this.state.name,
      bannedBy: this.state.bannedBy,
      bannedFor: this.state.bannedFor,
      date: this.state.date
    };

    this.props.addBannedUser(formProps);
    this.setState({
      name: '',
      bannedBy: '',
      bannedFor: '',
      date: ''
    });
  };

  render() {
    return (
      <View
        name={this.state.name}
        date={this.state.date}
        bannedBy={this.state.bannedBy}
        bannedFor={this.state.bannedFor}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(
  null,
  actions
)(BannedSubmitForm);
