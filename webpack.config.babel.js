import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import DashboardPlugin from 'webpack-dashboard/plugin';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: ['whatwg-fetch','./src/index.js'],

	output: {
		path: './build',
		publicPath: '/',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['', '.jsx', '.js', '.json', '.scss']
	},

	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: /src\//,
				loader: 'source-map'
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.(scss|css)$/,
				loader: ExtractTextPlugin.extract('css?sourceMap!postcss!sass-loader?sourceMap')
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(xml|txt)$/,
				loader: 'raw'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(svg|woff|ttf|eot|jpg)(\?.*)?$/i,
				loader: 'file-loader?name=assets/fonts/[name]_[hash:base64:5].[ext]'
			}
		]
	},

	postcss: () => [
		autoprefixer({ browsers: 'last 2 versions' })
	],

	plugins: ([
		new webpack.NoErrorsPlugin(),
		new DashboardPlugin(),
		new ExtractTextPlugin('style.css', { allChunks: true }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]).concat(ENV === 'production' ? [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin()
	] : []),

	stats: { colors: true },

	devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		colors: true,
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		proxy: [
			// OPTIONAL: proxy configuration:
			// {
			// 	path: '/optional-prefix/**',
			// 	target: 'http://target-host.com',
			// 	rewrite: req => { req.url = req.url.replace(/^\/[^\/]+\//, ''); }   // strip first path segment
			// }
		]
	}
};
