const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index_bundle.js'
	},
	resolve: {
		modules: [path.resolve(__dirname, './src'), 'node_modules'],
	},
	devtool: 'source-map',
	devServer: {
    historyApiFallback: true,
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
}
