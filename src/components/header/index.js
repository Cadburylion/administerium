import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">Welcome</Link>
        <Link to="/signin">Signin</Link>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Header);
