import { connect } from 'react-redux';
import { login } from 'actions/session';
import { createStream, inviteToRoom } from 'actions/stream';
import App from 'components/App';

const mapStateToProps = ({ session, stream }) => ({
  token: session.token,
  loggedIn: !!session.token,
  streams: stream.streams,
  loading: session.loading,
});

const mapDispatchToProps = dispatch => ({
  login: (params) => dispatch(login(params)),
  createStream: (constraints) => dispatch(createStream(constraints)),
  inviteToRoom: (userId) => dispatch(inviteToRoom(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
