import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Button from 'components/core/Button';
import Link from 'components/core/Link';
import CoreMenu from 'components/core/Menu';

export function Menu({
  theme,
  loggedIn,
  logout,
  currentUser,
  location: { pathname },
}) {
  return (
    <Box>
      { loggedIn ? (
        <CoreMenu
          label={currentUser.email}
          items={[{
            label: 'Logout',
            action: logout,
            icon: <FiLogOut color={theme.black.light} />,
          }]}
        />
      ) : (
        <Button plain round>
          <Link to={pathname === '/login' ? '/signup' : '/login'}>
            <Typography color="black.light">
              { pathname === '/login' ? 'Sign up' : 'Log in' }
            </Typography>
          </Link>
        </Button>
      )}
    </Box>
  );
}

Menu.propTypes = {
  theme: PropTypes.object.isRequired,
  location: PropTypes.object,
  loggedIn: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

Menu.defaultProps = {
  loggedIn: false,
};

export default withRouter(withTheme(Menu));
