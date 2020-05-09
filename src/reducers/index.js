import { combineReducers } from 'redux';
import messages from './messages';
import session from './session';
import stream from './stream';
import users from './users';
import app from './app';

export default combineReducers({
  messages,
  session,
  stream,
  users,
  app,
})
