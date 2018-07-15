import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import requireAuth from '../require-auth';
import { getBannedList } from '../../selectors';
// import BannedUser from '../banned-user';

class BannedList extends Component {
  componentDidMount() {
    this.props.getBannedUsers();
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.props.addBannedUser}>Add banned user</button>
        {this.props.bannedList
          ? this.props.bannedList.map(bannedUser => (
              <div key={bannedUser._id}>{bannedUser.name}</div>
            ))
          : null}
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

// <BannedUser bannedUser={bannedUser} key={bannedUser._id} />
