import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import UserList from './UserList';
import Code from './Code';

export function Users({
  users,
  currentUser,
  conversations,
  onlineStatus,
  startMessaging,
  requestCall,
}) {
  return (
    <Box>
      <Box align="center" >
        <Typography
          as="h4"
          size="1.45rem"
          align="center"
          color="black.light"
        >
          { currentUser.type === 'Patient' ? (
            'Your Physician:'
          ) : (
            'Your Patients:'
          )}
        </Typography>
      </Box>

      <Box margin="1rem 0" minHeight="8.5rem">
        { !users.length ? (
          <Box
            padding="1.75rem"
            borderRadius="1rem"
            background="grey.light"
          >
            <Typography
              size="1.1rem"
              color="black.light"
              align="center"
            >
              No patients with user accounts found. Patients must create
              an account using the Physician Identifier below.
            </Typography>
          </Box>
        ) : (
          <UserList
            users={users}
            currentUser={currentUser}
            conversations={conversations}
            onlineStatus={onlineStatus}
            startMessaging={startMessaging}
            requestCall={requestCall}
          />
        )}
      </Box>

      <Box marginTop="1rem" align="center">
        { currentUser.type === 'Physician' ? (
          <Code code={currentUser.code} />
        ) : (
          <Typography align="center" color="black.light" size="1.25rem">
            Make an appointment with your physician as you normally would,
            and they will reach out at the scheduled time.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  conversations: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onlineStatus: PropTypes.object.isRequired,
  startMessaging: PropTypes.func,
  requestCall: PropTypes.func,
}

export default Users;
