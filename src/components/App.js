import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";
import Box from 'components/core/Box';
import ProtectedRoute from 'components/core/ProtectedRoute';
import Home from 'containers/Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		loggedIn: PropTypes.bool,
		currentUser: PropTypes.object,
		loading: PropTypes.bool,
		error: PropTypes.string,
		login: PropTypes.func.isRequired,
		loginFromSession: PropTypes.func.isRequired,
		logout: PropTypes.func.isRequired,
		createAccount: PropTypes.func.isRequired,
		resetSessionError: PropTypes.func.isRequired,
		closeStream: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.loginFromSession();
	}

	componentWillUnmount() {
		this.props.closeStream();
	}

	render() {
		/** placeholder for loading animation */
		if (this.props.loading) return (
			<Box width="100%" align="center" marginTop="14.5rem">
				<ClipLoader />
			</Box>
		);

		return (
			<Box minHeight="100vh" justify="space-between">
				<Box marginBottom="2rem">
					<Header
						title="VideoMed"
						loggedIn={this.props.loggedIn}
						currentUser={this.props.currentUser}
						logout={this.props.logout}
					/>

					<Switch>
						<ProtectedRoute
							exact
							path="/login"
							redirect="/"
							enabled={!this.props.loggedIn}
						>
							<Login
								loading={this.props.loading}
								error={this.props.error}
								onSubmit={this.props.login}
								resetSessionError={this.props.resetSessionError}
							/>
						</ProtectedRoute>

						<ProtectedRoute
							exact
							path="/signup"
							redirect="/"
							enabled={!this.props.loggedIn}
						>
							<Signup
								loading={this.props.loading}
								error={this.props.error}
								onSubmit={this.props.createAccount}
								resetSessionError={this.props.resetSessionError}
							/>
						</ProtectedRoute>

						<ProtectedRoute
							path="/"
							redirect="/login"
							enabled={this.props.loggedIn}
						>
							<Home />
						</ProtectedRoute>
					</Switch>
				</Box>

				<Footer
					loggedIn={this.props.loggedIn}
					email="support@videomed.app"
				/>
			</Box>
		);
	}
}

export default App;
