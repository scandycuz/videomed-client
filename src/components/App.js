import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionCable from 'actioncable';
import Box from './core/Box';
import VideoStream from './VideoStream';
import Header from './Header';

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		loading: PropTypes.bool,
		login: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.login({
			email: 'trevorscandalios@gmail.com',
			password: 'password123',
		});
	}

	render() {
		if (this.props.loading) return <div />;

		console.log('cable: ', App.cable);

		return (
			<Box>
				<Header title="VideoMed" />

				<Box
					direction="column"
					align="flex-start"
					padding="1rem"
				>
					<VideoStream token={this.props.token} audio={false} />
				</Box>
			</Box>
		);
	}
}

export default App;
