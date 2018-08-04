import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import moment from 'moment';

import View from './view';

import './style.css';

let momentDate = moment();

class BannedSubmitForm extends Component {
  state = {
    name: '',
    bannedBy: '',
    bannedFor: '',
    date: momentDate
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      date: moment(date)
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
      date: momentDate
    });
  };

  render() {
    return (
      <View
        name={this.state.name}
        date={moment(this.state.date)}
        bannedBy={this.state.bannedBy}
        bannedFor={this.state.bannedFor}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleDateChange={this.handleDateChange}
      />
    );
  }
}

export default connect(
  null,
  actions
)(BannedSubmitForm);
