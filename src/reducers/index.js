import { combineReducers } from 'redux';
import session from './session';
import stream from './stream';

export default combineReducers({
  session,
  stream,
})
