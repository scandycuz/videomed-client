import React, { Component } from 'react';
import Box from './core/Box';
import Typography from './core/Typography';
import VideoStream from './VideoStream';

class App extends Component {
	render() {
		return (
			<Box>
				<Typography as="h1">Video Med</Typography>

				<Box direction="column" align="flex-start">
					<VideoStream />
				</Box>
			</Box>
		);
	}
}

export default App;
