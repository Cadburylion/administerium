import {
  GET_BANNED_USER_BY_NAME,
  GET_BANNED_USER_BY_NAME_ERROR
} from '../actions/types';

let INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BANNED_USER_BY_NAME:
      console.log('action.payload', action.payload);
      return action.payload;
    case GET_BANNED_USER_BY_NAME_ERROR:
      return action.payload;
    default:
      return state;
  }
};
