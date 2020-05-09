import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FiVideo, FiMessageCircle } from 'react-icons/fi';
import Box from 'components/core/Box';
import Button from 'components/core/Button/Icon';
import Badge from 'components/core/Badge';
import UserInfo from './UserInfo';

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
  const prefix = isPhysician ? 'Dr. ' : '';

  return (
    <Wrapper>
      <UserInfo
        status={status}
        prefix={prefix}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        company={company}
        type={type}
      />

      <Box direction="row" align="center">
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
      </Box>
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

const Wrapper = styled(Box)`
  border-radius: 1.25rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.white};
`;
