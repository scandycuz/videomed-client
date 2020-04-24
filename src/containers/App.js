import { connect } from 'react-redux';
import { login, createAccount, receiveSessionError } from 'actions/session';
import {
  createStream,
  closeStream,
  inviteToRoom,
  setFullScreen,
} from 'actions/stream';
import App from 'components/App';

const mapStateToProps = ({ session, stream }) => ({
  token: session.token,
  loggedIn: !!session.token,
  streams: stream.streams,
  fullScreen: stream.fullScreen,
  loading: session.loading,
  error: session.error,
});

const mapDispatchToProps = dispatch => ({
  login: (params) => dispatch(login(params)),
  createAccount: (params) => dispatch(createAccount(params)),
  createStream: (constraints) => dispatch(createStream(constraints)),
  closeStream: () => dispatch(closeStream()),
  inviteToRoom: (userId) => dispatch(inviteToRoom(userId)),
  setFullScreen: (status) => dispatch(setFullScreen(status)),
  resetSessionError: () => dispatch(receiveSessionError('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
