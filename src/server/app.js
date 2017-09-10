import { h } from 'preact';
import render from 'preact-render-to-string';

import path from 'path';

import express from 'express';

const app = express();

app.set('trust proxy', 1);
app.disable('etag');
app.disable('x-powered-by');

app.get('/test1234', (req, res) => {
    res.send('test12345');
});

const Webpack = require('webpack');
const webpackConfig = require('../../webpack.client');
const compiler = Webpack(webpackConfig);

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

if (process.env.NODE_ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        noInfo: true,
        publicPath: '/static/',
        stats: {
            colors: true,
        },
    }));

    app.use(webpackHotMiddleware(compiler));
} else {
    app.use('/static', express.static('dist'));
}

app.use('/icons', express.static('icons'));

app.get('*', function (req, res, next) {
    require('./server-render').default().then(page => res.send(page));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(`${err.message}\n${err.stack}`);
});

if (process.env.NODE_ENV !== 'production') {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(path.join(process.cwd(), 'src'));

    watcher.on('ready', function () {
        watcher.on('all', function () {
            console.log("Clearing /server/ module cache from server");
            Object.keys(require.cache).filter(id => !id.includes('node_modules')).forEach(function (id) {
                if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
            });
        });
    });

    // Do "hot-reloading" of react stuff on the server
    // Throw away the cached client modules and let them be re-required next time
    compiler.plugin('done', function () {
        console.log("Clearing /client/ module cache from server");
        Object.keys(require.cache).filter(id => !id.includes('node_modules')).forEach(function (id) {
            if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
        });
    });
}

export default app;
