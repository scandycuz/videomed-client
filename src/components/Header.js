import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <Box padding="1rem" direction="row" justify="center">
        <Typography as="h1">{ this.props.title }</Typography>
      </Box>
    );
  }
}

export default Header;
