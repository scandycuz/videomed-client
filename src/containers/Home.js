import { connect } from 'react-redux';
import { logout } from 'actions/session';
import {
  createStream,
  closeStream,
  inviteToRoom,
  setFullScreen,
} from 'actions/stream';
import Home from 'components/Home';

const mapStateToProps = ({ session, stream, users, app }) => ({
  currentUser: session.currentUser,
  streams: stream.streams,
  fullScreen: stream.fullScreen,
  loading: stream.loading,
  users: users.users,
  error: app.error,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  createStream: (constraints) => dispatch(createStream(constraints)),
  closeStream: () => dispatch(closeStream()),
  inviteToRoom: (userId) => dispatch(inviteToRoom(userId)),
  setFullScreen: (status) => dispatch(setFullScreen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
