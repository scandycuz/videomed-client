const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
		filename: '[name].[hash].bundle.js'
	},
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(true) }),
    new webpack.DefinePlugin({ PROTOCOL: JSON.stringify('https') }),
    new webpack.DefinePlugin({ API_URL: JSON.stringify(process.env.API_URL) }),
  ]
});
