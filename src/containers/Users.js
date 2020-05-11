import { connect } from 'react-redux';
import { findOrCreateConversation } from 'actions/messages';
import { requestCall } from 'actions/stream';
import Users from 'components/Users';

const mapStateToProps = ({ session, users, messages }) => ({
  currentUser: session.currentUser,
  users: users.users,
  onlineStatus: users.onlineStatus,
  conversations: messages.conversations,
});

const mapDispatchToProps = dispatch => ({
  requestCall: (userId) => dispatch(requestCall(userId)),
  startMessaging: (userId) => dispatch(findOrCreateConversation(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
