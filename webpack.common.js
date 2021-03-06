const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
	},
	resolve: {
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'VideoMed',
			template: './public/index.html',
			favicon: './public/favicon.ico',
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
				test: /\.ejs$/, loader: 'ejs-loader?variable=data'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'url-loader?limit=10000',
					'img-loader'
				]
			},
		],
	},
};
