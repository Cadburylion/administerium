import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import './style.css';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 450
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '60%',
    flexShrink: 0,
    textAlign: 'left'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class BannedUser extends Component {
  handleRemoveUser = id => {
    this.props.removeFromBannedList(id);
  };

  render() {
    const { user, classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{user.name}</Typography>
          <Typography className={classes.secondaryHeading}>
            {user.date}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          <div className="removed-for-description">
            <div className="banned-for-heading">
              <p style={{ fontSize: 14 }}>Banned by: {user.bannedBy}</p>
            </div>
            <div className="banned-for-heading">
              <p style={{ fontSize: 14 }}>Reason:</p>
            </div>
            <p>{user.bannedFor}</p>
          </div>

          <div
            className="remove-user-button-container"
            onClick={() => this.handleRemoveUser(user._id)}
          >
            <Button size="small" color="secondary" variant="contained">
              remove
            </Button>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

BannedUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(BannedUser);
