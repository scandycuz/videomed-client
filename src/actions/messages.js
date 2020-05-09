import API from 'util/API';
import { format, unformat } from 'util/methods';
import {
  RECEIVE_ACTIVE_CONVERSATION,
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGE_LOADING,
} from 'actions/types';

export function findOrCreateConversation(userId) {
  return async function(dispatch, getState) {
    const { token } = getState().session;

    const conversation = { users: [userId] };

    dispatch(receiveMessageLoading(true));

    try {
      const resp = await API.findOrCreateConversation(token, { conversation });

      dispatch(receiveActiveConversation(resp.data.id));
      dispatch(receiveConversation(resp.data));

      await dispatch(getMessages(resp.data.id));
    } catch(e) {
      console.error(e);
    } finally {
      dispatch(receiveMessageLoading(false));
    }
  }
}

export function getConversations() {
  return async function(dispatch, getState) {
    const { token } = getState().session;

    try {
      const resp = await API.fetchConversations(token);

      dispatch(receiveConversations(resp.data));
    } catch(e) {
      console.error(e);
    }
  }
}

export function readConversation(id) {
  return async function(dispatch, getState) {
    const { token } = getState().session;

    try {
      const resp = await API.readConversation(token, id);

      dispatch(receiveConversation(format(resp.data)));
    } catch(e) {
      console.error(e);
    }
  }
}

export function getMessages(conversationId) {
  return async function(dispatch, getState) {
    const { token } = getState().session;

    try {
      const resp = await API.fetchMessages(token, conversationId);

      dispatch(receiveMessages(resp.data.map(format)));
    } catch(e) {
      console.error(e);
    }
  }
}

export function createMessage(conversationId, message) {
  return async function(dispatch, getState) {
    const { token, currentUser } = getState().session;

    try {
      dispatch(receiveMessage({
        ...message,
        user: { id: currentUser.id },
        _placeholder: true,
      }));

      await API.createMessage(
        token,
        conversationId,
        { message: unformat(message) },
      );
    } catch(e) {
      console.error(e);
    }
  }
}

export function receiveActiveConversation(active) {
  return {
    type: RECEIVE_ACTIVE_CONVERSATION,
    active,
  };
}

export function receiveConversations(conversations) {
  return {
    type: RECEIVE_CONVERSATIONS,
    conversations: conversations.map(formatConversation),
  };
}

export function receiveConversation(conversation) {
  return {
    type: RECEIVE_CONVERSATION,
    conversation: formatConversation(conversation),
  };
}

export function receiveMessages(messages) {
  return {
    type: RECEIVE_MESSAGES,
    messages,
  };
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}

export function receiveMessageLoading(loading) {
  return {
    type: RECEIVE_MESSAGE_LOADING,
    loading,
  };
}

function formatConversation(conversation) {
  return format({
    ...conversation,
    participants: conversation.participants.map(format),
  });
}
