const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const sassImport = require('node-sass-import');

const extractScss = new ExtractTextPlugin('[name].css');

const isProductionBuild = process.env.NODE_ENV === 'production';
const noopPlugin = () => {};

module.exports = {
    // watch: false,
    // name: 'client',
    cache: true,
    devtool: isProductionBuild ? 'source-map' : 'cheap-eval-source-map',
    // devtool: 'source-map',
    stats: {
        modules: false,
        colors: true,
        version: false,
        hash: false
    },
    entry: { client: './src/client/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'browser'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractScss.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                importer: sassImport
                            }
                        }]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(isProductionBuild),
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        extractScss,
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: '/static/',
            cache: {}
        }),
        isProductionBuild ? noopPlugin : new webpack.HotModuleReplacementPlugin(),
        isProductionBuild ? new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }) : noopPlugin
    ]
};