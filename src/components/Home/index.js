import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Messages from 'containers/Messages';
import VideoRoom from 'containers/VideoRoom';
import Users from 'containers/Users';
import Code from './Code';
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
                    No patients with user accounts found. Patients must create
                    an account using the Physician Identifier below.
                  </Typography>
                </Box>
              ) : (
                <Users />
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

export default Home;
