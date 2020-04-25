import { combineReducers } from 'redux';
import session from './session';
import stream from './stream';
import users from './users';
import app from './app';

export default combineReducers({
  session,
  stream,
  users,
  app,
})
