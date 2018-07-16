import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';
import { getAuth } from '../../selectors';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import List from '@material-ui/icons/List';
import Search from '@material-ui/icons/Search';
import Send from '@material-ui/icons/Send';

import './style.css';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  },
  list: {
    width: 250
  },
  itemContainer: {
    display: 'flex',
    textAlign: 'left',
    padding: '12px 24px',
    justifyContent: 'flex-start',
    minWidth: 0
  },
  item: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 400
  }
});

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { auth, classes } = this.props;

    const sideList = (
      <div className="side-list">
        <Link to="/app/banned" className="side-list-item-container">
          <List className={'side-list-item-icon'} />
          <div className="side-list-item">Display list</div>
        </Link>
        <Link to="/app/youarebanned" className="side-list-item-container">
          <Send className={'side-list-item-icon'} />
          <div className="side-list-item">Submit new entry</div>
        </Link>
        <Link to="/app" className="side-list-item-container">
          <Search className={'side-list-item-icon'} />
          <div className="side-list-item">Search by name</div>
        </Link>
        <Divider />
        {auth && (
          <div
            className="side-list-item-container"
            onClick={this.props.signout}
          >
            <PowerSettingsNew className={'side-list-item-icon'} />
            <div className="side-list-item">
              <div>Signout</div>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  withStyles(styles)
)(TemporaryDrawer);
