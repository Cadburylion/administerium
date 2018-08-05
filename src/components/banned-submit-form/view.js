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
                rows="4"
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
            </form>
            <div className="banned-submit-form-buttons">
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
                  size="small"
                  raised="true"
                  variant="contained"
                  component="span"
                >
                  Upload Images
                </Button>
              </label>
              <Button
                size="small"
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
