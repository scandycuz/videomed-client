import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import ClipLoader from "react-spinners/ClipLoader";
import Box from 'components/core/Box';
import ScrollToTop from 'components/core/ScrollToTop';
import ProtectedRoute from 'components/core/ProtectedRoute';
import Home from 'containers/Home';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import Footer from './Footer';
import GlobalMessages from './GlobalMessages';

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		loggedIn: PropTypes.bool,
		currentUser: PropTypes.object,
		messages: PropTypes.array,
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
		return (
			<Box
				position="relative"
				minHeight="100vh"
				justify="space-between"
			>
				<ScrollToTop />

				{ this.props.loading && (
					<Box
						position="absolute"
						background="white"
						align="center"
						paddingTop="14.5rem"
						zIndex="2000"
						top="0"
						right="0"
						bottom="0"
						left="0"
						transition="all 100ms"
					>
						<ClipLoader />
					</Box>
				)}

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

				<GlobalMessages
					messages={this.props.messages}
				/>
			</Box>
		);
	}
}

export default App;
