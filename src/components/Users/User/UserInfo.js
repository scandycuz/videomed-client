import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import OnlineIndicator from './OnlineIndicator';
import Profile from './Profile';

export function UserInfo({
  status,
  prefix,
  firstName,
  lastName,
  email,
  phone,
  company,
  type,
}) {
  const isPhysician = type === 'Physician';

  return (
    <Box direction="row" align="center">
      <Box with="100%" marginRight="1rem">
        <Profile firstName={firstName} lastName={lastName} />
      </Box>

      <Box width="100%">
        <Box align="flex-start">
          <Typography size="1.1rem" as="h5">
            { prefix } { firstName } { lastName }
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
    </Box>
  )
}

UserInfo.propTypes = {
  status: PropTypes.string,
  prefix: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  company: PropTypes.string,
  type: PropTypes.string,
}

export default UserInfo;
