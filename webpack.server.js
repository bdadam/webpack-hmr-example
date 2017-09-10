const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
    name: 'server-config',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.webpacked.js',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    stats: {
        modules: false,
        hash: false,
        version: false
    },
    cache: true,
    devtool: 'source-map',
    entry: path.resolve('./src', 'server/index.js'),
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.s?css/],
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'node'
                    }
                }
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        //     }
        // }),
    ]
};