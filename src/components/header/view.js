// import React from 'react';
// import { Link } from 'react-router-dom';
//
// import './style.css';
//
// export default ({ auth }) => {
//   return (
//     <div className="header">
//       <div className="header-content">
//         <Link to="/">Welcome</Link>
//         {!auth && (
//           <div>
//             <Link to="/signin">Sign In</Link>
//             <Link to="/signup">Sign Up</Link>
//           </div>
//         )}
//         {auth && (
//           <div>
// <Link to="/banned">Banned List</Link>
// <Link to="/signout">Sign Out</Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Drawer from '../drawer';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1
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
        <Toolbar>
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
