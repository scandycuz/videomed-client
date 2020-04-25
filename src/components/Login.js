import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/core/Container';
import Box from 'components/core/Box';
import TextInput from 'components/core/TextInput';
import PasswordInput from 'components/core/PasswordInput';
import Typography from 'components/core/Typography';
import Button from 'components/core/Button';
import Link from 'components/core/Link';
import Form from 'components/core/Form';
import Field from 'components/core/Field';

export class Login extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    resetSessionError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
  }

  state = {
    email: '',
    password: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <Container width="xs">
        <Box width="100%" marginTop="6rem" align="center">
          <Form onSubmit={this.handleSubmit}>
            <Box>
              <Box marginBottom="1rem">
                <Field>
                  <TextInput
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Field>
              </Box>

              <Box marginBottom="1rem">
                <Field>
                  <PasswordInput
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Field>
              </Box>

              { this.props.error && (
                <Box marginTop="-0.25rem" marginBottom="0.5rem" align="center">
                  <Typography color="critical">
                    { this.props.error }
                  </Typography>
                </Box>
              )}

              <Button
                disabled={this.props.loading}
                type="submit"
              >
                Log in
              </Button>
            </Box>
          </Form>

          <Box marginTop="1.5rem" width="100%">
            <Typography size="1.1rem" color="black.light" align="center">
              Don&apos;t have an account?

              <Box display="inline" marginLeft="0.5rem">
                <Link color="black" to="/signup">
                  <strong>Sign up</strong>
                </Link>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Login;
