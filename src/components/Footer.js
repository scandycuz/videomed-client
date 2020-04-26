import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/core/Container';
import Box from 'components/core/Box';
import Link from 'components/core/Link';
import Typography from 'components/core/Typography';

export function Footer({ loggedIn, email }) {
  return (
    <Box background="grey.light">
      <Container width={loggedIn ? 'lg' : 'md'}>
        <Box
          padding="1.5rem 1rem 1.5rem"
          direction="row"

          justify="space-between"
          align="center"
        >
          <Typography color="grey.dark" weight={300}>
            &copy; 2020 VideoMed
          </Typography>

          <Typography color="grey.dark" weight={300}>
            <Link href={`mailto:${email}`}>
              { email }
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  loggedIn: PropTypes.bool,
  email: PropTypes.string,
};

export default Footer;
