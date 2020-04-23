import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import TextInput from 'components/core/TextInput';
import Button from 'components/core/Button';

export class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
  }

  state = {
    email: '',
    password: '',
  }

  handleChange = (event) => {
    const { target } = event;

    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.login(this.state);
  }

  render() {
    return (
      <Box width="100%" marginTop="6rem" align="center">
        <form onSubmit={this.handleSubmit}>
          <Box width="18rem">
            <Box marginBottom="1rem">
              <TextInput
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Box>

            <Box marginBottom="1rem">
              <TextInput
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Box>

            <Button type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    )
  }
}

export default Login;
