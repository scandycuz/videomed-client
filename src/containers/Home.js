import { connect } from 'react-redux';
import { logout } from 'actions/session';
import {
  createMessage,
  findOrCreateConversation,
  getConversations,
  readConversation,
  receiveActiveConversation,
} from 'actions/messages';
import {
  createStream,
  closeStream,
  requestCall,
  acceptCall,
  rejectCall,
  setFullScreen,
} from 'actions/stream';
import Home from 'components/Home';

const mapStateToProps = ({ session, stream, users, messages, app }) => ({
  currentUser: session.currentUser,
  streams: stream.streams,
  fullScreen: stream.fullScreen,
  loading: stream.loading,
  messageLoading: messages.loading,
  pending: stream.pending,
  from: stream.participant,
  users: users.users,
  onlineStatus: users.onlineStatus,
  conversations: messages.conversations,
  messages: messages.messages,
  activeConversation: messages.active,
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
  createMessage: (id, params) => dispatch(createMessage(id, params)),
  readConversation: (id) => dispatch(readConversation(id)),
  findOrCreateConversation: (userId) => dispatch(findOrCreateConversation(userId)),
  getConversations: () => dispatch(getConversations()),
  closeConversation: () => dispatch(receiveActiveConversation(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
