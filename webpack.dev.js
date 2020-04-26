const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
		filename: '[name].bundle.js'
	},
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(false) }),
    new webpack.DefinePlugin({ PROTOCOL: JSON.stringify('http') }),
    new webpack.DefinePlugin({ API_URL: JSON.stringify('localhost:3000') }),
  ],
});
