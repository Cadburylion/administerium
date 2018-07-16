import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './App.js';
import Main from './components/main';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import RedirectComp from './components/redirect-comp';

import store from './lib/store-create';
import registerServiceWorker from './registerServiceWorker';

import './style/main.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/app" component={Main} />
        <Route exact path="/" component={RedirectComp} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
