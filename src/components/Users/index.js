import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import User from './User';

const Wrapper = styled(Box)`
  padding: 0.725rem 0.75rem;
  background: ${({ theme }) => theme.grey.light};
  border-radius: 1.5rem;
  height: 100%;
`;

export function Users({ users, onClick }) {
  return (
    <Wrapper>
      <Box>
        { users.map((user, idx) => {
          return (
            <Box
              key={user.email}
              marginBottom={idx === users.length - 1 ? 0 : '1rem'}
            >
              <User
                onClick={onClick}
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
  onClick: PropTypes.func,
}

export default Users;
