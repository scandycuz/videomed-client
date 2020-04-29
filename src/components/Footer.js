import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/core/Container';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function Footer({ loggedIn }) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://seal.godaddy.com/getSeal?sealID=PG4R0ZVnCjUA9qkQZnQ3VbeoaXnjL07mP2PbpUJMNNtgkeu5QksRu8maiRSd";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <Box background="grey.light">
      <Container width={loggedIn ? '54rem' : '46rem'}>
        <Box
          padding="1.5rem 2rem 1.5rem"
          direction="row"

          justify="space-between"
          align="center"
        >
          <Typography color="grey.dark" weight={300}>
            &copy; 2020 VideoMed
          </Typography>

          <div id="siteseal" />
        </Box>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  loggedIn: PropTypes.bool,
};

export default Footer;
