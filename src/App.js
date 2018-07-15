import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import BannedList from './components/banned-list';
import BannedSubmitForm from './components/banned-submit-form';

import store from './lib/store-create';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signedout" component={Signout} />
            <Route exact path="/banned" component={BannedSubmitForm} />
            <Route exact path="/banned" component={BannedList} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
