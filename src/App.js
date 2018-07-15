import React from 'react';

import Header from './components/header';

import './App.css';

export default ({ children }) => {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
};
