import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import User from './User';

export function Users({
  users,
  currentUser,
  conversations,
  onlineStatus,
  startMessaging,
  startCall,
}) {
  return (
    <Wrapper>
      <Box>
        { users.map((user, idx) => {
          const conversation = conversations.find(({ participants }) => {
            const ids = participants.map(({ id }) => id);
            const others = ids.filter((id) => id !== currentUser.id);

            return others.includes(user.id);
          });

          return (
            <Box
              key={user.email}
              marginBottom={idx === users.length - 1 ? 0 : '0.75rem'}
            >
              <User
                status={onlineStatus[user.id]}
                conversation={conversation}
                startMessaging={startMessaging}
                startCall={startCall}
                {...user}
              />
            </Box>
          );
        })}
      </Box>
    </Wrapper>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  conversations: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onlineStatus: PropTypes.object.isRequired,
  startMessaging: PropTypes.func,
  startCall: PropTypes.func,
}

export default Users;

const Wrapper = styled(Box)`
  padding: 0.725rem 0.75rem;
  background: ${({ theme }) => theme.grey.light};
  border-radius: 1.5rem;
  height: 100%;
`;
