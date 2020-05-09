import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FiVideo, FiMessageCircle } from 'react-icons/fi';
import Box from 'components/core/Box';
import Button from 'components/core/Button/Icon';
import Badge from 'components/core/Badge';
import Typography from 'components/core/Typography';
import OnlineIndicator from './OnlineIndicator';
import Profile from './Profile';

const Wrapper = styled(Box)`
  border-radius: 1.25rem;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.white};
`;

export function User({
  theme,
  id,
  status,
  firstName,
  lastName,
  email,
  phone,
  company,
  type,
  conversation,
  startMessaging,
  startCall,
}) {
  const isPhysician = type === 'Physician';

  return (
    <Wrapper>
      <Box with="100%" marginRight="1rem">
        <Profile firstName={firstName} lastName={lastName} />
      </Box>

      <Box width="100%">
        <Box align="flex-start">
          <Typography size="1.1rem" as="h5">
            { isPhysician ? 'Dr.' : ''} { firstName } { lastName }
          </Typography>
          <Typography size="1.1rem">{ email }</Typography>
          { phone && <Typography size="1.1rem">{ phone }</Typography> }
          { company && <Typography size="1.1rem">{ company }</Typography> }
        </Box>

        { !isPhysician && (
          <Box marginTop="0.1rem">
            <OnlineIndicator status={status} />
          </Box>
        )}
      </Box>

      { (!isPhysician || conversation) && (
        <Box marginRight="0.25rem">
          <Badge count={conversation ? conversation.unread : 0}>
            <Button onClick={() => startMessaging(id)}>
              <Box padding="1rem">
                <FiMessageCircle size="1.75rem" color={theme.black.light} />
              </Box>
            </Button>
          </Badge>
        </Box>
      )}

      { startCall && (
        <Box>
          <Button onClick={() => startCall(id)}>
            <Box padding="1rem">
              <FiVideo size="1.75rem" color={theme.black.light} />
            </Box>
          </Button>
        </Box>
      )}
    </Wrapper>
  )
}

User.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  company: PropTypes.string,
  type: PropTypes.string,
  conversation: PropTypes.object,
  startMessaging: PropTypes.func,
  startCall: PropTypes.func,
};

export default withTheme(User);
