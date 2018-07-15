import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './App.js';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import BannedList from './components/banned-list';
import BannedSubmitForm from './components/banned-submit-form';

import store from './lib/store-create';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" compoonent={Signin} />
        <Route path="/signout" compoonent={Signout} />
        <Route path="/banned" component={BannedSubmitForm} />
        <Route path="/banned" compoonent={BannedList} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
