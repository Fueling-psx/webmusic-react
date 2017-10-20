const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool:'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./app/index.js'
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		open: true
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				exclude:/node_modules/,
				use: [{
						loader: 'babel-loader',
						 options: {
                        	presets: ["es2015", "react"]
                    	}
					},{
						loader: 'react-hot-loader/webpack',
					}]
			}, {
				test: /(\.less|\.css)$/,
				exclude:/node_modules/,
				use: [{
						loader: 'style-loader'
					}, {
						loader: 'css-loader',
						// options: { modules: true }
					},{
						loader: 'less-loader'
					}	
				]
			}		
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}