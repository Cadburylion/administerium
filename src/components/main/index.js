import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from '../header';
import Search from '../search';
import Signin from '../auth/signin';
import Signup from '../auth/signup';
import Signout from '../auth/signout';
import BannedList from '../banned-list';
import BannedSubmitForm from '../banned-submit-form';
import requireAuth from '../require-auth';

import { getAuth } from '../../selectors';

class Main extends Component {
  render() {
    return (
      <main>
        <Header />
        <Route exact path="/" component={Search} />
        <Route path="/signout" component={Signout} />
        <Route path="/banned" component={BannedSubmitForm} />
        <Route path="/banned" component={BannedList} />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(requireAuth(Main));
