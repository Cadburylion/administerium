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
    image: null,
    images: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  handleFileSelect = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleFilesUpload = event => {
    this.setState({
      images: event.target.files
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const formProps = {
      name: this.state.name,
      bannedBy: this.state.bannedBy,
      bannedFor: this.state.bannedFor,
      date: this.state.date,
      image: this.state.image,
      images: this.state.images
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
        date={this.state.date}
        bannedBy={this.state.bannedBy}
        bannedFor={this.state.bannedFor}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleFileSelect={this.handleFileSelect}
        handleDateChange={this.handleDateChange}
        handleFilesUpload={this.handleFilesUpload}
      />
    );
  }
}

export default connect(
  null,
  actions
)(BannedSubmitForm);
