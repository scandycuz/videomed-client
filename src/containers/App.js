import { connect } from 'react-redux';
import { closeStream } from 'actions/stream';
import {
  login,
  logout,
  createAccount,
  loginFromSession,
  receiveSessionError
} from 'actions/session';
import App from 'components/App';

const mapStateToProps = ({ session }) => ({
  token: session.token,
  loggedIn: !!session.token,
  currentUser: session.currentUser,
  loading: session.loading,
  error: session.error,
});

const mapDispatchToProps = dispatch => ({
  login: (params) => dispatch(login(params)),
  loginFromSession: () => dispatch(loginFromSession()),
  logout: () => dispatch(logout()),
  createAccount: (params) => dispatch(createAccount(params)),
  resetSessionError: () => dispatch(receiveSessionError('')),
  closeStream: () => dispatch(closeStream()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
