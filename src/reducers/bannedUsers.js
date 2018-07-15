import {
  GET_BANNED_USERS_START,
  GET_BANNED_USERS_SUCCESS,
  GET_BANNED_USERS_FAILURE
} from '../actions/types';

let INITIAL_STATE = {
  list: [],
  loading: false,
  error: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_BANNED_USERS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_BANNED_USERS_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
        error: null
      };
    case GET_BANNED_USERS_FAILURE:
      return {
        list: [],
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
