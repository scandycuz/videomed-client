import { connect } from 'react-redux';
import { logout } from 'actions/session';
import {
  findOrCreateConversation,
  getConversations,
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
  pending: stream.pending,
  from: stream.participant,
  users: users.users,
  onlineStatus: users.onlineStatus,
  conversations: messages.conversations,
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
  findOrCreateConversation: (userId) => dispatch(findOrCreateConversation(userId)),
  getConversations: () => dispatch(getConversations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
