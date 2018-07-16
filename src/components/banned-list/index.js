import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import requireAuth from '../require-auth';
import { getBannedList } from '../../selectors';

import BannedUser from '../banned-user';

class BannedList extends Component {
  componentWillMount() {
    this.props.clearBannedUsersProp();
  }
  componentDidMount() {
    this.props.getBannedUsers();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.bannedList &&
          this.props.bannedList.length > 0 &&
          this.props.bannedList.map(bannedUser => (
            <BannedUser key={bannedUser._id} user={bannedUser} />
          ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bannedList: getBannedList(state)
});

export default connect(
  mapStateToProps,
  actions
)(requireAuth(BannedList));
