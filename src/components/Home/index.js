import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Messages from 'containers/Messages';
import VideoRoom from 'containers/VideoRoom';
import Users from 'containers/Users';
import AnswerCall from './AnswerCall';

export class Home extends Component {
  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object,
    activeConversation: PropTypes.number,
    streams: PropTypes.object,
    pending: PropTypes.bool,
    from: PropTypes.number,
    getConversations: PropTypes.func.isRequired,
    acceptCall: PropTypes.func.isRequired,
    rejectCall: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getConversations();
  }

  render() {
    const prefix = this.props.currentUser.type === 'Patient' ? 'Dr. ' : '';
    const user = this.props.from &&
      this.props.users.find((u) => u.id === this.props.from);

    return (
      <Box align="center">
        { this.props.pending && user && (
          <AnswerCall
            user={user}
            prefix={prefix}
            acceptCall={this.props.acceptCall}
            rejectCall={this.props.rejectCall}
          />
        )}

        { this.props.streams.self ? (
          <VideoRoom />
        ) : this.props.activeConversation ? (
          <Box marginTop="2rem" width="36rem" maxWidth="100%">
            <Messages />
          </Box>
        ) : (
          <Box marginTop="3.5rem" width="36rem" maxWidth="100%">
            <Users />
          </Box>
        )}
      </Box>
    )
  }
}

export default Home;
