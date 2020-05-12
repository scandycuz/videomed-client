import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import User from './User';

function UserList({
  users,
  currentUser,
  conversations,
  onlineStatus,
  startMessaging,
  requestCall,
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
                startCall={currentUser.type === 'Physician' ? requestCall : undefined}
                {...user}
              />
            </Box>
          );
        })}
      </Box>
    </Wrapper>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  conversations: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onlineStatus: PropTypes.object.isRequired,
  startMessaging: PropTypes.func,
  requestCall: PropTypes.func,
}

export default UserList;

const Wrapper = styled(Box)`
  padding: 0.725rem 0.75rem;
  background: ${({ theme }) => theme.grey.light};
  border-radius: 1.5rem;
  height: 100%;
`;
