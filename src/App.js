import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';

export default ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">{children}</div>
    </React.Fragment>
  );
};
