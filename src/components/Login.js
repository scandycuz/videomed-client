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
import ImageBox from 'components/core/ImageBox';
import authorization from 'assets/images/authorization.png';
import noDataStorage from 'assets/images/no-data-storage.png';
import peerToPeer from 'assets/images/peer-to-peer.png';

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

  componentDidMount() {
    this.props.resetSessionError();
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
      <Box marginTop="3rem">
        <Container width="48rem">
          <Box
            width="100%"
            direction="row"
          >
            <Box
              width="52.5%"
              marginTop="1rem"
              marginRight="2rem"
              paddingRight="1rem"
            >
              <Box marginLeft="0.5rem" marginBottom="1rem">
                <Typography size="1.2rem" weight={300}>
                  VideoMed is a free and secure telemedicine app designed to
                  help physicians interact with patients during the Covid-19
                  pandemic.
                </Typography>
              </Box>

              <Box align="flex-start" justify="flex-start">
                <Box marginBottom="1rem">
                  <ImageBox
                    src={authorization}
                    alt="SSL encryption and token authentication"
                    title="Enforced SSL encryption and user authentication."
                  />
                </Box>

                <Box marginBottom="1rem">
                  <ImageBox
                    src={noDataStorage}
                    alt="no stored data."
                    title="No data is ever stored."
                  />
                </Box>

                <Box marginBottom="1rem">
                  <ImageBox
                    src={peerToPeer}
                    alt="desc"
                    title="Peer to Peer connection between two users, no third parties."
                  />
                </Box>
              </Box>
            </Box>

            <Box
              width="47.5%"
              marginLeft="1rem"
              marginTop="3rem"
            >
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
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Login;
