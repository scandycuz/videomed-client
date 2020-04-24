import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Button from 'components/core/Button';
import Link from 'components/core/Link';

export function Menu({ location: { pathname } }) {
  return (
    <Box>
      <Button
        plain
        round
      >
        <Link to={pathname === '/login' ? '/signup' : '/login'}>
          <Typography color="black.light">
            { pathname === '/login' ? 'Sign up' : 'Log in' }
          </Typography>
        </Link>
      </Button>
    </Box>
  );
}

Menu.propTypes = {
  location: PropTypes.object,
}

export default withRouter(Menu);
