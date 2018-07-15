import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import bannedUsers from './bannedUsers';
import bannedUserByName from './bannedUserByName';

export default combineReducers({
  auth,
  bannedUsers,
  bannedUserByName
  // form: formReducer
});
