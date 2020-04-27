import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import VideoRoom from 'components/VideoRoom';
import Users from 'components/Users';
import Code from './Code';

export class Home extends Component {
  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object,
    streams: PropTypes.object,
    fullScreen: PropTypes.bool,
    loading: PropTypes.bool,
    setFullScreen: PropTypes.func.isRequired,
    createStream: PropTypes.func.isRequired,
    closeStream: PropTypes.func.isRequired,
    requestCall: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: false,
    fullScreen: false,
  }

  startCall = async (userId) => {
    this.props.requestCall(userId);
  }

  render() {
    return (
      <Box align="center">
        { this.props.streams.self ? (
          <VideoRoom
            loading={this.props.loading}
            streams={this.props.streams}
            fullScreen={this.props.fullScreen}
            setFullScreen={this.props.setFullScreen}
            closeStream={this.props.closeStream}
          />
        ) : (
          <Box marginTop="3.5rem" width="28rem" maxWidth="100%">
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
                  onClick={ this.props.currentUser.type === 'Physician' ? this.startCall : undefined}
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

export default Home;
