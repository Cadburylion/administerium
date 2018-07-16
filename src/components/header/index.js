import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuth } from '../../selectors';

import * as actions from '../../actions';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">Welcome</Link>
        {!this.props.auth && <Link to="/signin">Sign In</Link>}
        {!this.props.auth && <Link to="/signup">Sign Up</Link>}
        {this.props.auth && <Link to="/signout">Sign Out</Link>}
        {this.props.auth && <Link to="/banned">Banned List</Link>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(
  mapStateToProps,
  actions
)(Header);
