import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getAuth } from '../../selectors';

class RedirectComp extends Component {
  render() {
    const { auth } = this.props;
    return (
      <React.Fragment>
        {auth && <Redirect to="/app" />}
        {!auth && <Redirect to="/signup" />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(RedirectComp);
