import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signin extends Component {
  render() {
    return <div>Signin</div>;
  }
}

export default connect(
  null,
  actions
)(Signin);
