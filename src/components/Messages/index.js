import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FiX, FiVideo, FiMessageCircle } from 'react-icons/fi';
import PulseLoader from "react-spinners/PulseLoader";
import Button from 'components/core/Button/Icon';
import Box from 'components/core/Box';
import UserInfo from 'components/Users/User/UserInfo';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

export class Messages extends Component {
  static propTypes = {
    theme: PropTypes.object,
    loading: PropTypes.bool,
    messages: PropTypes.array,
    conversations: PropTypes.array,
    onlineStatus: PropTypes.object,
    currentUser: PropTypes.object,
    activeConversation: PropTypes.number,
    createMessage: PropTypes.func.isRequired,
    requestCall: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    readConversation: PropTypes.func.isRequired,
    closeConversation: PropTypes.func.isRequired,
  }

  static defaultProps = {
    messages: [],
    loading: false,
  }

  componentDidMount() {
    this.props.readConversation(this.props.activeConversation);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.props.readConversation(this.props.activeConversation);
    }
  }

  startCall = async (userId) => {
    this.props.requestCall(userId);
  }

  handleSubmit = (message) => {
    this.props.createMessage(this.props.activeConversation, message);
  }

  render() {
    if (this.props.loading) return (
      <Box align="center" marginTop="6rem">
        <PulseLoader
          color={this.props.theme.secondary.light}
          loading
        />
      </Box>
    );

    const conversation = this.props.conversations.find(({ id }) => {
      return id === this.props.activeConversation;
    });

    const participant = conversation.participants.find(({ id }) => {
      return id !== this.props.currentUser.id;
    });

    const isPhysician = participant.type === 'Physician';
    const prefix = isPhysician ? 'Dr. ' : '';

    return (
      <Wrapper>
        <Box
          position="absolute"
          top="-1.5rem"
          right="-1.5rem"
          background="grey.light"
          borderRadius="50%"
        >
          <Button onClick={this.props.closeConversation}>
            <Box padding="1rem">
              <FiX size="1.95rem" color={this.props.theme.black.light} />
            </Box>
          </Button>
        </Box>

        <Box
          borderRadius="1.25rem"
          padding="1.5rem"
          background="white"
        >
          <Box
            direction="row"
            justify="space-between"
            align="center"
            paddingBottom="0.75rem"
          >
            <UserInfo
              status={this.props.onlineStatus[participant.id]}
              prefix={prefix}
              firstName={participant.firstName}
              lastName={participant.lastName}
              email={participant.email}
              phone={participant.phone}
              company={participant.company}
              type={participant.type}
            />

            <Box
              direction="row"
              align="center"
            >
              { !isPhysician && (
                <Box>
                  <Button disabled>
                    <Box padding="1rem">
                      <FiMessageCircle
                        size="1.75rem"
                        color={this.props.theme.disabled}
                      />
                    </Box>
                  </Button>
                </Box>
              )}

              { !isPhysician && (
                <Box>
                  <Button onClick={() => this.startCall(participant.id)}>
                    <Box padding="1rem">
                      <FiVideo size="1.75rem" color={this.props.theme.black.light} />
                    </Box>
                  </Button>
                </Box>
              )}
            </Box>
          </Box>


          <Box background="white">
            <MessageList
              currentUser={this.props.currentUser}
              messages={this.props.messages}
            />
          </Box>

          <Box padding="1rem 0 0" background="white">
            <MessageForm onSubmit={this.handleSubmit} />
          </Box>
        </Box>
      </Wrapper>
    );
  }
}

export default withTheme(Messages);

const Wrapper = styled(Box)`
  position: relative;
  padding: 0.725rem 0.75rem;
  background: ${({ theme }) => theme.grey.light};
  border-radius: 1.5rem;
`;
