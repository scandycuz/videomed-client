import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FiX } from 'react-icons/fi';
import PulseLoader from "react-spinners/PulseLoader";
import Button from 'components/core/Button/Icon';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

export class Messages extends Component {
  static propTypes = {
    theme: PropTypes.object,
    loading: PropTypes.bool,
    messages: PropTypes.array,
    conversations: PropTypes.array,
    currentUser: PropTypes.object,
    activeConversation: PropTypes.number,
    createMessage: PropTypes.func.isRequired,
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

    return (
      <Box>
        <Box
          direction="row"
          justify="space-between"
          align="center"
          padding="1rem 1rem 0.75rem"
        >
          <Typography size="1.25rem">
            Conversation with <strong>{ participant.firstName } { participant.lastName }</strong>
          </Typography>

          <Button onClick={this.props.closeConversation}>
            <Box padding="1rem">
              <FiX
                size="1.75rem"
                color={this.props.theme.black.light}
              />
            </Box>
          </Button>
        </Box>


        <Box padding="0 1rem">
          <MessageList
            currentUser={this.props.currentUser}
            messages={this.props.messages}
          />
        </Box>

        <Box marginTop="0.5rem" padding="1rem">
          <MessageForm onSubmit={this.handleSubmit} />
        </Box>
      </Box>
    );
  }
}

export default withTheme(Messages);
