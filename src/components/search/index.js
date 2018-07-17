import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import BannedUser from '../banned-user';

import './style.css';

class Search extends Component {
  state = {
    searchTerm: ''
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.getBannedUserByName(this.state.searchTerm);
  };
  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };
  render() {
    const { bannedUserByName } = this.props;
    return (
      <div className="search">
        <div className="search-bar-container">
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              placeholder="search by name"
              type="text"
              className="search-bar"
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div className="search-results-container">
          {bannedUserByName &&
            bannedUserByName.length > 0 &&
            bannedUserByName.map(bannedUser => (
              <BannedUser key={bannedUser._id} user={bannedUser} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bannedUserByName: state.bannedUserByName
});

export default connect(
  mapStateToProps,
  actions
)(Search);
