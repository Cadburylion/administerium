import reducers from '../reducers';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import { createStore, applyMiddleware } from 'redux';

export default createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(thunk, reporter)
);
