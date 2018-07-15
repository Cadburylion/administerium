import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

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

  handleSubmit = form => event => {
    event.preventDefault();

    const formProps = {
      name: form.name,
      bannedBy: form.bannedBy,
      bannedFor: form.bannedFor,
      date: form.date
    };

    this.props.addBannedUser(formProps);
  };

  render() {
    return (
      <div className="banned-submit-form">
        <form onSubmit={this.handleSubmit(this.state)} autoComplete="off">
          <input
            id="name"
            label="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange('name')}
            autoComplete="current-password"
          />
          <input
            id="banned-by"
            label="banned-by"
            type="text"
            value={this.state.bannedBy}
            onChange={this.handleChange('bannedBy')}
            autoComplete="current-password"
          />
          <input
            id="banned-for"
            label="banned-for"
            type="text"
            value={this.state.bannedFor}
            onChange={this.handleChange('bannedFor')}
            autoComplete="current-password"
          />
          <input
            id="date"
            label="date"
            type="text"
            balue={this.state.date}
            onChange={this.handleChange('date')}
            autoComplete="current-password"
          />
          <button onClick={e => this.handleSubmit(e, this.state)}>
            Add to banned list
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(BannedSubmitForm);
