import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Container from 'components/core/Container';
import Menu from './Menu';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    loggedIn: PropTypes.bool,
    currentUser: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loggedIn: false,
  };

  render() {
    return (
      <Box separator="bottom">
        <Container width={this.props.loggedIn ? '54rem' : '48rem'}>
          <Box
            padding="1rem 1rem"
            direction="row"
            justify="space-between"
            align="center"
          >
            { this.props.loggedIn &&<Box width="100%" /> }

            <Box
              width="100%"
              align={this.props.loggedIn ? 'center' : 'flex-start'}
            >
              <Typography as="h1">{ this.props.title }</Typography>
            </Box>

            <Box width="100%" align="flex-end" zIndex={1000}>
              <Menu
                loggedIn={this.props.loggedIn}
                currentUser={this.props.currentUser}
                logout={this.props.logout}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Header;
