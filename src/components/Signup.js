import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/core/Container';
import TextInput from 'components/core/TextInput';
import PasswordInput from 'components/core/PasswordInput';
import Typography from 'components/core/Typography';
import Box from 'components/core/Box';
import Form from 'components/core/Form';
import Field from 'components/core/Field';
import Button from 'components/core/Button';
import Link from 'components/core/Link';
import RadioGroup from 'components/core/RadioGroup';
import RadioButton from 'components/core/RadioGroup/RadioButton';
import { required, minLength, email } from 'util/validations';

const values = [
  'email',
  'firstName',
  'lastName',
  'password',
  'type',
  'code',
  'key',
];

export class Signup extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    resetSessionError: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: false,
  };

  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    type: '',
    code: '',
    key: '',
    errors: {},
    blurred: {},
  };

  validations = {
    email: [required(), email()],
    firstName: [required()],
    lastName: [required()],
    password: [required(), minLength(10)],
    type: [required()],
    code: [],
    key: [],
  };

  validate = (e) => {
    const { name, value } = e.target;

    const errors = this.validations[name]
      .map((func) => func(value))
      .filter((e) => e);

    this.setState({
      errors: {
        ...this.state.errors,
        [name]: errors,
      },
    });
  };

  validateFields = () => {
    const errors = {};

    for (const key of values) {
      const value = this.state[key];

      errors[key] = this.validations[key]
        .map((func) => func(value))
        .filter((e) => e);
    }

    this.setState({ errors });
  }

  blurrFields = () => {
    const blurred = {};

    for (const key of values) {
      blurred[key] = true;
    }

    this.setState({ blurred });
  }

  handleChange = (e) => {
    if (this.props.error) this.props.resetSessionError();

    const { name, value } = e.target;

    this.validate({ target: { name, value }});
    this.setState({ [name]: value });
  }

  handleBlur = (e) => {
    const { name } = e.target;

    this.setState({
      blurred: {
        ...this.state.blurred,
        [name]: true,
      },
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await this.blurrFields();
    await this.validateFields();

    if (!Object.values(this.state.errors).find((v) => v.length)) {
      const user = {};

      for (const key of values) {
        user[key] = this.state[key];
      }

      this.props.onSubmit({ user });
    }
  }

  render() {
    return (
      <Container width="sm">
        <Box width="100%" marginTop="6rem" align="center">
          <Form onSubmit={this.handleSubmit}>
            <Box
              marginBottom="1rem"
              direction="row"
              justify="center"
            >
              <Box width="100%" marginRight="0.7rem">
                <Field errors={this.state.blurred.firstName && this.state.errors.firstName}>
                  <TextInput
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Field>
              </Box>

              <Box width="100%" marginLeft="0.7rem">
                <Field errors={this.state.blurred.lastName && this.state.errors.lastName}>
                  <TextInput
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Field>
              </Box>
            </Box>

            <Box marginBottom="1rem">
              <Field errors={this.state.blurred.email && this.state.errors.email}>
                <TextInput
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </Field>
            </Box>

            <Box marginBottom="1rem">
              <Field errors={this.state.blurred.password && this.state.errors.password}>
                <PasswordInput
                  name="password"
                  placeholder="Password (min. 10 characters)"
                  autocomplete={false}
                  value={this.state.password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </Field>
            </Box>

            <Box marginTop="0.25rem" marginBottom="0.75rem">
              <Field
                label="Account Type"
                border="none"
                errors={this.state.errors.type}
              >
                <Box padding="0 0.5rem">
                  <RadioGroup
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    <RadioButton
                      label="Physician"
                      value='Physician'
                    />
                    <RadioButton
                      label="Patient"
                      value='Patient'
                    />
                  </RadioGroup>
                </Box>
              </Field>
            </Box>

            { this.state.type === 'Physician' && (
              <Box marginBottom="0.25rem">
                <Field errors={this.state.blurred.key && this.state.errors.key}>
                  <TextInput
                    name="key"
                    placeholder="Invite Code"
                    value={this.state.key}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Field>

                <Box margin="0.75rem 0.75rem">
                  <Typography color="grey.dark">
                    In order to create an account, please obtain an invite code
                    by contacting us at <Link color="black.light" href="mailto:invite@videomed.app">
                    <strong>invite@videomed.app</strong></Link>. We look forward to hearing from you!
                  </Typography>
                </Box>
              </Box>
            )}

            { this.state.type === 'Patient' && (
              <Box marginBottom="0.25rem">
                <Field errors={this.state.blurred.code && this.state.errors.code}>
                  <TextInput
                    name="code"
                    placeholder="Physician Key"
                    value={this.state.code}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </Field>

                <Box margin="0.75rem 0.75rem">
                  <Typography color="grey.dark">
                    In order to create an account, you must have a unique
                    physician identifier provided to you by your primary care
                    physician.
                  </Typography>
                </Box>
              </Box>
            )}

            { this.props.error && (
              <Box marginTop="-0.5rem" marginBottom="0.75rem" align="center">
                <Typography color="critical">
                  { this.props.error }
                </Typography>
              </Box>
            )}

            <Button disabled={this.props.loading} type="submit">
              Create Account
            </Button>
          </Form>
        </Box>
      </Container>
    );
  }
}

export default Signup;
