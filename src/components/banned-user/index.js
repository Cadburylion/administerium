import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { getSearchedUsers } from '../../selectors';

class BannedUser extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <li>{user.name}</li>
        <li>{user.bannedBy}</li>
        <li>{user.bannedFor}</li>
        <li>{user.date}</li>
        <li onClick={() => this.props.removeFromBannedList(user._id)}>
          Remove
        </li>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  searchedUsers: getSearchedUsers(state)
});

export default connect(
  mapStateToProps,
  actions
)(BannedUser);
