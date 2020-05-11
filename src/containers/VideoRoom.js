import { connect } from 'react-redux';
import {
  createMessage,
  findOrCreateConversation,
  readConversation,
  receiveActiveConversation,
} from 'actions/messages';
import {
  closeStream,
  setFullScreen,
} from 'actions/stream';
import VideoRoom from 'components/VideoRoom';

const mapStateToProps = ({ session, stream, messages }) => ({
  currentUser: session.currentUser,
  streams: stream.streams,
  fullScreen: stream.fullScreen,
  loading: stream.loading,
  messageLoading: messages.loading,
  participant: stream.participant,
  messages: messages.messages,
  conversations: messages.conversations,
  activeConversation: messages.active,
});

const mapDispatchToProps = dispatch => ({
  closeStream: () => dispatch(closeStream()),
  setFullScreen: (status) => dispatch(setFullScreen(status)),
  createMessage: (id, params) => dispatch(createMessage(id, params)),
  startMessaging: (userId) => dispatch(findOrCreateConversation(userId)),
  readConversation: (id) => dispatch(readConversation(id)),
  closeConversation: () => dispatch(receiveActiveConversation(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoRoom);
