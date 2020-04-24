import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import ProtectedRoute from 'components/core/ProtectedRoute';
import VideoRoom from './VideoRoom';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		loggedIn: PropTypes.bool,
		streams: PropTypes.object,
		fullScreen: PropTypes.bool,
		loading: PropTypes.bool,
		error: PropTypes.string,
		login: PropTypes.func.isRequired,
		createAccount: PropTypes.func.isRequired,
		setFullScreen: PropTypes.func.isRequired,
		createStream: PropTypes.func.isRequired,
		closeStream: PropTypes.func.isRequired,
		inviteToRoom: PropTypes.func.isRequired,
		resetSessionError: PropTypes.func.isRequired,
	}

	render() {
		return (
			<Box>
				<Header title="VideoMed" />

				<Switch>
					<ProtectedRoute
						exact
						path="/login"
						enabled={!this.props.loggedIn}
						redirect="/"
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
						enabled={!this.props.loggedIn}
						redirect="/"
					>
						<Signup
							loading={this.props.loading}
							error={this.props.error}
							onSubmit={this.props.createAccount}
							resetSessionError={this.props.resetSessionError}
						/>
					</ProtectedRoute>

					<ProtectedRoute path="/" enabled={this.props.loggedIn}>
						<VideoRoom
							streams={this.props.streams}
							fullScreen={this.props.fullScreen}
							setFullScreen={this.props.setFullScreen}
							createStream={this.props.createStream}
							closeStream={this.props.closeStream}
							inviteToRoom={this.props.inviteToRoom}
						/>
					</ProtectedRoute>
				</Switch>
			</Box>
		);
	}
}

export default App;
