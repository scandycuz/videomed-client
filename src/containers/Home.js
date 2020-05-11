import { connect } from 'react-redux';
import { getConversations } from 'actions/messages';
import { acceptCall, rejectCall } from 'actions/stream';
import Home from 'components/Home';

const mapStateToProps = ({ session, stream, users, messages }) => ({
  currentUser: session.currentUser,
  streams: stream.streams,
  pending: stream.pending,
  from: stream.participant,
  users: users.users,
  activeConversation: messages.active,
});

const mapDispatchToProps = dispatch => ({
  acceptCall: () => dispatch(acceptCall()),
  rejectCall: () => dispatch(rejectCall()),
  getConversations: () => dispatch(getConversations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
