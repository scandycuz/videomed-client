import { connect } from 'react-redux';
import { logout } from 'actions/session';
import {
  createStream,
  closeStream,
  requestCall,
  acceptCall,
  rejectCall,
  setFullScreen,
} from 'actions/stream';
import Home from 'components/Home';

const mapStateToProps = ({ session, stream, users, app }) => ({
  currentUser: session.currentUser,
  streams: stream.streams,
  fullScreen: stream.fullScreen,
  loading: stream.loading,
  pending: stream.pending,
  from: stream.participant,
  users: users.users,
  error: app.error,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createStream: (constraints) => dispatch(createStream(constraints)),
  closeStream: () => dispatch(closeStream()),
  requestCall: (userId) => dispatch(requestCall(userId)),
  acceptCall: () => dispatch(acceptCall()),
  rejectCall: () => dispatch(rejectCall()),
  setFullScreen: (status) => dispatch(setFullScreen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
