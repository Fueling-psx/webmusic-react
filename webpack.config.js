const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		open: true
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				exclude:/node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:["react","es2015"]
					}
				}
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