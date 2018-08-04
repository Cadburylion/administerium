import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import requireAuth from '../require-auth';
import {
  getBannedList,
  getBannedListAscByDate,
  getBannedListDescByDate
} from '../../selectors';

import BannedUser from '../banned-user';

import './style.css';

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
        <div className="banned-list">
          {this.props.bannedListDesc &&
            this.props.bannedListDesc.length > 0 &&
            this.props.bannedListDesc.map(bannedUser => (
              <BannedUser key={bannedUser._id} user={bannedUser} />
            ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bannedList: getBannedList(state),
  bannedListAsc: getBannedListAscByDate(state),
  bannedListDesc: getBannedListDescByDate(state)
});

export default connect(
  mapStateToProps,
  actions
)(requireAuth(BannedList));
