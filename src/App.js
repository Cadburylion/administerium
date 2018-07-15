import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Link, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import BannedList from './components/banned-list';

import store from './lib/store-create';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Link to="/banned">Banned List</Link>
            <Route exact path="/signin" component={BannedList} />
            <Route exact path="/banned" component={BannedList} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
