import React from 'react';
import PropTypes from 'prop-types';

import MyButton from '../my-button';

import Modal from '@material-ui/core/Modal';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import './style.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${left}%)`,
    maxHeight: '85vh',
    overflowX: 'auto'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { title, classes, buttonTitle, children } = this.props;

    return (
      <div>
        <div onClick={this.handleOpen}>
          <MyButton small primary>
            {buttonTitle}
          </MyButton>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              variant="title"
              className={`${classes.title} modal-title`}
            >
              {title}
              <IconButton
                color="inherit"
                aria-label="Menu"
                className={classes.menuButton}
                onClick={this.handleClose}
              >
                <Clear />
              </IconButton>
            </Typography>
            {children}
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleModal);
