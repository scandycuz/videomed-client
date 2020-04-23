import React, { Component } from 'react';
import { Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import ProtectedRoute from 'components/core/ProtectedRoute';
import VideoStream from './VideoStream';
import Login from './Login';
import Header from './Header';

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		loggedIn: PropTypes.bool,
		stream: PropTypes.object,
		loading: PropTypes.bool,
		login: PropTypes.func.isRequired,
		createStream: PropTypes.func.isRequired,
		inviteToStream: PropTypes.func.isRequired,
	}

	render() {
		if (this.props.loading) return <div />;

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
						<Login login={this.props.login} />
					</ProtectedRoute>

					<ProtectedRoute path="/" enabled={this.props.loggedIn}>
						<VideoStream
							stream={this.props.stream}
							createStream={this.props.createStream}
							inviteToStream={this.props.inviteToStream}
						/>
					</ProtectedRoute>
				</Switch>
			</Box>
		);
	}
}

export default App;
