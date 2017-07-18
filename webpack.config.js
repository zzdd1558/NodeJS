var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        login: './public/__working/scripts/login.js',
        signupDate: './public/__working/scripts/signupDate.js',
    },
    output: {
        path: __dirname + '/public/scripts',
        filename: '[name].bundle.js',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015'
                    ],
                },
                exclude: ['/node_modules']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loaders: [
                    'file-loader?name=../img/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?limit=10000&name=../img/[name].[ext]'
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader?name=../media/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin("commons.chunk"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin('../styles/[name].bundle.css')
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css']
    },
};