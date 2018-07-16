import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from '../header';
import Search from '../search';
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
        <Route exact path="/app" component={Search} />
        <Route exact path="/app/youarebanned" component={BannedSubmitForm} />
        <Route exact path="/app/signout" component={Signout} />
        <Route exact path="/app/banned" component={BannedList} />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(requireAuth(Main));
