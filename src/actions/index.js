import axios from 'axios';

import { toast } from 'react-toastify';

import * as config from '../lib/config';
import {
  AUTH_USER,
  AUTH_ERROR,
  ADD_BANNED_USER,
  GET_BANNED_USERS_START,
  GET_BANNED_USERS_SUCCESS,
  GET_BANNED_USERS_FAILURE,
  REMOVE_FROM_BANNED_LIST,
  GET_BANNED_USER_BY_NAME,
  GET_BANNED_USER_BY_NAME_ERROR,
  REMOVE_FROM_BANNED_LIST_ERROR
} from './types';

// Actions
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
  console.log('signin: ', formProps);
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
  let user = {
    name: 'Test User',
    bannedBy: 'Matthew',
    bannedFor: 'Bein rowdy',
    date: 'December'
  };
  let toastNotify = () =>
    (toastId = toast('Adding member to banned list...', { autoClose: false }));

  toastNotify();

  try {
    const response = await axios.post(`${config.baseURL()}/bannedUsers`, user);

    dispatch({ type: ADD_BANNED_USER, payload: response.data });

    dispatch(getBannedUsers());
    callback(toastId);
  } catch (e) {
    dispatch({ type: ADD_BANNED_USER, payload: 'Invalid submission' });
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

export const removeFromBannedList = id => async dispatch => {
  let toastId = null;
  let toastNotify = () =>
    (toastId = toast('Removing member from banned list...', {
      autoClose: false
    }));

  toastNotify();

  try {
    const response = await axios.delete(
      `${config.baseURL()}/bannedUsers/${id}`
    );
    dispatch({ type: REMOVE_FROM_BANNED_LIST, payload: response.status });
    toast.update(toastId, {
      render: 'Member removed from banned list',
      type: toast.TYPE.INFO,
      autoClose: 3000
    });
    dispatch(getBannedUsers());
  } catch (e) {
    dispatch({ type: REMOVE_FROM_BANNED_LIST_ERROR, payload: e });
  }
};
