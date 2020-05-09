import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Messages from 'containers/Messages';
import VideoRoom from 'components/VideoRoom';
import Users from 'components/Users';
import Code from './Code';
import AnswerCall from './AnswerCall';

export class Home extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    users: PropTypes.array,
    onlineStatus: PropTypes.object,
    currentUser: PropTypes.object,
    activeConversation: PropTypes.number,
    streams: PropTypes.object,
    conversations: PropTypes.array,
    fullScreen: PropTypes.bool,
    loading: PropTypes.bool,
    pending: PropTypes.bool,
    from: PropTypes.number,
    setFullScreen: PropTypes.func.isRequired,
    findOrCreateConversation: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    createStream: PropTypes.func.isRequired,
    closeStream: PropTypes.func.isRequired,
    requestCall: PropTypes.func.isRequired,
    acceptCall: PropTypes.func.isRequired,
    rejectCall: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: false,
    fullScreen: false,
  }

  componentDidMount() {
    this.props.getConversations();
  }

  startCall = async (userId) => {
    this.props.requestCall(userId);
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
          <VideoRoom
            loading={this.props.loading}
            streams={this.props.streams}
            fullScreen={this.props.fullScreen}
            setFullScreen={this.props.setFullScreen}
            closeStream={this.props.closeStream}
          />
        ) : this.props.activeConversation ? (
          <Box marginTop="2rem" width="36rem" maxWidth="100%">
            <Messages />
          </Box>
        ) : (
          <Box marginTop="3.5rem" width="36rem" maxWidth="100%">
            <Box align="center" >
              <Typography
                as="h4"
                size="1.45rem"
                align="center"
                color="black.light"
              >
                { this.props.currentUser.type === 'Patient' ? (
                  'Your Physician:'
                ) : (
                  'Your Patients:'
                )}
              </Typography>
            </Box>

            <Box margin="1rem 0" minHeight="8.5rem">
              { !this.props.users.length ? (
                <Box
                  padding="1.75rem"
                  borderRadius="1rem"
                  background="grey.light"
                >
                  <Typography
                    size="1.1rem"
                    color="black.light"
                    align="center"
                  >
                    No patients with user accounts found.
                  </Typography>
                </Box>
              ) : (
                <Users
                  users={this.props.users}
                  currentUser={this.props.currentUser}
                  onlineStatus={this.props.onlineStatus}
                  conversations={this.props.conversations}
                  startMessaging={this.props.findOrCreateConversation}
                  startCall={ this.props.currentUser.type === 'Physician' ? this.startCall : undefined}
                />
              )}
            </Box>

            <Box marginTop="1rem" align="center">
              { this.props.currentUser.type === 'Physician' ? (
                <Code code={this.props.currentUser.code} />
              ) : (
                <Typography align="center" color="black.light" size="1.25rem">
                  Make an appointment with your physician as you normally would,
                  and they will reach out at the scheduled time.
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    )
  }
}

export default withTheme(Home);
