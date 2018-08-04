import moment from 'moment';

export const getBannedList = state => state.bannedUsers.list;
export const getAuth = state => state.auth.authenticated;
export const getSearchedUsers = state => state.bannedUserByName;
export const getBannedListAscByDate = state =>
  state.bannedUsers.list
    .slice()
    .sort((a, b) => moment(a.date).diff(moment(b.date)));

export const getBannedListDescByDate = state =>
  state.bannedUsers.list
    .slice()
    .sort((a, b) => moment(b.date).diff(moment(a.date)));
