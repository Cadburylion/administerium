import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '../drawer';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './style.css';

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    flexGrow: 1,
    zIndex: 10
  },
  title: {
    flexGrow: 1,
    marginLeft: -48
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="header-title">
          <Drawer />
          <Typography variant="title" color="inherit" className={classes.title}>
            Administerium
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
