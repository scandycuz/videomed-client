import { connect } from 'react-redux';
import { login } from 'actions/session';
import App from 'components/App';

const mapStateToProps = ({ session }) => ({
  token: session.token,
  loading: session.loading,
});

const mapDispatchToProps = dispatch => ({
  login: (params) => dispatch(login(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
