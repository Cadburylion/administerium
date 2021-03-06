import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';

import Modal from '../common/modal';
import MyButton from '../common/my-button';

import Gallery from 'react-grid-gallery';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './style.css';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 450
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
    textAlign: 'left',
    whiteSpace: 'nowrap'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap'
  }
});

class BannedUser extends Component {
  handleRemoveUser = (id, images) => {
    this.props.removeFromBannedList(id, images);
  };

  render() {
    const { user, classes } = this.props;
    let images;
    if (user.images && user.images.length > 0) {
      images = user.images.map(image => {
        return {
          src: image,
          thumbnail: image
        };
      });
    }
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{user.name}</Typography>
          <Typography className={classes.secondaryHeading}>
            {moment(user.date).format('MMMM Do YYYY')}
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

          <div className="banned-user-footer">
            {user.images &&
              user.images.length > 0 && (
                <Modal title="Screenshots" buttonTitle="Screenshots">
                  {user.images &&
                    user.images.length > 0 && <Gallery images={images} />}
                </Modal>
              )}

            <div onClick={() => this.handleRemoveUser(user._id, user.images)}>
              <MyButton small secondary>
                Remove
              </MyButton>
            </div>
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
