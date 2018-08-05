import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './style.css';

const styles = theme => ({
  textField: {
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class View extends React.Component {
  render() {
    const {
      classes,
      name,
      date,
      bannedBy,
      bannedFor,
      handleChange,
      handleSubmit,
      handleFileSelect,
      handleDateChange,
      handleFilesUpload
    } = this.props;

    return (
      <div className="banned-submit-form">
        <div className="banned-submit-form-content">
          <div className="banned-submit-form-form">
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextField
                required
                id="name"
                label="Name"
                type="text"
                className={classNames(classes.textField)}
                value={name}
                onChange={handleChange('name')}
                autoComplete="current-password"
                margin="normal"
              />
              <TextField
                required
                id="banned-by"
                label="Banned by"
                type="text"
                className={classNames(classes.textField)}
                value={bannedBy}
                onChange={handleChange('bannedBy')}
                autoComplete="current-password"
                margin="normal"
              />
              <TextField
                id="banned-for"
                label="Banned for"
                type="text"
                required
                multiline
                rowsMax="6"
                className={classNames(classes.textField)}
                value={bannedFor}
                onChange={handleChange('bannedFor')}
                autoComplete="current-password"
                margin="normal"
              />
              <div className="grid-align-left">
                <div className="date-input-container" tabIndex="0">
                  <label htmlFor="date">Date</label>
                  <DatePicker
                    id="date"
                    selected={date}
                    onChange={handleDateChange}
                    value={moment(date).format('MMMM Do YYYY')}
                  />
                  <hr />
                </div>
              </div>
              <input
                accept="image/*"
                className={classes.input}
                id="raised-button-file"
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="raised-button-file">
                <Button
                  raised="true"
                  component="span"
                  className={classes.button}
                >
                  Upload Image
                </Button>
              </label>
              <input
                accept="image/*"
                className={classes.input}
                id="raised-button-files"
                type="file"
                multiple
                onChange={handleFilesUpload}
              />
              <label htmlFor="raised-button-files">
                <Button
                  raised="true"
                  component="span"
                  className={classes.button}
                >
                  Upload Images
                </Button>
              </label>
            </form>
            <div className="banned-submit-form-button">
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Add to banned list
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(View);
