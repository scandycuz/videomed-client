import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Container from 'components/core/Container';
import Menu from './Menu';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <Container width="md">
        <Box
          separator="bottom"
          padding="1rem"
          direction="row"
          justify="space-between"
          align="center"
        >
          <Box width="100%" />

          <Box width="100%" align="center">
            <Typography as="h1">{ this.props.title }</Typography>
          </Box>

          <Box width="100%" align="flex-end">
            <Menu />
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Header;
