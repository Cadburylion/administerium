import axios from 'axios';

import { toast } from 'react-toastify';

import * as config from '../lib/config';
import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_BANNED_USER_START,
  ADD_BANNED_USER_SUCCESS,
  ADD_BANNED_USER_FAILURE,
  CLEAR_BANNED_USERS,
  GET_BANNED_USERS_START,
  GET_BANNED_USERS_SUCCESS,
  GET_BANNED_USERS_FAILURE,
  GET_BANNED_USER_BY_NAME,
  GET_BANNED_USER_BY_NAME_ERROR,
  REMOVE_FROM_BANNED_LIST_START,
  REMOVE_FROM_BANNED_LIST_SUCCESS,
  REMOVE_FROM_BANNED_LIST_FAILURE
} from './types';

// Actions

const addBannedUserStart = () => ({
  type: ADD_BANNED_USER_START
});

const addBannedUserSuccess = res => ({
  type: ADD_BANNED_USER_SUCCESS,
  payload: res
});

const addBannedUserFailure = error => ({
  type: ADD_BANNED_USER_FAILURE,
  payload: error
});

const clearBannedUsers = () => ({
  type: CLEAR_BANNED_USERS
});
const getBannedUsersStart = () => ({
  type: GET_BANNED_USERS_START
});
const getBannedUsersSuccess = bannedUsers => ({
  type: GET_BANNED_USERS_SUCCESS,
  payload: bannedUsers
});
const getBannedUsersFailure = error => ({
  type: GET_BANNED_USERS_FAILURE,
  payload: error
});

const removeFromBannedListStart = () => ({
  type: REMOVE_FROM_BANNED_LIST_START
});
const removeFromBannedListSuccess = res => ({
  type: REMOVE_FROM_BANNED_LIST_SUCCESS,
  payload: res
});
const removeFromBannedListFailure = error => ({
  type: REMOVE_FROM_BANNED_LIST_FAILURE,
  payload: error
});

// API Actions
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${config.baseURL()}/signup`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);

    // callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${config.baseURL()}/signin`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);

    // callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const addBannedUser = (formProps, callback) => async dispatch => {
  let toastId = null;
  let toastNotify = () =>
    (toastId = toast('Adding member to banned list...', { autoClose: false }));

  toastNotify();
  let fd = new FormData();
  fd.append('name', formProps.name);
  fd.append('bannedBy', formProps.bannedBy);
  fd.append('bannedFor', formProps.bannedFor);
  fd.append('date', formProps.date);
  if (formProps.images && formProps.images.length > 0) {
    for (let i = 0; i < formProps.images.length; i++) {
      fd.append('images', formProps.images[i], formProps.images[i].name);
    }
  }

  dispatch(addBannedUserStart());
  try {
    const response = await axios.post(`${config.baseURL()}/bannedUsers`, fd);

    dispatch(addBannedUserSuccess(response.data));

    dispatch(getBannedUsers());
    if (callback) {
      callback(toastId);
    }
  } catch (error) {
    dispatch(addBannedUserFailure(error));
  }
};

export const getBannedUserByName = name => async dispatch => {
  try {
    const response = await axios.get(`${config.baseURL()}/bannedUser/${name}`);
    dispatch({ type: GET_BANNED_USER_BY_NAME, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_BANNED_USER_BY_NAME_ERROR, payload: e });
  }
};

export const getBannedUsers = () => async dispatch => {
  dispatch(getBannedUsersStart());
  try {
    const response = await axios.get(`${config.baseURL()}/bannedUsers`);
    dispatch(getBannedUsersSuccess(response.data));
  } catch (error) {
    dispatch(getBannedUsersFailure(error));
  }
};

export const clearBannedUsersProp = () => async dispatch => {
  dispatch(clearBannedUsers());
};

export const removeFromBannedList = id => async dispatch => {
  let toastId = null;
  let toastNotify = () =>
    (toastId = toast('Removing member from banned list...', {
      autoClose: false
    }));

  toastNotify();
  dispatch(removeFromBannedListStart());
  try {
    const response = await axios.delete(
      `${config.baseURL()}/bannedUsers/${id}`
    );
    dispatch(removeFromBannedListSuccess(response.status));
    toast.update(toastId, {
      render: 'Member removed from banned list',
      type: toast.TYPE.INFO,
      autoClose: 3000
    });
    dispatch(getBannedUsers());
  } catch (error) {
    dispatch(removeFromBannedListFailure(error));
  }
};
