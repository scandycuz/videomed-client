import { connect } from 'react-redux';
import { login } from 'actions/session';
import { createStream, inviteToStream } from 'actions/stream';
import App from 'components/App';

const mapStateToProps = ({ session, stream }) => ({
  token: session.token,
  loggedIn: !!session.token,
  stream: stream.stream,
  loading: session.loading,
});

const mapDispatchToProps = dispatch => ({
  login: (params) => dispatch(login(params)),
  createStream: () => dispatch(createStream()),
  inviteToStream: (userId) => dispatch(inviteToStream(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
