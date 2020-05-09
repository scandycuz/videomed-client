import { connect } from 'react-redux';
import {
  getMessages,
  getConversations,
  readConversation,
  createMessage,
  receiveActiveConversation,
} from 'actions/messages';
import Messages from 'components/Messages';

const mapStateToProps = ({ session, messages, users }) => ({
  currentUser: session.currentUser,
  conversations: messages.conversations,
  activeConversation: messages.active,
  messages: messages.messages,
  onlineStatus: users.onlineStatus,
  loading: messages.loading,
});

const mapDispatchToProps = dispatch => ({
  getMessages: (conversationId) => dispatch(getMessages(conversationId)),
  getConversations: () => dispatch(getConversations()),
  readConversation: (id) => dispatch(readConversation(id)),
  createMessage: (id, params) => dispatch(createMessage(id, params)),
  closeConversation: () => dispatch(receiveActiveConversation(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
