import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../../selectors';

import View from './view';

import * as actions from '../../actions';

class Header extends Component {
  render() {
    return <View auth={this.props.auth} />;
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(
  mapStateToProps,
  actions
)(Header);
