import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FiVideo } from 'react-icons/fi';
import Box from 'components/core/Box';
import Button from 'components/core/Button/Base';
import Typography from 'components/core/Typography';
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
  firstName,
  lastName,
  email,
  phone,
  company,
  onClick,
}) {
  return (
    <Wrapper>
      <Box with="100%" marginRight="1rem">
        <Profile firstName={firstName} lastName={lastName} />
      </Box>

      <Box width="100%">
        <Box align="flex-start">
          <Typography size="1.1rem" as="h5">{ firstName } { lastName }</Typography>
          <Typography size="1.1rem">{ email }</Typography>
          { phone && <Typography size="1.1rem">{ phone }</Typography> }
          { company && <Typography size="1.1rem">{ company }</Typography> }
        </Box>
      </Box>

      { onClick && (
        <Box marginRight="0.5rem">
          <Button onClick={() => onClick(id)}>
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  company: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default withTheme(User);
