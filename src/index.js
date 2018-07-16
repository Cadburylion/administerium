import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './App.js';
import Main from './components/main';
import Search from './components/search';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import BannedList from './components/banned-list';
import BannedSubmitForm from './components/banned-submit-form';

import store from './lib/store-create';
import registerServiceWorker from './registerServiceWorker';

import './style/main.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Signin} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
