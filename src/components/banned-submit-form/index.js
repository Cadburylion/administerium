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
    date: momentDate,
    image: null
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

  handleFileSelect = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const formProps = {
      name: this.state.name,
      bannedBy: this.state.bannedBy,
      bannedFor: this.state.bannedFor,
      date: this.state.date,
      image: this.state.image
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
    console.log('banned submit form state: ', this.state);
    return (
      <View
        name={this.state.name}
        date={moment(this.state.date)}
        bannedBy={this.state.bannedBy}
        bannedFor={this.state.bannedFor}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleFileSelect={this.handleFileSelect}
        handleDateChange={this.handleDateChange}
      />
    );
  }
}

export default connect(
  null,
  actions
)(BannedSubmitForm);
